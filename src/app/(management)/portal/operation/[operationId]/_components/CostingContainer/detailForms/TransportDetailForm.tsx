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
import { TransportCostingDetailFormData } from "../../../../modules/operation.interface";
import { CAR_TYPES } from "@/constants/transport.constant";
import { RoomingType } from "@/models/management/booking/rooming.interface";

interface TransportDetailFormProps {
  costingId?: number;
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.TRANSPORT, data: TransportCostingDetailFormData) => void;
}
const TransportDetailForm: React.FC<TransportDetailFormProps> = ({ costingId, stockTypes, onChangeForm }) => {
  const initFormData = new TransportCostingDetailFormData(undefined, {
    carModel: "",
    carType: "",
    dropOffLocation: "",
    pickUpDate: undefined,
    pickUpLocation: "",
    quantity: 1,
    remark: "",
    specialRequest: "",
  });

  const { setValue, getValues, control, watch } = useForm<TransportCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const handleChangePickupDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.pickUpDate", value?.toISOString());
  };

  const onChangeType = (type: EStockType) => {
    if (type === EStockType.OTHER || type === EStockType.VEHICLE || type === EStockType.CRUISE) {
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
        name="details.carType"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <FormItem label="Loại xe" required>
            <Space wrap>
              {CAR_TYPES.map((type) => (
                <Radio
                  key={type.value}
                  value={type.value}
                  checked={value === type.value}
                  onChange={() => onChangeRoomType(type.value)}
                >
                  {type.label}
                </Radio>
              ))}
            </Space>
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.carModel"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Mẫu xe" required>
            <Input.TextArea {...field} placeholder="Mẫu xe" />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.pickUpLocation"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Điểm đón khách" required>
            <Input {...field} placeholder="Điểm đón" />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.dropOffLocation"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Điểm trả khách" required>
            <Input {...field} placeholder="Điểm trả khách" />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.pickUpDate"
        render={({ field: { value }, fieldState: { error } }) => (
          <FormItem label="Ngày đón" required>
            <CustomDatePicker
              onChange={handleChangePickupDate}
              showTime={{ format: TIME_FORMAT }}
              format={"DD/MM/YYYY - HH:mm"}
              placeholder="Ngày đón"
              value={value ? dayjs(value) : null}
              disabledDate={(date) => {
                return date.isBefore(dayjs());
              }}
              className="w-full"
            />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.quantity"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormItem label="Số lượng xe" required>
            <InputNumber
              value={value}
              min={1}
              max={99}
              placeholder="Số lượng xe"
              className="w-full"
              onChange={onChange}
            />
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
export default memo(TransportDetailForm);
