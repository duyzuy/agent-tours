"use client";
import { useState } from "react";
import { Form, Input, Modal, Button, Space, Row, Col, DatePickerProps } from "antd";
import { IconPen } from "@/assets/icons";
import FormItem from "@/components/base/FormItem";
import { CustomerProfileFormData } from "@/models/fe/profile.interface";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { HandleSubmit } from "@/hooks/useFormSubmit";
import { customerProfileSchema } from "../schema/customerSchema";
import useUpdateCustomerProfile from "../modules/useUpdateCustomerProfile";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
interface ProfileInformationBoxProps {
  fullname?: string;
  dob?: string | null;
  passportNumber?: string;
  country?: string;
  city?: string;
  district?: string;
  address?: string;
}
const ProfileInformationBox: React.FC<ProfileInformationBoxProps> = ({
  fullname,
  dob,
  passportNumber,
  country,
  city,
  district,
  address,
}) => {
  const [isEdit, setEdit] = useState(false);

  const editProfile = () => {
    setEdit(true);
  };
  const cancelEditProfile = () => {
    setEdit(false);
  };

  return (
    <>
      <div className="box-info border-t pt-6 mt-6">
        <div className="box-info__header mb-6 flex gap-x-6">
          <h3 className="text-xl flex items-center font-[500]">
            <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
            <span>Thông tin cá nhân</span>
          </h3>
          <span
            className="btn inline-flex items-center gap-x-2 text-xs cursor-pointer rounded-md text-blue-600"
            onClick={editProfile}
          >
            <IconPen width={14} height={14} />
            <span>Sửa</span>
          </span>
        </div>
        <div className="account-info__content grid grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
          <div className="">
            <span className="text-gray-500 block">Họ và tên</span>
            <span>{fullname || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Ngày sinh</span>
            <span>{dob || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Số hộ Chiếu</span>
            <span>{passportNumber || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Quốc gia</span>
            <span>{country || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Thành phố</span>
            <span>{city || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Quận huyện / khu vực</span>
            <span>{district || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Địa chỉ</span>
            <span>{address || "--"}</span>
          </div>
        </div>
      </div>
      <ModalEditCustomerProfileForm open={isEdit} onCancel={cancelEditProfile} onClose={cancelEditProfile} />
    </>
  );
};
export default ProfileInformationBox;

interface ModalEditCustomerProfileFormProps {
  open?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
}
function ModalEditCustomerProfileForm({ open, onCancel, onClose }: ModalEditCustomerProfileFormProps) {
  const initFormData = new CustomerProfileFormData("", "", "", "", "", "", "", null, null, "", null, null);

  const { updateProfile, isloading } = useUpdateCustomerProfile();
  const { control, handleSubmit, setValue } = useForm<CustomerProfileFormData>({
    defaultValues: initFormData,
    resolver: yupResolver(customerProfileSchema),
  });

  const onSubmitData: HandleSubmit<CustomerProfileFormData> = (data) => {
    updateProfile(data, () => {
      onClose?.();
    });
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
  return (
    <Modal open={open} onOk={() => {}} onCancel={onCancel} footer={null} width={850}>
      <div className="modal-wraper-form lg:px-8">
        <div className="head py-4 mb-3 text-center">
          <h4 className="text-xl font-[500]">Cập nhật thông tin cá nhân</h4>
        </div>
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
                  <FormItem
                    label="Ngày sinh"
                    validateStatus={errors.dob ? "error" : ""}
                    help={errors.dob?.message ?? ""}
                  >
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
                      value={value ? dayjs(value, DATE_FORMAT) : null}
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
                      value={value ? dayjs(value, DATE_FORMAT) : null}
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
                      value={value ? dayjs(value, DATE_FORMAT) : null}
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
      </div>
      <div className="pt-8 pb-2 flex justify-end border-t -mx-6 px-14">
        <Space>
          <Button size="large" className="w-40">
            Huỷ bỏ
          </Button>
          <Button type="primary" size="large" className="w-40" onClick={handleSubmit(onSubmitData)} loading={isloading}>
            Lưu thông tin
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
