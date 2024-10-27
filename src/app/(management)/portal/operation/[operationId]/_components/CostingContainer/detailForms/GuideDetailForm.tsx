import { Form, Input, Row, Col, Space, Checkbox, InputNumber, Radio } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import { memo, useEffect, useState } from "react";
import { GuideCostingDetailFormData } from "../../../../modules/operation.interface";

interface GuideDetailFormProps {
  costingId?: number;
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.GUIDE, data: GuideCostingDetailFormData) => void;
}
const GuideDetailForm: React.FC<GuideDetailFormProps> = ({ costingId, stockTypes, onChangeForm }) => {
  const initFormData = new GuideCostingDetailFormData(undefined, {
    destination: "",
    guideType: "DOMESTIC",
    quantity: 1,
    remark: "",
    specialRequest: "",
  });

  const { setValue, getValues, control, watch } = useForm<GuideCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const onChangeType = (type: EStockType) => {
    if (type === EStockType.OTHER) {
      setValue("type", type);
    }
  };

  useEffect(() => {
    const data = getValues();
    onChangeForm?.(EInventoryType.GUIDE, data);
  }, [watch()]);

  return (
    <Form layout="vertical" component="div">
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
        name="details.quantity"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormItem label="Số lượng" required>
            <InputNumber value={value} min={1} max={99} placeholder="Số lượng" className="w-full" onChange={onChange} />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.destination"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Chặng" required>
            <Input placeholder="Chặng" {...field} />
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
    </Form>
  );
};
export default memo(GuideDetailForm);
