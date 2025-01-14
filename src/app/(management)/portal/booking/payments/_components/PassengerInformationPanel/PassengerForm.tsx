import React, { memo, useState } from "react";
import { PassengerType } from "@/models/common.interface";
import { Col, Form, Input, Row, Select, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { PassengerInformationFormData } from "../../../modules/passenger.interface";
import { DATE_FORMAT, PASSENGER_AGES, PASSENGER_GENDER, PASSENGER_TITLES } from "@/constants/common";
import { IProductTourBookingItem } from "../../../modules/bookingInformation.interface";
import { getPassengerType } from "@/utils/common";
import classNames from "classnames";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import useMessage from "@/hooks/useMessage";

type RequiredPaxFormData = Required<PassengerInformationFormData>;
export interface PassengerFormProps {
  index: number;
  type: PassengerType;
  initialValues?: IProductTourBookingItem["passengerInformation"];
  errors?: Partial<Record<keyof RequiredPaxFormData, string>>;
  onChangeForm: ({ index, data }: { index: number; data: IProductTourBookingItem["passengerInformation"] }) => void;
  startDate?: string;
  className?: string;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  index,
  type,
  onChangeForm,
  initialValues,
  startDate,
  className = "",
  errors,
}) => {
  const message = useMessage();
  const [errorForm, setErrorForm] = useState<{ paxBirthDate?: string; expiredPassportDate?: string } | undefined>();
  const onChange = (
    key: keyof PassengerInformationFormData,
    value: PassengerInformationFormData[keyof PassengerInformationFormData],
  ) => {
    const newPaxInfo = { ...initialValues, [key]: value };

    onChangeForm({ index, data: newPaxInfo });
  };

  const onChangeBirthDate: DatePickerProps["onChange"] = (date) => {
    let errorMess = "";
    if (type === PassengerType.ADULT && dayjs(startDate).diff(date, "years") < PASSENGER_AGES.adult.min) {
      errorMess = "Người lớn phải từ 12 tuổi trở lên";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }
    if (
      (type === PassengerType.CHILD && dayjs(startDate).diff(date, "years") < PASSENGER_AGES.child.min) ||
      (type === PassengerType.CHILD && dayjs(startDate).diff(date, "years") > PASSENGER_AGES.child.max)
    ) {
      errorMess = "Trẻ em từ 2 đến 12 tuổi";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }

    if (type === PassengerType.INFANT && dayjs(startDate).diff(date, "years") > PASSENGER_AGES.infant.max) {
      errorMess = "Em bé từ 2 tuổi trở xuống.";
      setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
      return;
    }
    setErrorForm((prev) => ({ ...prev, paxBirthDate: undefined }));
    onChangeForm({
      index,
      data: {
        ...initialValues,
        paxBirthDate: date?.locale("en").format(DATE_FORMAT),
      },
    });
  };
  const onChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
    const newPaxInfo = {
      ...initialValues,
      paxPassortExpiredDate: date?.locale("en").format(DATE_FORMAT),
    };

    onChangeForm({ index, data: newPaxInfo });
  };

  return (
    <div
      className={classNames("passenger__information-box-item", {
        [className]: className,
      })}
    >
      <div className="passenger__information-box-item-head mb-3 pb-3">
        <span className="inline-block mr-2 text-[16px] font-[500]">{`Hành khách ${index + 1}`}</span>
        <span className="text-xs">({getPassengerType(type)})</span>
      </div>
      <div className="passenger__information-box-form">
        <Form layout="vertical" component="div">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Danh xưng"
                required
                validateStatus={errors?.paxTitle ? "error" : ""}
                help={errors?.paxTitle || ""}
              >
                <Select
                  value={initialValues?.paxTitle}
                  placeholder="Chọn danh xưng"
                  options={PASSENGER_TITLES}
                  onChange={(value) => onChange("paxTitle", value)}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Giới tính"
                required
                validateStatus={errors?.paxGender ? "error" : ""}
                help={errors?.paxGender || ""}
              >
                <Select
                  value={initialValues?.paxGender}
                  placeholder="Chọn giới tính"
                  options={PASSENGER_GENDER}
                  onChange={(value) => onChange("paxGender", value)}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Họ"
                required
                validateStatus={errors?.paxLastname ? "error" : ""}
                help={errors?.paxLastname || ""}
              >
                <Input
                  value={initialValues?.paxLastname}
                  placeholder="Họ"
                  onChange={(ev) => onChange("paxLastname", ev.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Tên đệm và tên"
                required
                validateStatus={errors?.paxMiddleFirstName ? "error" : ""}
                help={errors?.paxMiddleFirstName || ""}
              >
                <Input
                  value={initialValues?.paxMiddleFirstName}
                  placeholder="Tên đệm và tên"
                  onChange={(ev) => onChange("paxMiddleFirstName", ev.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Ngày sinh"
                required
                validateStatus={errors?.paxBirthDate || errorForm?.paxBirthDate ? "error" : ""}
                help={errors?.paxBirthDate || errorForm?.paxBirthDate || ""}
              >
                <CustomDatePicker
                  format="DD/MM/YYYY"
                  className="w-full"
                  value={
                    initialValues?.paxBirthDate
                      ? dayjs(initialValues?.paxBirthDate, { format: DATE_FORMAT })
                      : undefined
                  }
                  disabledDate={(date) => date.isAfter(dayjs())}
                  onChange={onChangeBirthDate}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Số điện thoại"
                validateStatus={errors?.paxPhoneNumber ? "error" : ""}
                help={errors?.paxPhoneNumber || ""}
              >
                <Input
                  value={initialValues?.paxPhoneNumber}
                  placeholder="Số điện thoại"
                  onChange={(ev) => onChange("paxPhoneNumber", ev.target.value)}
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
                  value={initialValues?.paxAddress}
                  placeholder="Nhập địa chỉ thường trú"
                  onChange={(ev) => onChange("paxAddress", ev.target.value)}
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
                  value={initialValues?.paxPassportNumber}
                  placeholder="Số passport/CCCD"
                  onChange={(ev) => onChange("paxPassportNumber", ev.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Ngày hết hạn"
                validateStatus={errors?.paxPassortExpiredDate || errorForm?.expiredPassportDate ? "error" : ""}
                help={errors?.paxPassortExpiredDate || errorForm?.expiredPassportDate || ""}
              >
                <CustomDatePicker
                  format="DD/MM/YYYY"
                  className="w-full"
                  value={
                    initialValues?.paxPassortExpiredDate
                      ? dayjs(initialValues?.paxPassortExpiredDate, DATE_FORMAT)
                      : undefined
                  }
                  disabledDate={(date) => date.isBefore(dayjs())}
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
                  value={initialValues?.paxNationality}
                  placeholder="Nhập quốc tịch"
                  onChange={(ev) => onChange("paxNationality", ev.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default memo(PassengerForm);
