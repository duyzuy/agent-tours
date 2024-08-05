import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Radio, Spin, Button, Drawer, Row, Col } from "antd";
import { isArray, isEmpty, isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { InventoryFormData } from "../../modules/inventory.interface";
import { Status } from "@/models/common.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { inventorySchema } from "../../schema/inventory.schema";
import SelectorSupplier, { SelectorSupplierProps } from "./SelectorSupplier";
import { ISupplier } from "@/models/management/supplier.interface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
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
  recId?: number;
  isOpen?: boolean;
  onCancel: () => void;
  actionType: EActionType;
  initialValues?: IInventoryListRs["result"][0];
  onSubmit: (action: EActionType, formData: InventoryFormData) => void;
}

const DrawerInventory: React.FC<DrawerInventoryProps> = ({
  actionType,
  onCancel,
  onSubmit,
  isOpen,
  initialValues,
  recId,
}) => {
  let initFormData = new InventoryFormData(
    undefined,
    "",
    "",
    "",
    undefined,
    undefined,
    undefined,
    undefined,
    Status.QQ,
  );
  const { control, getValues, setValue, clearErrors, watch, handleSubmit } = useForm<InventoryFormData>({
    resolver: yupResolver(inventorySchema),
    defaultValues: initFormData,
  });

  const { data: inventoryDetail } = useGetInventoryDetailCoreQuery({ recId: recId, enabled: !!recId });
  const { data: productTypeList, isLoading: isLoadingProductTpe } = useGetProductTypeListCoreQuery({ enabled: isOpen });

  const [supplier, setSupplier] = useState<ISupplier>();

  const onClose = useCallback(() => {
    onCancel();
    clearErrors();
  }, []);
  const selectSupplier: SelectorSupplierProps["onChange"] = (recId, supplier) => {
    setSupplier(() => (isArray(supplier) ? supplier[0] : supplier));
    setValue("supplierId", recId);
    setValue("type", undefined);
  };
  const isDisableUpdateButton = useMemo(() => {
    return isEqual(inventoryDetail?.name, getValues("name"));
  }, [watch()]);

  useEffect(() => {
    if (inventoryDetail && actionType === EActionType.EDIT) {
      const updateFormData = new InventoryFormData(
        inventoryDetail.recId,
        inventoryDetail.name,
        inventoryDetail.code,
        inventoryDetail.cmsIdentity,
        inventoryDetail.type,
        inventoryDetail.productType,
        inventoryDetail.supplierId,
        inventoryDetail.isStock,
        inventoryDetail.status,
      );
      Object.entries(updateFormData).forEach(([key, value]) => {
        setValue(key as keyof InventoryFormData, value);
      });
      setSupplier(inventoryDetail.supplier);
    } else {
      Object.entries(initFormData).forEach(([key, value]) => {
        setValue(key as keyof InventoryFormData, value);
      });
      setSupplier(undefined);
    }
    clearErrors();
  }, [inventoryDetail, actionType]);

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
        <Row gutter={24}>
          <Col span={24}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input placeholder="Tên dịch vụ" {...field} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Mã dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input
                    placeholder="Mã dịch vụ"
                    onChange={field.onChange}
                    value={vietnameseTonesToUnderscoreKeyname(field.value)}
                    disabled={actionType === EActionType.EDIT}
                  />
                  <ul className="list-disc pl-6">
                    <li>
                      <p className="text-xs text-gray-600 pt-2">Không dấu và không chứa ký tự đặc biệt.</p>
                    </li>
                    <li>
                      <p className="text-xs text-gray-600 pt-2">Ngăn cách bằng dấu gạch dưới &quot;_&ldquo;.</p>
                    </li>
                  </ul>
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Controller
          control={control}
          name="supplierId"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Chọn Supplier" required validateStatus={error ? "error" : ""} help={error?.message}>
              <SelectorSupplier
                value={field.value}
                onChange={selectSupplier}
                disabled={actionType === EActionType.EDIT}
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Loại dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
              {supplier ? (
                <Radio.Group {...field} disabled={actionType === EActionType.EDIT}>
                  <Space wrap direction="vertical">
                    {supplier?.typeList && !isEmpty(supplier?.typeList)
                      ? supplier.typeList.split("||")?.map((inventoryType) => (
                          <Radio value={inventoryType} key={inventoryType}>
                            {inventoryType}
                          </Radio>
                        ))
                      : null}
                  </Space>
                </Radio.Group>
              ) : (
                <div>
                  <p className="text-xs text-red-600">Vui lòng chọn supplier để hiển thị dịch vụ tương ứng.</p>
                </div>
              )}
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="productType"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Loại sản phẩm" required validateStatus={error ? "error" : ""} help={error?.message}>
              {isLoadingProductTpe ? (
                <Spin />
              ) : (
                <Radio.Group {...field} disabled={actionType === EActionType.EDIT}>
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
          )}
        />

        <Controller
          control={control}
          name="isStock"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Quản lý kho" validateStatus={error ? "error" : ""} help={error?.message}>
              <Radio.Group onChange={field.onChange} value={field.value} disabled={actionType === EActionType.EDIT}>
                <Space direction="vertical" wrap>
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Không</Radio>
                </Space>
              </Radio.Group>
            </FormItem>
          )}
        />
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
                onClick={handleSubmit((data) => onSubmit?.(actionType, { ...data, status: Status.QQ }))}
                disabled={false}
              >
                Gửi duyệt
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit((data) => onSubmit?.(actionType, { ...data, status: Status.OK }))}
                disabled={false}
              >
                Lưu và duyệt
              </Button>
            </>
          ) : (
            <>
              {recId ? (
                <Button
                  type="primary"
                  onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
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
