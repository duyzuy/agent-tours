"use client";
import { useEffect } from "react";
import { Form, Input, Button, Space, Row, Col, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { CustomerProfileFormData, ICustomerProfile } from "@/models/fe/profile.interface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { HandleSubmit } from "@/hooks/useFormSubmit";
import { customerProfileSchema } from "../schema/customerSchema";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";

export interface UserProfileFormProps {
  onCancel?: () => void;
  values?: ICustomerProfile;
  onSubmit?: (data: CustomerProfileFormData, cb?: () => void) => void;
  isloading?: boolean;
}
const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit, values, onCancel, isloading }) => {
  const initFormData = new CustomerProfileFormData("", "", "", "", "", "", "", "", "", "", "", "");

  const { control, handleSubmit, setValue } = useForm<CustomerProfileFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(customerProfileSchema),
  });

  const handleSubmitData: HandleSubmit<CustomerProfileFormData> = (data) => {
    onSubmit?.(data);
  };

  const onChangeIdIssueDate: DatePickerProps["onChange"] = (date, dateStr) => {
    date && setValue("idDoi", date.locale("en").format(DATE_FORMAT));
  };
  const onChangeIdExpDate: DatePickerProps["onChange"] = (date, dateStr) => {
    date && setValue("idDoe", date.locale("en").format(DATE_FORMAT));
  };
  const onChangePassportIssueDate: DatePickerProps["onChange"] = (date, dateStr) => {
    date && setValue("passportDoi", date.locale("en").format(DATE_FORMAT));
  };
  const onChangePassportExpDate: DatePickerProps["onChange"] = (date, dateStr) => {
    date && setValue("passportDoe", date.locale("en").format(DATE_FORMAT));
  };
  const onChangeBOD: DatePickerProps["onChange"] = (date, dateStr) => {
    date && setValue("dob", date.locale("en").format(DATE_FORMAT));
  };

  useEffect(() => {
    if (values) {
      const data = new CustomerProfileFormData(
        values.fullname,
        values.dob,
        values.address,
        values.district,
        values.city,
        values.country,
        values.idNumber,
        values.idDoi,
        values.idDoe,
        values.passportNumber,
        values.passportDoi,
        values.passportDoe,
      );
      Object.keys(data).forEach((key) => {
        console.log({ key, value: values[key as keyof CustomerProfileFormData] });
        setValue(key as keyof CustomerProfileFormData, values[key as keyof CustomerProfileFormData]);
      });
    }
  }, [values]);
  return (
    <>
      <Form layout="vertical">
        <div className="mb-3">
          <span className="text-base font-[500]">Thông tin cơ bản</span>
        </div>
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="fullname"
              render={({ field, formState: { errors } }) => (
                <FormItem
                  label="Họ và tên"
                  validateStatus={errors?.fullname ? "error" : ""}
                  help={errors?.fullname?.message ?? ""}
                >
                  <Input {...field} placeholder="Họ và tên" size="large" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="dob"
              render={({ field: { value }, formState: { errors } }) => (
                <FormItem label="Ngày sinh" validateStatus={errors.dob ? "error" : ""} help={errors.dob?.message ?? ""}>
                  <CustomDatePicker
                    placeholder="Ngày sinh"
                    size="large"
                    className="w-full"
                    value={value ? dayjs(value, DATE_FORMAT) : null}
                    onChange={onChangeBOD}
                  />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="country"
              render={({ field, formState: { errors } }) => (
                <FormItem
                  label="Quốc gia"
                  validateStatus={errors.country ? "error" : ""}
                  help={errors.country?.message ?? ""}
                >
                  <Input {...field} placeholder="Quốc gia" size="large" className="w-full" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem label="Tỉnh/thành phố">
                  <Input {...field} placeholder="Tỉnh/thành phố" size="large" className="w-full" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="district"
              render={({ field }) => (
                <FormItem label="Quận/huện">
                  <Input {...field} placeholder="Quận/huện" size="large" className="w-full" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem label="Địa chỉ, số nhà">
                  <Input {...field} placeholder="Địa chỉ, số nhà" size="large" className="w-full" />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <div className="line h-6"></div>
        <div className="mb-3">
          <span className="text-base font-[500]">Thông tin giấy tờ</span>
        </div>
        <Row gutter={24}>
          <Col span={24}>
            <Controller
              control={control}
              name="idNumber"
              render={({ field }) => (
                <FormItem label="CCCD/CMND">
                  <Input {...field} placeholder="CCCD/CMND" size="large" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="idDoi"
              render={({ field: { value } }) => (
                <FormItem label="Ngày cấp">
                  <CustomDatePicker
                    placeholder="Ngày cấp"
                    size="large"
                    className="w-full"
                    value={value ? dayjs(value, DATE_FORMAT) : undefined}
                    onChange={onChangeIdIssueDate}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="idDoe"
              render={({ field: { value } }) => (
                <FormItem label="Ngày hết hạn">
                  <CustomDatePicker
                    placeholder="Ngày hết hạn"
                    size="large"
                    className="w-full"
                    value={value ? dayjs(value, DATE_FORMAT) : undefined}
                    onChange={onChangeIdExpDate}
                  />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Controller
              control={control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem label="Số hộ chiếu">
                  <Input {...field} placeholder="Số hộ chiếu" size="large" />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="passportDoi"
              render={({ field: { value } }) => (
                <FormItem label="Ngày cấp hộ chiếu">
                  <CustomDatePicker
                    placeholder="Ngày cấp hộ chiếu"
                    size="large"
                    className="w-full"
                    value={value ? dayjs(value, DATE_FORMAT) : undefined}
                    onChange={onChangePassportIssueDate}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              control={control}
              name="passportDoe"
              render={({ field: { value, onChange } }) => (
                <FormItem label="Ngày hết hạn hộ chiếu">
                  <CustomDatePicker
                    placeholder="Ngày hết hạn hộ chiếu"
                    size="large"
                    className="w-full"
                    value={value ? dayjs(value, DATE_FORMAT) : null}
                    onChange={onChangePassportExpDate}
                  />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
      <div className="line bg-gray-100 h-[1px] mt-3 mb-6"></div>
      <div className="flex justify-end">
        <Space>
          {onCancel ? (
            <Button size="large" className="w-40" onClick={onCancel}>
              Huỷ bỏ
            </Button>
          ) : null}
          <Button
            type="primary"
            size="large"
            className="w-40"
            onClick={handleSubmit(handleSubmitData)}
            loading={isloading}
          >
            Lưu thông tin
          </Button>
        </Space>
      </div>
    </>
  );
};
export default UserProfileForm;
