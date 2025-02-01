import { Form, Input, Row, Col, Space, Checkbox, InputNumber, Radio } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { memo, useEffect, useState } from "react";
import { RestauranceCostingDetailFormData } from "../../../../../modules/operation.interface";
import { CAR_TYPES } from "@/constants/transport.constant";

interface RestauranceDetailFormProps {
  costingId?: number;
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.TRANSPORT, data: RestauranceCostingDetailFormData) => void;
}
const RestauranceDetailForm: React.FC<RestauranceDetailFormProps> = ({ costingId, stockTypes, onChangeForm }) => {
  const initFormData = new RestauranceCostingDetailFormData(undefined, {
    remark: "",
    specialRequest: "",
  });

  const { setValue, getValues, control, watch } = useForm<RestauranceCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const handleChangePickupDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.pickUpDate", value?.toISOString());
  };

  const onChangeType = (type: EStockType) => {
    if (type === EStockType.OTHER || type === EStockType.TABLE) {
      setValue("type", type);
    }
  };

  const onChangeRoomType = (type: string) => {
    setValue("details.carType", type);
  };
  useEffect(() => {
    const data = getValues();
    onChangeForm?.(EInventoryType.TRANSPORT, data);
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
export default memo(RestauranceDetailForm);
