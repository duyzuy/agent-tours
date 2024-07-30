"use client";
import { useState } from "react";
import { Modal } from "antd";
import { IconPen } from "@/assets/icons";

import { ICustomerProfile } from "@/models/fe/profile.interface";

import useUpdateCustomerProfile from "../modules/useUpdateCustomerProfile";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import UserProfileForm, { UserProfileFormProps } from "./UserProfileForm";
interface ProfileInformationBoxProps {
  data?: ICustomerProfile;
}
const ProfileInformationBox: React.FC<ProfileInformationBoxProps> = ({ data }) => {
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
            <span>{data?.fullname || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Ngày sinh</span>
            <span>{data?.dob ? dayjs(data.dob, DATE_FORMAT).format("DD/MM/YYYY") : "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Số hộ Chiếu</span>
            <span>{data?.passportNumber || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Quốc gia</span>
            <span>{data?.country || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Thành phố</span>
            <span>{data?.city || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Quận huyện / khu vực</span>
            <span>{data?.district || "--"}</span>
          </div>
          <div className="">
            <span className="text-gray-500 block">Địa chỉ</span>
            <span>{data?.address || "--"}</span>
          </div>
        </div>
      </div>
      <ModalEditCustomerProfileForm
        values={data}
        open={isEdit}
        onCancel={cancelEditProfile}
        onClose={cancelEditProfile}
      />
    </>
  );
};
export default ProfileInformationBox;

interface ModalEditCustomerProfileFormProps {
  open?: boolean;
  onCancel?: () => void;
  onClose?: () => void;
  values?: ICustomerProfile;
}
function ModalEditCustomerProfileForm({ open, onCancel, onClose, values }: ModalEditCustomerProfileFormProps) {
  const { updateProfile, isloading } = useUpdateCustomerProfile();

  const handleSubmit: UserProfileFormProps["onSubmit"] = (data) => {
    updateProfile(data, () => {
      onClose?.();
    });
  };
  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={850}>
      <div className="modal-wraper-form lg:px-8">
        <div className="head py-4 mb-3 text-center">
          <h4 className="text-xl font-[500]">Cập nhật thông tin cá nhân</h4>
        </div>
        <UserProfileForm values={values} onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </Modal>
  );
}
