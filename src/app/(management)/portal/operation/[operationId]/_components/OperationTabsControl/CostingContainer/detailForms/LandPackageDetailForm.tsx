import { Form, Input, Row, Col, Space, Checkbox, InputNumber, Radio } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import { memo, useEffect, useState } from "react";
import { LandPackageCostingDetailFormData } from "../../../../../modules/operation.interface";

interface LandPackageDetailFormProps {
  costingId?: number;
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.LANDPACKAGE, data: LandPackageCostingDetailFormData) => void;
}
const LandPackageDetailForm: React.FC<LandPackageDetailFormProps> = ({ costingId, stockTypes, onChangeForm }) => {
  const initFormData = new LandPackageCostingDetailFormData(undefined, {
    remark: "",
    specialRequest: "",
  });

  const { setValue, getValues, control, watch } = useForm<LandPackageCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const onChangeType = (type: EStockType) => {
    if (
      type === EStockType.PACKAGE ||
      type === EStockType.TOURPACKAGE ||
      type === EStockType.GUIDE ||
      type === EStockType.OTHER
    ) {
      setValue("type", type);
    }
  };

  useEffect(() => {
    const data = getValues();
    onChangeForm?.(EInventoryType.LANDPACKAGE, data);
  }, [watch()]);

  return (
    <>
      <Controller
        control={control}
        name="type"
        render={({ field: { value }, fieldState: { error } }) => (
          <FormItem label="Chọn dịch vụ" required>
            {stockTypes?.map((item) => (
              <Checkbox value={item} onChange={() => onChangeType(item)} key={item} checked={value === item}>
                {item}
              </Checkbox>
            ))}
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.specialRequest"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Yêu cầu đặc biệt">
            <Input.TextArea {...field} placeholder="Yêu cầu đặc biệt" />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.remark"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Ghi chú">
            <Input.TextArea {...field} placeholder="Ghi chú" />
          </FormItem>
        )}
      />
    </>
  );
};
export default memo(LandPackageDetailForm);
