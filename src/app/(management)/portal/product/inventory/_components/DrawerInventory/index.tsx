import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Radio, Spin, Button, Drawer } from "antd";
import { isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { InventoryFormData } from "../../modules/inventory.interface";
import { Status } from "@/models/common.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { inventorySchema } from "../../schema/inventory.schema";
import SelectorSupplier, { SelectorSupplierProps } from "./SelectorSupplier";

export enum EActionType {
  CREATE = "create",
  EDIT = "edit",
}
export type TDrawlerCreateAction = {
  type: EActionType.CREATE;
};
export type TDrawlerEditAction = {
  type: EActionType.EDIT;
  record: IInventoryListRs["result"][0];
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawerInventoryProps {
  isOpen?: boolean;
  onCancel: () => void;
  actionType: EActionType;
  initialValues?: IInventoryListRs["result"][0];
  onSubmit: (action: EActionType, formData: InventoryFormData) => void;
}

type RequiredInventoryFormData = Required<InventoryFormData>;
const DrawerInventory: React.FC<DrawerInventoryProps> = ({ actionType, onCancel, onSubmit, isOpen, initialValues }) => {
  const { data: inventoryTypeList, isLoading: isLoadingInventoryType } = useGetInventoryTypeListCoreQuery({
    enabled: isOpen,
  });
  const { data: productTypeList, isLoading: isLoadingProductTpe } = useGetProductTypeListCoreQuery({ enabled: isOpen });

  let initFormData = new InventoryFormData("", "", "", undefined, undefined, undefined, undefined, Status.QQ);
  const [formData, setFormData] = useState(initFormData);

  const { handlerSubmit, errors, clearErrors } = useFormSubmit({
    schema: inventorySchema,
  });
  const onChangeFormData = (
    key: keyof RequiredInventoryFormData,
    value: RequiredInventoryFormData[keyof RequiredInventoryFormData],
  ) => {
    if (key === "code" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toLocaleUpperCase();
    }
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onSubmitFormData = (status: Status) => {
    let formDataUpdateStatus = {
      ...formData,
      status: status,
    };
    onSubmit?.(actionType, formDataUpdateStatus);
  };
  const onClose = useCallback(() => {
    onCancel();
    clearErrors();
  }, []);
  const selectSupplier: SelectorSupplierProps["onChange"] = (recId, supplier) => {
    setFormData((prev) => ({
      ...prev,
      supplierId: recId,
    }));
  };
  const isDisableUpdateButton = useMemo(() => {
    return isEqual(initialValues?.name, formData.name);
  }, [formData]);

  useEffect(() => {
    if (initialValues) {
      initFormData = new InventoryFormData(
        initialValues.name,
        initialValues.code,
        initialValues.cmsIdentity,
        initialValues.type,
        initialValues.productType,
        initialValues.supplierId,
        initialValues.isStock,
        initialValues.status,
      );
      initFormData.status = initialValues.status;
    }
    setFormData(() => initFormData);
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={actionType === EActionType.CREATE ? "Thêm dịch vụ" : "Chỉnh sửa"}
      destroyOnClose
      width={550}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" className=" max-w-4xl">
        <FormItem
          label="Chọn Supplier"
          required
          validateStatus={errors?.supplierId ? "error" : ""}
          help={errors?.supplierId || ""}
        >
          <SelectorSupplier
            value={formData.supplierId}
            onChange={selectSupplier}
            disabled={actionType === EActionType.EDIT}
          />
        </FormItem>
        <FormItem label="Tên dịch vụ" required validateStatus={errors?.name ? "error" : ""} help={errors?.name || ""}>
          <Input
            placeholder="Tên dịch vụ"
            value={formData.name}
            onChange={(ev) => onChangeFormData("name", ev.target.value)}
          />
        </FormItem>
        <FormItem label="Mã dịch vụ" required validateStatus={errors?.code ? "error" : ""} help={errors?.code || ""}>
          <Input
            placeholder="Mã dịch vụ"
            value={formData.code}
            onChange={(ev) => onChangeFormData("code", ev.target.value)}
            disabled={actionType === EActionType.EDIT}
          />
          <div className="p-2">
            <p className="font-bold">{`Lưu ý tạo mã dịch vụ:`}</p>
            <ul className="text-xs list-disc pl-4">
              <li>
                {`Code key viết không dấu và không chứa ký tự đặc
                                biệt.`}
              </li>
              <li>{`Được ngăn cách bằng dấu gạch dưới '_'.`}</li>
            </ul>
          </div>
        </FormItem>
        <FormItem label="Loại dịch vụ" required validateStatus={errors?.type ? "error" : ""} help={errors?.type || ""}>
          {isLoadingInventoryType ? (
            <Spin />
          ) : (
            <Radio.Group
              onChange={(ev) => onChangeFormData("type", ev.target.value)}
              value={formData.type}
              disabled={actionType === EActionType.EDIT}
            >
              <Space wrap direction="vertical">
                {inventoryTypeList?.map((inventoryType) => (
                  <Radio value={inventoryType} key={inventoryType}>
                    {inventoryType}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem
          label="Loại sản phẩm"
          required
          validateStatus={errors?.productType ? "error" : ""}
          help={errors?.productType || ""}
        >
          {isLoadingProductTpe ? (
            <Spin />
          ) : (
            <Radio.Group
              onChange={(ev) => onChangeFormData("productType", ev.target.value)}
              value={formData.productType}
              disabled={actionType === EActionType.EDIT}
            >
              <Space direction="vertical" wrap>
                {productTypeList?.map((productType) => (
                  <Radio value={productType} key={productType}>
                    {productType}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="Quản lý kho" validateStatus={errors?.isStock ? "error" : ""} help={errors?.isStock || ""}>
          <Radio.Group
            onChange={(ev) => onChangeFormData("isStock", ev.target.value)}
            value={formData.isStock}
            disabled={actionType === EActionType.EDIT}
          >
            <Space direction="vertical" wrap>
              <Radio value={true}>Có</Radio>
              <Radio value={false}>Không</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
      </Form>
      <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
        <Space>
          <Button type="default" onClick={onCancel}>
            Huỷ bỏ
          </Button>
          {actionType === EActionType.CREATE ? (
            <>
              <Button
                type="primary"
                onClick={() => handlerSubmit(formData, () => onSubmitFormData(Status.QQ))}
                disabled={false}
              >
                Gửi duyệt
              </Button>
              <Button
                type="primary"
                onClick={() => handlerSubmit(formData, () => onSubmitFormData(Status.OK))}
                disabled={false}
              >
                Lưu và duyệt
              </Button>
            </>
          ) : (
            <>
              {initialValues ? (
                <Button
                  type="primary"
                  onClick={() => handlerSubmit(formData, () => onSubmitFormData(initialValues.status))}
                  disabled={isDisableUpdateButton}
                >
                  Cập nhật
                </Button>
              ) : null}
            </>
          )}
        </Space>
      </div>
    </Drawer>
  );
};
export default memo(DrawerInventory);
