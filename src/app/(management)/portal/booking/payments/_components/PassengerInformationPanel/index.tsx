"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { Button, Space, Switch } from "antd";
import usePassenger from "../../../modules/usePassenger";
import { IProductTourBookingItem } from "../../../modules/bookingInformation.interface";
import { PassengerType } from "@/models/common.interface";
import DrawerPassengerInformationForm, { DrawerPassengerInformationFormProps } from "./DrawerPassengerInformationForm";
import { ArrowRightOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { getPassengerType } from "@/utils/common";
import { formatDate } from "@/utils/date";
import useAdminProfile from "@/modules/admin/auth/hooks/useAdminProfile";
import { getPassengerTitle } from "@/constants/common";
import classNames from "classnames";

type PassengerBookingItem = {
  bookingIndex: number;
  passengerInfo: IProductTourBookingItem["passengerInformation"];
  type: PassengerType;
};
type PassengerInformationPanelProps = {
  bookingItems: IProductTourBookingItem[];
  onNext?: () => void;
};
const PassengerInformationPanel: React.FC<PassengerInformationPanelProps> = ({ bookingItems, onNext }) => {
  const userProfile = useAdminProfile();
  const { onSetPassengerInformation } = usePassenger();
  const [showDrawer, setShowDrawer] = useState(false);
  const [isUseProfileInformation, setUseProfileInformation] = useState(false);
  const [isStartTransition, startTransition] = useTransition();

  const [editBooking, setPassengerInformation] = useState<PassengerBookingItem>();

  const onEditPaxInfo = (record: PassengerBookingItem) => {
    setPassengerInformation(record);
    setShowDrawer(true);
  };
  const onCancelEditPaxInfo = () => {
    setPassengerInformation(undefined);
    setShowDrawer(false);
  };
  const onSavePaxInfo: DrawerPassengerInformationFormProps["onOk"] = (index, paxType, data) => {
    onSetPassengerInformation({ index, data: data });
    setShowDrawer(false);
  };

  const handleSetUserProfileForFirstPassenger = (
    checked: boolean,
    passengerInfo: IProductTourBookingItem["passengerInformation"],
  ) => {
    setUseProfileInformation(checked);
    onSetPassengerInformation({ index: 0, data: { ...passengerInfo, paxPhoneNumber: userProfile?.phoneNumber } });
  };
  const handleGoNext = () => {
    onNext && startTransition(onNext);
  };
  return (
    <>
      <div className="passenger-head mb-6">
        <h3 className="font-[500] text-lg">Thông tin hành khách</h3>
        <p>Thông tin hành khách được thay đổi trong quản lý booking.</p>
      </div>
      {bookingItems.map(({ index, passengerInformation, type }) => (
        <div key={index} className="passenger-information rounded-md p-4 border mb-3">
          <div className="passenger-information__head flex items-center justify-between">
            <div className="passenger-information__head flex items-center gap-x-2">
              <UserOutlined className="bg-gray-50 rounded-full p-2 w-8 h-8" />
              <div>
                <span className="text-xs text-gray-600 block">{getPassengerType(type)}</span>
                <span className="font-[500]">Hành khách {index + 1}</span>
              </div>
            </div>
            <Button
              icon={<EditOutlined />}
              onClick={() => onEditPaxInfo({ bookingIndex: index, passengerInfo: passengerInformation, type })}
              type="text"
              size="small"
              className="!text-blue-600 !bg-blue-50"
            >
              Sửa
            </Button>
          </div>
          <hr className="mt-4 mb-4" />
          <div
            className={classNames("passenger-information__body grid grid-cols-3 gap-3", {
              "mb-3": index === 0,
            })}
          >
            <div className="">
              <span className="block text-xs text-gray-600">Danh xưng</span>
              <span>{passengerInformation.paxTitle ? getPassengerTitle(passengerInformation.paxTitle) : "--"}</span>
            </div>
            <div className="">
              <span className="block text-xs text-gray-600">Họ</span>
              <span>{passengerInformation.paxLastname || "--"}</span>
            </div>
            <div className="">
              <span className="block text-xs text-gray-600">Tên đệm và tên</span>
              <span>{passengerInformation.paxMiddleFirstName || "--"}</span>
            </div>
            <div className="">
              <span className="block text-xs text-gray-600">Ngày sinh</span>
              <span>
                {passengerInformation.paxBirthDate ? formatDate(passengerInformation.paxBirthDate, "DD/MM/YYYY") : "--"}
              </span>
            </div>
            <div className="">
              <span className="block text-xs text-gray-600">Số điện thoại</span>
              <span>{passengerInformation.paxPhoneNumber || "--"}</span>
            </div>
          </div>
          {index === 0 ? (
            <Space>
              <Switch
                size="small"
                onChange={(checked) => handleSetUserProfileForFirstPassenger(checked, passengerInformation)}
              />
              Mua cho tôi
            </Space>
          ) : null}
        </div>
      ))}
      <div className="text-right">
        <Button type="primary" ghost size="large" onClick={handleGoNext} loading={isStartTransition} className="w-48">
          <span>
            Đi tiếp <ArrowRightOutlined className="ml-2" />
          </span>
        </Button>
      </div>
      <DrawerPassengerInformationForm
        open={showDrawer}
        bookingIndex={editBooking?.bookingIndex}
        paxType={editBooking?.type}
        data={editBooking?.passengerInfo}
        onClose={onCancelEditPaxInfo}
        onOk={onSavePaxInfo}
      />
    </>
  );
};
export default PassengerInformationPanel;
