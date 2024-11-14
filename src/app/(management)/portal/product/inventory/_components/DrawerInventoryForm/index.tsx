import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Space, Radio, Button, Drawer, Row, Col } from "antd";
import { isArray, isEqual } from "lodash";
import FormItem from "@/components/base/FormItem";
import { IInventoryDetail, IInventoryListRs } from "@/models/management/core/inventory.interface";
import { InventoryFormData } from "../../modules/inventory.interface";
import { Status } from "@/models/common.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { inventorySchema } from "../../schema/inventory.schema";
import SelectorSupplier, { SelectorSupplierProps } from "./SelectorSupplier";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

type DrawerAction = "CREATE" | "EDIT";
export type TDrawlerCreateAction = {
  type: "CREATE";
};
export type TDrawlerEditAction = {
  type: "EDIT";
  record: IInventoryListRs["result"][0];
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawerInventoryFormProps {
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: DrawerAction;
  initialValues?: IInventoryDetail;
  productType?: EProductType;
  disableSupplierField?: boolean;
  inventoriesType?: EInventoryType[];
  supplierId?: number;
  onSubmit?: (action: DrawerAction, formData: InventoryFormData) => void;
}

const DrawerInventoryForm: React.FC<DrawerInventoryFormProps> = ({
  actionType,
  onCancel,
  onSubmit,
  isOpen,
  initialValues,
  disableSupplierField,
  inventoriesType,
  productType,
  supplierId,
}) => {
  const initFormData = new InventoryFormData(
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
    defaultValues: { ...initFormData },
  });

  console.log(getValues(), initialValues);
  const [currentInventoriesTypeList, setCurrentInventoriesTypeList] = useState<EInventoryType[]>();

  const onClose = useCallback(() => {
    onCancel?.();
    clearErrors();
  }, []);
  const selectSupplier: SelectorSupplierProps["onChange"] = (recId, supplier) => {
    const typeList = isArray(supplier) ? supplier[0].typeList : supplier.typeList;
    setCurrentInventoriesTypeList(typeList);
    setValue("supplierId", recId);
    setValue("type", undefined);
  };

  const isDisableUpdateButton = useMemo(() => {
    return isEqual(initialValues?.name, getValues("name"));
  }, [watch()]);

  useEffect(() => {
    if (initialValues && actionType === "EDIT") {
      const updateFormData = new InventoryFormData(
        initialValues.recId,
        initialValues.name,
        initialValues.code,
        initialValues.cmsIdentity,
        initialValues.type,
        initialValues.productType,
        initialValues.supplier.recId,
        initialValues.isStock,
        initialValues.status,
      );
      Object.entries(updateFormData).forEach(([key, value]) => {
        setValue(key as keyof InventoryFormData, value);
      });
    } else {
      Object.entries(initFormData).forEach(([key, value]) => {
        setValue(key as keyof InventoryFormData, value);
      });
    }
    clearErrors();
  }, [initialValues, actionType, isOpen]);

  useEffect(() => {
    setValue("productType", productType);
  }, [productType, isOpen]);
  useEffect(() => {
    setValue("supplierId", supplierId);
  }, [supplierId, isOpen]);
  useEffect(() => {
    setCurrentInventoriesTypeList(inventoriesType);
  }, [inventoriesType, isOpen]);
  return (
    <Drawer
      title={
        actionType === "CREATE"
          ? `Thêm ${
              getValues("productType") === EProductType.EXTRA
                ? "dịch vụ trong và ngoài tour."
                : getValues("productType") === EProductType.TOUR
                ? "dịch vụ trong tour."
                : getValues("productType")
            }`
          : "Chỉnh sửa"
      }
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
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="Mã dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input
                    placeholder="Mã dịch vụ"
                    onChange={onChange}
                    value={vietnameseTonesToUnderscoreKeyname(value)}
                    disabled={actionType === "EDIT"}
                  />
                  <ul className="list-disc pl-4 text-xs text-gray-600 pt-2">
                    <li>Không dấu và không chứa ký tự đặc biệt.</li>
                    <li>Ngăn cách bằng dấu gạch dưới &quot;_&ldquo;.</li>
                  </ul>
                </FormItem>
              )}
            />
          </Col>
        </Row>
        {disableSupplierField ? null : (
          <Controller
            control={control}
            name="supplierId"
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Chọn Supplier" required validateStatus={error ? "error" : ""} help={error?.message}>
                <SelectorSupplier value={field.value} onChange={selectSupplier} disabled={actionType === "EDIT"} />
              </FormItem>
            )}
          />
        )}
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Loại dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
              {currentInventoriesTypeList ? (
                <Radio.Group {...field} disabled={actionType === "EDIT"}>
                  <Space wrap>
                    {currentInventoriesTypeList
                      ? currentInventoriesTypeList?.map((inventoryType) => (
                          <Radio value={inventoryType} key={inventoryType}>
                            {inventoryType}
                          </Radio>
                        ))
                      : null}
                  </Space>
                </Radio.Group>
              ) : (
                <p className="text-xs text-red-600 pl-2">Chọn supplier để hiển thị dịch vụ tương ứng.</p>
              )}
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="isStock"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Quản lý kho" validateStatus={error ? "error" : ""} help={error?.message}>
              <Radio.Group onChange={field.onChange} value={field.value} disabled={actionType === "EDIT"}>
                <Space wrap>
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
          {actionType === "CREATE" ? (
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
          ) : actionType === "EDIT" ? (
            <>
              <Button
                type="primary"
                onClick={handleSubmit((data) => onSubmit?.(actionType, data))}
                disabled={isDisableUpdateButton}
              >
                Cập nhật
              </Button>
            </>
          ) : null}
        </Space>
      </div>
    </Drawer>
  );
};
export default memo(DrawerInventoryForm);
