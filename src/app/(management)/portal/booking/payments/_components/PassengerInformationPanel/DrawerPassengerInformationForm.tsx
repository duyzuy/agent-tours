import { useEffect, useState } from "react";
import { Button, Col, DatePickerProps, Drawer, Form, Input, Row, Select, Space } from "antd";
import { PassengerType } from "@/models/common.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PassengerInformationFormData } from "../../../modules/passenger.interface";
import FormItem from "@/components/base/FormItem";
import { DATE_FORMAT, PASSENGER_AGES, PASSENGER_GENDER, PASSENGER_TITLES } from "@/constants/common";
import { getPassengerType } from "@/utils/common";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import dayjs from "dayjs";
import { isUndefined } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { passengerInformationSchema } from "./passengerInformation.schema";
import { PortalBookingManagerFormData } from "../../../modules/bookingInformation.interface";

type BookingItem = PortalBookingManagerFormData["bookingInfo"]["bookingItems"][number];
export interface DrawerPassengerInformationFormProps {
  open?: boolean;
  onClose?: () => void;
  onOk?: (bookingIndex: number, paxType: PassengerType, data: BookingItem["passengerInformation"]) => void;
  data?: BookingItem["passengerInformation"];
  paxType?: PassengerType;
  bookingIndex?: number;
  startDate?: string;
}
const DrawerPassengerInformationForm: React.FC<DrawerPassengerInformationFormProps> = ({
  open,
  onClose,
  onOk,
  data,
  paxType,
  bookingIndex,
  startDate,
}) => {
  const initFormData = new PassengerInformationFormData(
    undefined,
    undefined,
    "",
    "",
    undefined,
    "",
    "",
    "",
    "",
    "",
    undefined,
  );
  const { control, handleSubmit, setValue } = useForm<PassengerInformationFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(passengerInformationSchema),
  });
  const [errorForm, setErrorForm] = useState<{ paxBirthDate?: string; expiredPassportDate?: string } | undefined>();

  const onChangeBirthDate: DatePickerProps["onChange"] = (date) => {
    let errorMess = "";
    if (paxType === PassengerType.ADULT && dayjs(startDate).diff(date, "years") < PASSENGER_AGES.adult.min) {
      errorMess = "Người lớn phải từ 12 tuổi trở lên";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }
    if (
      (paxType === PassengerType.CHILD && dayjs(startDate).diff(date, "years") < PASSENGER_AGES.child.min) ||
      (paxType === PassengerType.CHILD && dayjs(startDate).diff(date, "years") > PASSENGER_AGES.child.max)
    ) {
      errorMess = "Trẻ em từ 2 đến 12 tuổi";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }

    if (paxType === PassengerType.INFANT && dayjs(startDate).diff(date, "years") > PASSENGER_AGES.infant.max) {
      errorMess = "Em bé từ 2 tuổi trở xuống.";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }
    setErrorForm((prev) => ({ ...prev, paxBirthDate: undefined }));

    setValue("paxBirthDate", date?.locale("en").format(DATE_FORMAT));
  };

  const onChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
    setValue("paxPassortExpiredDate", date?.locale("en").format(DATE_FORMAT));
  };

  const onSubmit: SubmitHandler<PassengerInformationFormData> = (data) => {
    onOk && !isUndefined(bookingIndex) && paxType && onOk(bookingIndex, paxType, data);
  };
  useEffect(() => {
    const passengerInfo = data
      ? new PassengerInformationFormData(
          data.paxTitle,
          data.paxGender,
          data.paxLastname,
          data.paxMiddleFirstName,
          data.paxBirthDate,
          data.paxPhoneNumber,
          data.paxAddress,
          data.paxIdNumber,
          data.paxNationality,
          data.paxPassportNumber,
          data.paxPassortExpiredDate,
        )
      : initFormData;

    Object.keys(passengerInfo).forEach((key) => {
      setValue(key as keyof PassengerInformationFormData, passengerInfo[key as keyof PassengerInformationFormData]);
    });
  }, [open, data]);

  return (
    <Drawer
      title={`Hành khách ${!isUndefined(bookingIndex) ? bookingIndex + 1 : "--"} - ${
        paxType ? getPassengerType(paxType) : "--"
      }`}
      width={650}
      open={open}
      // onClose={onClose}
      destroyOnClose
      maskClosable={false}
      closeIcon={null}
      footer={
        <Space className="py-2">
          <Button type="primary" size="large" className="w-36" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>
          <Button size="large" type="text" className="!bg-gray-200 !text-gray-600 w-36" onClick={onClose}>
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <Controller
              control={control}
              name="paxTitle"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Danh xưng" required validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Select
                    placeholder="Chọn danh xưng"
                    options={PASSENGER_TITLES}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxGender"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Giới tính" required validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Select
                    placeholder="Chọn giới tính"
                    options={PASSENGER_GENDER}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxLastname"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Họ" required validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Input placeholder="Họ" value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxMiddleFirstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Tên đệm và tên"
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input placeholder="Tên đệm và tên" value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxBirthDate"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Ngày sinh"
                  required
                  validateStatus={error ? "error" : errorForm?.paxBirthDate ? "error" : undefined}
                  help={error?.message || errorForm?.paxBirthDate}
                >
                  <CustomDatePicker
                    format="DD/MM/YYYY"
                    className="w-full"
                    value={field.value ? dayjs(field.value, { format: DATE_FORMAT }) : undefined}
                    disabledDate={(date) => date.isAfter(dayjs())}
                    onChange={onChangeBirthDate}
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
                <FormItem
                  label="Số điện thoại"
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input placeholder="Số điện thoại" value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>

          <Col span={24}>
            <Controller
              control={control}
              name="paxAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Số điện thoại" validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Input placeholder="Nhập địa chỉ thường trú" value={field.value} onChange={field.onChange} />
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
                <FormItem label="Số Passport/CCCD" validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Input placeholder="Số Passport/CCCD" value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="paxPassportNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Ngày hết hạn"
                  validateStatus={error ? "error" : errorForm?.expiredPassportDate ? "error" : undefined}
                  help={error?.message || errorForm?.expiredPassportDate}
                >
                  <CustomDatePicker
                    allowClear={false}
                    format="DD/MM/YYYY"
                    className="w-full"
                    value={field.value ? dayjs(field.value, DATE_FORMAT) : undefined}
                    disabledDate={(date) => date.isBefore(dayjs())}
                    onChange={onChangeNationalityDate}
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
                <FormItem label="Quốc tịch" required validateStatus={error ? "error" : undefined} help={error?.message}>
                  <Input placeholder="Quốc tịch" value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default DrawerPassengerInformationForm;
