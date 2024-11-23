import { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select, DatePicker, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { BookingOrderPassengerFormData } from "../../../modules/bookingOrder.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { bookingPassengerInfoSchema } from "../../../schema/bookingOrder.schema";
import { getPassengerType } from "@/utils/common";

export interface DrawerPassengerInfoProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialValues?: IOrderDetail["passengers"][number];
  onSubmit?: (data: BookingOrderPassengerFormData) => void;
}

type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysPassenger = KeysOfValue<Required<BookingOrderPassengerFormData>, string>;

const DrawerPassengerInfo: React.FC<DrawerPassengerInfoProps> = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [passengerFormData, setPassengerFormData] = useState(
    () => new BookingOrderPassengerFormData(0, undefined, "", "", "", "", undefined, "", "", "", "", "", "", undefined),
  );
  const { handlerSubmit, clearErrors, errors } = useFormSubmit({
    schema: bookingPassengerInfoSchema,
  });

  const onChangeFormData = (key: TKeysPassenger, value: (typeof passengerFormData)[TKeysPassenger]) => {
    setPassengerFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onChangeBirthDate: DatePickerProps["onChange"] = (date, dateStr) => {
    setPassengerFormData((prev) => ({
      ...prev,
      paxBirthDate: date?.format(DATE_FORMAT),
      // paxBirthYear: date?.get("year"),
    }));
  };
  const onChangeNationalityDate: DatePickerProps["onChange"] = (date, dateStr) => {
    setPassengerFormData((prev) => ({
      ...prev,
      paxPassortExpiredDate: date?.format(DATE_FORMAT),
    }));
  };

  /*
   * INITIAL FORM Data
   */
  useEffect(() => {
    setPassengerFormData(() => ({
      recId: initialValues?.recId,
      paxLastname: initialValues?.paxLastname,
      paxTitle: initialValues?.paxTitle ? initialValues.paxTitle : undefined,
      paxMiddleFirstName: initialValues?.paxMiddleFirstName,
      paxGender: initialValues?.paxGender ? initialValues.paxGender : undefined,
      paxBirthDate: initialValues?.paxBirthDate,
      // paxBirthYear: initialValues?.paxBirthYear,
      paxPhoneNumber: initialValues?.paxPhoneNumber,
      paxAddress: initialValues?.paxAddress,
      paxIdNumber: initialValues?.paxIdNumber,
      paxNationality: initialValues?.paxNationality,
      paxPassportNumber: initialValues?.paxPassportNumber,
      paxPassortExpiredDate: initialValues?.paxPassortExpiredDate,
      paxInfoJson: initialValues?.paxInfoJson,
    }));
    clearErrors();
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={`Hành khách - ${getPassengerType(initialValues?.type)}`}
      width={650}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              label="Danh xưng"
              validateStatus={errors?.paxTitle ? "error" : ""}
              help={errors?.paxTitle || ""}
              required
            >
              <Select
                value={passengerFormData.paxTitle}
                placeholder="Chọn danh xưng"
                options={[
                  { label: "Ông", value: "mr" },
                  { label: "Bà", value: "mrs" },
                  { label: "Cô", value: "miss" },
                ]}
                onChange={(value) => onChangeFormData("paxTitle", value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Giới tính"
              validateStatus={errors?.paxGender ? "error" : ""}
              help={errors?.paxGender || ""}
              required
            >
              <Select
                value={passengerFormData.paxGender}
                placeholder="Chọn giới tính"
                options={[
                  { label: "Nam", value: "male" },
                  { label: "Nữ", value: "female" },
                  { label: "Khác", value: "other" },
                ]}
                onChange={(value) => onChangeFormData("paxGender", value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Họ"
              validateStatus={errors?.paxLastname ? "error" : ""}
              help={errors?.paxLastname || ""}
              required
            >
              <Input
                value={passengerFormData.paxLastname}
                placeholder="Họ"
                onChange={(ev) => onChangeFormData("paxLastname", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Tên đệm và tên"
              validateStatus={errors?.paxMiddleFirstName ? "error" : ""}
              help={errors?.paxMiddleFirstName || ""}
              required
            >
              <Input
                value={passengerFormData.paxMiddleFirstName}
                placeholder="Tên đệm và tên"
                onChange={(ev) => onChangeFormData("paxMiddleFirstName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Ngày sinh"
              validateStatus={errors?.paxBirthDate ? "error" : ""}
              help={errors?.paxBirthDate || ""}
              required
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                value={
                  dayjs(passengerFormData.paxBirthDate, DATE_FORMAT).isValid()
                    ? dayjs(passengerFormData.paxBirthDate, DATE_FORMAT)
                    : dayjs(passengerFormData.paxBirthDate)
                }
                onChange={onChangeBirthDate}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Số điện thoại"
              validateStatus={errors?.paxPhoneNumber ? "error" : ""}
              help={errors?.paxPhoneNumber || ""}
              required
            >
              <Input
                value={passengerFormData.paxPhoneNumber}
                placeholder="Số điện thoại"
                onChange={(ev) => onChangeFormData("paxPhoneNumber", ev.target.value)}
              />
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              label="Địa chỉ"
              validateStatus={errors?.paxAddress ? "error" : ""}
              help={errors?.paxAddress || ""}
            >
              <Input
                value={passengerFormData.paxAddress}
                placeholder="Nhập địa chỉ thường trú"
                onChange={(ev) => onChangeFormData("paxAddress", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem
              label="Số Passport/CCCD"
              validateStatus={errors?.paxPassportNumber ? "error" : ""}
              help={errors?.paxPassportNumber || ""}
            >
              <Input
                value={passengerFormData.paxPassportNumber}
                placeholder="Số passport/CCCD"
                onChange={(ev) => onChangeFormData("paxPassportNumber", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="Ngày hết hạn"
              validateStatus={errors?.paxPassortExpiredDate ? "error" : ""}
              help={errors?.paxPassortExpiredDate || ""}
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                value={
                  dayjs(passengerFormData.paxPassortExpiredDate, DATE_FORMAT).isValid()
                    ? dayjs(passengerFormData.paxPassortExpiredDate, DATE_FORMAT)
                    : dayjs(passengerFormData.paxPassortExpiredDate)
                }
                onChange={onChangeNationalityDate}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="Quốc tịch"
              validateStatus={errors?.paxNationality ? "error" : ""}
              help={errors?.paxNationality || ""}
            >
              <Input
                value={passengerFormData.paxNationality}
                placeholder="Nhập quốc tịch"
                onChange={(ev) => onChangeFormData("paxNationality", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button onClick={() => handlerSubmit(passengerFormData, onSubmit)} type="primary">
            Cập nhật
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerPassengerInfo;
