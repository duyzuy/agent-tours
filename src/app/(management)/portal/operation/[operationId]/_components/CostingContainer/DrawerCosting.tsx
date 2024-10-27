import { Drawer, DrawerProps, Form, Input, Row, Col, Space, Button, Select, SelectProps, Checkbox } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OperationCostingFormData } from "../../../modules/operation.interface";
import { operationCostingSchema } from "../../../schema/operation.schema";
import { useEffect, useMemo, useState } from "react";
import { isEqualObject } from "@/utils/compare";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import SupplierSelector, { SupplierSelectorProps } from "../../../_components/SupplierSelector";
import { IOperationCosting } from "@/models/management/core/operationCosting.interface";
import { ISupplier } from "@/models/management/supplier.interface";

export type DrawerCostingProps = DrawerProps & {
  operationId?: number;
  onClose?: () => void;
  onSubmit?: (data: OperationCostingFormData) => void;
  initialValue?: IOperationCosting;
};
const DrawerCosting: React.FC<DrawerCostingProps> = ({ operationId, onClose, open, onSubmit, initialValue }) => {
  const initFormData = new OperationCostingFormData(operationId, undefined, undefined);

  const { setValue, getValues, handleSubmit, control, watch } = useForm<OperationCostingFormData>({
    resolver: yupResolver(operationCostingSchema),
    defaultValues: { ...initFormData, operationId },
  });

  const [supplier, setSuplier] = useState<ISupplier>();

  const isDisabledButton = useMemo(() => {
    const values = getValues();

    return isEqualObject(["supplierId"], { supplierId: initialValue?.supplierId }, { supplierId: values.supplierId });
  }, [getValues(), initialValue, open, watch()]);

  const handleSelectInventoryType = (value: EInventoryType) => {
    setValue("type", value);
  };
  const handleChangeSupplier: SupplierSelectorProps["onChange"] = (value, option) => {
    setValue("supplierId", value);
    setSuplier(option);
  };
  useEffect(() => {
    const initData = initialValue
      ? new OperationCostingFormData(operationId, initialValue.type, undefined)
      : initFormData;

    Object.keys(initData).forEach((key) => {
      setValue(key as keyof OperationCostingFormData, initData[key as keyof OperationCostingFormData]);
    });
    setSuplier(undefined);
  }, [initialValue, open]);

  return (
    <Drawer
      title="Thêm loại dịch vụ"
      destroyOnClose
      width={650}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="supplierId"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Chọn supplier" required validateStatus={error ? "error" : ""} help={error?.message}>
              <SupplierSelector value={field.value} onChange={handleChangeSupplier} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Loại dịch vụ" required validateStatus={error ? "error" : ""} help={error?.message}>
              {supplier?.typeList ? (
                supplier?.typeList.split("||").map((typeItem) => (
                  <div key={typeItem} className="mb-3">
                    <Checkbox
                      checked={field?.value === typeItem}
                      onChange={() => handleSelectInventoryType(typeItem as EInventoryType)}
                      className="block"
                    >
                      {typeItem}
                    </Checkbox>
                  </div>
                ))
              ) : (
                <>Vui lòng chọn supplier trước khi chọn loại dịch vụ.</>
              )}
            </FormItem>
          )}
        />
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button type="primary" onClick={onSubmit && handleSubmit(onSubmit)} disabled={isDisabledButton}>
            Lưu
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
export default DrawerCosting;
