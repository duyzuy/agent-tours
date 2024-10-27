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
import { HotelCostingDetailFormData } from "../../../../modules/operation.interface";
import { ROOM_TYPES } from "@/constants/rooming.constant";
import { RoomingType } from "@/models/management/booking/rooming.interface";

interface HotelDetailFormProps {
  costingId?: number;
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.HOTEL, data: HotelCostingDetailFormData) => void;
}
const HotelDetailForm: React.FC<HotelDetailFormProps> = ({ costingId, stockTypes, onChangeForm }) => {
  const initFormData = new HotelCostingDetailFormData(undefined, {
    checkIn: undefined,
    checkOut: undefined,
    quantity: 1,
    remark: "",
    roomType: "SINGLE",
    specialRequest: "",
  });

  const { setValue, getValues, control, watch } = useForm<HotelCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const handleChangeDepartDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.checkIn", value?.toISOString());
    setValue("details.checkOut", undefined);
  };
  const handleChangeArrivalDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.checkOut", value?.toISOString());
  };

  const onChangeType = (type: EStockType) => {
    if (type === EStockType.ROOM || type === EStockType.OTHER) {
      setValue("type", type);
    }
  };

  const onChangeRoomType = (type: RoomingType) => {
    setValue("details.roomType", type);
  };
  useEffect(() => {
    const data = getValues();
    onChangeForm?.(EInventoryType.HOTEL, data);
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
        name="details.roomType"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <FormItem label="Loại phòng" required>
            <Space wrap>
              {ROOM_TYPES.map((type) => (
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
        name="details.quantity"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormItem label="Số lượng phòng" required>
            <InputNumber
              value={value}
              min={1}
              max={99}
              placeholder="Số lượng phòng"
              className="w-full"
              onChange={onChange}
            />
          </FormItem>
        )}
      />

      <Controller
        control={control}
        name="details.checkIn"
        render={({ field: { value }, fieldState: { error } }) => (
          <FormItem label="Ngày check-in" required>
            <CustomDatePicker
              onChange={handleChangeDepartDate}
              showTime={{ format: TIME_FORMAT }}
              format={"DD/MM/YYYY - HH:mm"}
              placeholder="Ngày check-in"
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
        name="details.checkOut"
        render={({ field: { value }, fieldState: { error } }) => (
          <FormItem label="Ngày check-out">
            <CustomDatePicker
              showTime={{ format: TIME_FORMAT }}
              onChange={handleChangeArrivalDate}
              placeholder="Ngày check-out"
              value={value ? dayjs(value) : null}
              disabledDate={(date) => {
                return getValues("details.checkIn")
                  ? date.isBefore(dayjs(getValues("details.checkIn")))
                  : date.isBefore(dayjs());
              }}
              format={"DD/MM/YYYY - HH:mm"}
              className="w-full"
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
export default memo(HotelDetailForm);
