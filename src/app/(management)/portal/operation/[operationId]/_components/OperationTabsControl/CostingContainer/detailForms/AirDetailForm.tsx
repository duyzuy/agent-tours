import { Form, Input, Row, Col, Space, Checkbox, InputNumber, Radio } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller } from "react-hook-form";
import { AirCostingDetailFormData } from "../../../../../modules/operation.interface";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { memo, useEffect, useState } from "react";
import { AirDetailType, ICostingDetailItem } from "@/models/management/core/operation/operationCostingDetail.interface";
import { stringToDate } from "@/utils/date";

interface AirDetailFormProps {
  stockTypes?: EStockType[];
  onChangeForm?: (type: EInventoryType.AIR, data: AirCostingDetailFormData) => void;
  initialValues?: ICostingDetailItem<AirDetailType>;
}
const AirDetailForm: React.FC<AirDetailFormProps> = ({ stockTypes, onChangeForm, initialValues }) => {
  const initFormData = new AirCostingDetailFormData(undefined, {
    classOfService: "",
    adult: 1,
    child: 0,
    infant: 0,
    fullItinerary: "",
    departureDate: undefined,
    arrivalDate: undefined,
    tripType: "ONEWAY",
    specialRequest: "",
    remark: "",
  });

  const { setValue, getValues, control, watch } = useForm<AirCostingDetailFormData>({
    // resolver: yupResolver(airCostingDetailSchema),
    defaultValues: { ...initFormData },
  });

  const handleChangeDepartDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.departureDate", value?.toISOString());
    setValue("details.arrivalDate", undefined);
    console.log(getValues());
  };
  const handleChangeArrivalDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    setValue("details.arrivalDate", value?.toISOString());
  };

  const onChangeType = (type: EStockType) => {
    if (type === EStockType.AIRTICKET || type === EStockType.OTHER || type === EStockType.INSURANCE) {
      setValue("type", type);
    }
  };
  useEffect(() => {
    const data = getValues();
    onChangeForm?.(EInventoryType.AIR, data);
  }, [watch()]);

  useEffect(() => {
    const initData = initialValues
      ? new AirCostingDetailFormData(initialValues.type, {
          classOfService: initialValues.details?.classOfService,
          adult: initialValues.details?.adult,
          child: initialValues.details?.child,
          infant: initialValues.details?.infant,
          fullItinerary: initialValues.details?.fullItinerary,
          departureDate: initialValues.details?.departureDate
            ? stringToDate(initialValues.details?.departureDate)?.toDate().toString()
            : undefined,
          arrivalDate: initialValues.details?.arrivalDate
            ? stringToDate(initialValues.details?.arrivalDate)?.toDate().toString()
            : undefined,
          tripType: initialValues.details?.tripType,
          specialRequest: initialValues.details?.specialRequest,
          remark: initialValues.details?.remark,
        })
      : initFormData;

    Object.keys(initData).forEach((key) => {
      setValue(key as keyof AirCostingDetailFormData, initData[key as keyof AirCostingDetailFormData]);
    });
  }, [initialValues]);

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
        name="details.tripType"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <FormItem label="Hành trình" required>
            {["ONEWAY", "ROUNDTRIP", "MULTICITY"].map((type) => (
              <Radio value={type} checked={value === type} key={type} onChange={onChange}>
                {type}
              </Radio>
            ))}
          </FormItem>
        )}
      />

      <Controller
        control={control}
        name="details.departureDate"
        render={({ field: { value }, fieldState: { error } }) => (
          <FormItem label="Ngày đi">
            <CustomDatePicker
              onChange={handleChangeDepartDate}
              showTime={{ format: TIME_FORMAT }}
              format={"DD/MM/YYYY - HH:mm"}
              placeholder="Ngày đi"
              value={
                value
                  ? dayjs(value, {
                      format: DATE_TIME_FORMAT,
                    })
                  : null
              }
              disabledDate={(date) => {
                return date.isBefore(dayjs());
              }}
              className="w-full"
            />
          </FormItem>
        )}
      />
      {getValues("details.tripType") === "ROUNDTRIP" && (
        <Controller
          control={control}
          name="details.arrivalDate"
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <FormItem label="Ngày về">
              <CustomDatePicker
                showTime={{ format: TIME_FORMAT }}
                onChange={handleChangeArrivalDate}
                placeholder="Ngày về"
                value={
                  value
                    ? dayjs(value, {
                        format: DATE_TIME_FORMAT,
                      })
                    : null
                }
                disabledDate={(date) => {
                  return getValues("details.departureDate")
                    ? date.isBefore(dayjs(getValues("details.departureDate")))
                    : date.isBefore(dayjs());
                }}
                format={"DD/MM/YYYY - HH:mm"}
                className="w-full"
              />
            </FormItem>
          )}
        />
      )}
      <Row>
        <Col span={8}></Col>
        <Col span={16}>
          <Space>
            <Controller
              control={control}
              name="details.adult"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="Người lớn" required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <InputNumber
                    value={value}
                    min={1}
                    max={99}
                    placeholder="Người lớn"
                    style={{ width: "100%" }}
                    onChange={onChange}
                  />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="details.child"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="Trẻ em" required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <InputNumber
                    value={value}
                    onChange={onChange}
                    min={0}
                    placeholder="Trẻ em"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="details.infant"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormItem label="Em bé" required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <InputNumber
                    value={value}
                    onChange={onChange}
                    min={0}
                    placeholder="Em bé"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              )}
            />
          </Space>
        </Col>
      </Row>
      <Controller
        control={control}
        name="details.fullItinerary"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Hành trình">
            <Input {...field} placeholder="Hành trình" />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name="details.classOfService"
        render={({ field, fieldState: { error } }) => (
          <FormItem label="Hạng vé">
            <Input {...field} placeholder="Hạng vé" />
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
export default memo(AirDetailForm);
