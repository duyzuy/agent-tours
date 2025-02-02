"use client";
import { useState } from "react";
import { Modal, Button } from "antd";
import { IconPen } from "@/assets/icons";

import { ICustomerProfile } from "@/models/fe/profile.interface";

import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import UserProfileForm, { UserProfileFormProps } from "./UserProfileForm";
import { useUpdateProfileInfo } from "@/modules/fe/manageBooking/hooks/useUpdateProfile";
import { EditOutlined } from "@ant-design/icons";
type ProfileInformationBoxProps = ProfileBoxItemProps & {
  fullname: string;
  dob: string;
  address: string;
  district: string;
  city: string;
  country: string;
  idNumber: string;
  idDoi: string;
  idDoe: string;
  passportNumber: string;
  passportDoi: string;
  passportDoe: string;
};
const ProfileInformationBox: React.FC<ProfileInformationBoxProps> = ({
  fullname,
  dob,
  address,
  district,
  city,
  country,
  idNumber,
  idDoi,
  idDoe,
  passportNumber,
  passportDoi,
  passportDoe,
}) => {
  const { mutate: updateProfile, isPending } = useUpdateProfileInfo();
  const [isEdit, setEdit] = useState(false);

  const editProfile = () => {
    setEdit(true);
  };
  const cancelEditProfile = () => {
    setEdit(false);
  };

  const handleSubmit: UserProfileFormProps["onSubmit"] = (data) => {
    updateProfile(data, {
      onSuccess(data, variables, context) {
        setEdit(false);
      },
    });
  };

  return (
    <>
      <div className="box-info border-t pt-6 mt-6">
        <div className="box-info__header mb-6 flex items-center gap-x-3">
          <h3 className="text-xl flex items-center font-[500]">
            <span className="w-[6px] h-6 block bg-[#56b3d6] left-0 rounded-md mr-3"></span>
            <span>Thông tin cá nhân</span>
          </h3>
          <Button icon={<EditOutlined />} onClick={editProfile} shape="circle" type="text" size="small" />
        </div>
      </div>
      {isEdit ? (
        <UserProfileForm
          values={{
            fullname,
            dob,
            address,
            district,
            city,
            country,
            idNumber,
            idDoi,
            idDoe,
            passportNumber,
            passportDoi,
            passportDoe,
          }}
          onSubmit={handleSubmit}
          onCancel={cancelEditProfile}
          isloading={isPending}
        />
      ) : (
        <ProfileBoxItem
          fullname={fullname}
          dob={dob}
          address={address}
          district={district}
          city={city}
          country={country}
          idNumber={idNumber}
          passportNumber={passportNumber}
        />
      )}
    </>
  );
};
export default ProfileInformationBox;

interface ProfileBoxItemProps {
  fullname: string;
  dob: string;
  passportNumber: string;
  country: string;
  city: string;
  district: string;
  address: string;
  idNumber: string;
}
const ProfileBoxItem = ({ fullname, district, dob, passportNumber, city, country, address }: ProfileBoxItemProps) => {
  return (
    <div className="account-info__content grid grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
      <div className="">
        <span className="text-gray-500 block">Họ và tên</span>
        <span>{fullname || "--"}</span>
      </div>
      <div className="">
        <span className="text-gray-500 block">Ngày sinh</span>
        <span>{dob ? dayjs(dob, DATE_FORMAT).format("DD/MM/YYYY") : "--"}</span>
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
  );
};
