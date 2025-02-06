import { useEffect } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { BookingOrderPassengerFormData } from "../../../modules/bookingOrder.interface";
import dayjs from "dayjs";
import { PASSENGER_GENDER, PASSENGER_TITLES } from "@/constants/common";
import { orderPassengerInfoSchema } from "../../../schema/bookingOrder.schema";
import { getPassengerType } from "@/utils/common";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { stringToDate } from "@/utils/date";

export interface PassengerFormDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialValues?: IOrderDetail["passengers"][number];
  onSubmit?: (data: BookingOrderPassengerFormData) => void;
  loading?: boolean;
}

const PassengerFormDrawer: React.FC<PassengerFormDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  loading,
}) => {
  const initPaxInfo = new BookingOrderPassengerFormData(
    undefined,
    undefined,
    "",
    "",
    "",
    "",
    undefined,
    "",
    "",
    "",
    "",
    "",
    "",
    undefined,
  );

  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: { ...initPaxInfo },
    resolver: yupResolver(orderPassengerInfoSchema),
  });

  const handleChangeBirthDate = (date: dayjs.Dayjs | null) => {
    console.log(date);
    const paxType = initialValues?.type;
    if (paxType) {
    }
    date && setValue("paxBirthDate", date.toISOString());
  };
  const handleChangePassportExpiredDate: DatePickerProps["onChange"] = (date, dateStr) => {
    console.log(date, dateStr);
    date && setValue("paxPassortExpiredDate", date.toISOString());
  };

  /*
   * INITIAL FORM Data
   */
  useEffect(() => {
    const reInitForm = initialValues
      ? new BookingOrderPassengerFormData(
          initialValues.recId,
          initialValues.paxTitle,
          initialValues.paxLastname,
          initialValues.paxMiddleFirstName,
          initialValues.paxGender,
          stringToDate(initialValues.paxBirthDate)?.toISOString(),
          initialValues.paxBirthYear,
          initialValues.paxPhoneNumber,
          initialValues.paxAddress,
          initialValues.paxIdNumber,
          initialValues.paxNationality,
          initialValues.paxPassportNumber,
          stringToDate(initialValues.paxPassortExpiredDate)?.toISOString(),
          initialValues.paxInfoJson,
        )
      : initPaxInfo;

    Object.entries(reInitForm).forEach(([key, value]) => {
      setValue(
        key as keyof BookingOrderPassengerFormData,
        value as (typeof reInitForm)[keyof BookingOrderPassengerFormData],
      );
    });
  }, [initialValues]);

  return (
    <Drawer
      title={`Hành khách - ${getPassengerType(initialValues?.type)}`}
      width={650}
      onClose={onClose}
      open={isOpen}
      afterOpenChange={(open) => {
        if (open === false) {
          reset();
        }
      }}
      footer={
        <Space className="py-3">
          <Button onClick={onSubmit && handleSubmit(onSubmit)} type="primary" className="w-28" loading={loading}>
            Lưu
          </Button>
          <Button onClick={onClose} className="w-28">
            Huỷ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" disabled={loading}>
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              control={control}
              name="paxTitle"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Danh xưng" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Select {...field} placeholder="Chọn danh xưng" options={PASSENGER_TITLES} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxGender"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Giới tính" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Select {...field} options={PASSENGER_GENDER} placeholder="Chọn giới tính" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxLastname"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Họ" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Họ" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxMiddleFirstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Tên đệm và tên" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <Input {...field} placeholder="Tên đệm và tên" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxBirthDate"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Ngày sinh" validateStatus={error ? "error" : ""} help={error?.message} required>
                  <CustomDatePicker
                    format="DD/MM/YYYY"
                    className="w-full"
                    value={dayjs(field.value)}
                    onChange={handleChangeBirthDate}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxPhoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số điện thoại" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} value={field.value ?? ""} placeholder="Số điện thoại" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="paxAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Địa chỉ" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input.TextArea {...field} placeholder="Địa chỉ" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Controller
              control={control}
              name="paxPassportNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số Passport/CCCD" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Số passport/CCCD" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="paxPassortExpiredDate"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Ngày hết hạn" validateStatus={error ? "error" : ""} help={error?.message}>
                  <CustomDatePicker
                    format="DD/MM/YYYY"
                    className="w-full"
                    value={dayjs(field.value)}
                    disabledDate={(date) => date.isBefore(dayjs())}
                    onChange={handleChangePassportExpiredDate}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="paxNationality"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Quốc tịch" validateStatus={error ? "error" : ""} help={error?.message}>
                  <Input {...field} placeholder="Nhập quốc tịch" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default PassengerFormDrawer;
