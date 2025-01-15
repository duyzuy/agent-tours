"use client";
import React, { memo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

import { FeBookingInformation } from "../../../modules/booking.interface";
import { IconPen, IconUser } from "@/assets/icons";
import { getPassengerType } from "@/utils/common";
import { Button, Space } from "antd";
import DrawerPassengerInformationForm from "./DrawerPassengerInformationForm";
export type PassengerItemType = FeBookingInformation["bookingInfo"]["passengers"][number];

export interface FePassengerInformationFormProps {
  className?: string;
  startDate?: string;
  passengerList: FeBookingInformation["bookingInfo"]["passengers"];
  title?: string;
  descriptions?: React.ReactNode;
  children?: React.ReactNode;
  onUpdate?: (data: FeBookingInformation["bookingInfo"]["passengers"][number]) => void;
}

const PassengerFormWraper = ({
  className = "",
  passengerList,
  startDate,
  title,
  descriptions,
  onUpdate,
}: FePassengerInformationFormProps) => {
  const [isShow, setShowModal] = useState(false);
  const [editPax, setEditPax] = useState<FeBookingInformation["bookingInfo"]["passengers"][number]>();

  const onEditPassengerInformation = (record: FeBookingInformation["bookingInfo"]["passengers"][number]) => {
    setEditPax(record);
    setShowModal(true);
  };
  const onCancelPassengerInformation = () => {
    setEditPax(undefined);
    setShowModal(false);
  };
  const onSavePassengerInformation = (record: FeBookingInformation["bookingInfo"]["passengers"][number]) => {
    onUpdate?.(record);
    setShowModal(false);
  };
  const t = useTranslations("String");

  return (
    <>
      <div
        className={classNames("passenger__information", {
          [className]: className,
        })}
      >
        <div className="page-passenger__head relative mb-6">
          <span className="w-1 h-4 block rounded-full bg-primary-default absolute -left-3 lg:-left-6 top-2"></span>
          <h3 className="text-xl font-[500] mb-2">{title}</h3>
          <p className="text-gray-600">{descriptions}</p>
        </div>

        {passengerList.map(({ info, index, type }) => (
          <PassengerFormWraper.Info
            key={index}
            className={classNames("", {
              "mt-3 border-t pt-3": index !== 0,
            })}
            paxIndex={index}
            paxType={getPassengerType(type)}
            paxLastname={info.paxLastname}
            paxTitle={info.paxTitle}
            paxBirthDate={info.paxBirthDate ? dayjs(info.paxBirthDate).locale("en").format("DD/MM/YYYY") : "--"}
            paxGender={info.paxGender ? t(`gender.${info.paxGender}`) : "--"}
            paxMiddleFirstName={info.paxMiddleFirstName}
            onClick={() => onEditPassengerInformation({ info, index, type })}
          />
        ))}
      </div>
      <DrawerPassengerInformationForm
        open={isShow}
        data={editPax?.info}
        bookingIndex={editPax?.index}
        paxType={editPax?.type}
        onClose={onCancelPassengerInformation}
        startDate={startDate}
        onOk={onSavePassengerInformation}
      />
    </>
  );
};
export default memo(PassengerFormWraper);

interface PassengerFormWrapperInfomationItemProps {
  className?: string;
  paxLastname?: string;
  paxMiddleFirstName?: string;
  paxTitle?: string;
  paxType?: string;
  paxGender?: string;
  paxBirthDate?: string;
  paxIndex?: number;
  onClick?: () => void;
}
PassengerFormWraper.Info = function PassengerFormWrapperInfomationItem({
  className = "",
  paxLastname,
  paxTitle,
  paxMiddleFirstName,
  paxType,
  paxGender,
  paxBirthDate,
  paxIndex = 0,
  onClick,
}: PassengerFormWrapperInfomationItemProps) {
  const t = useTranslations("String");
  return (
    <div
      className={classNames("pax-item-info", {
        [className]: className,
      })}
    >
      <Space className="mb-3 font-[500]">
        <IconUser className="w-6 h-6 bg-slate-100 p-1 rounded-full" />
        {`Hành khách ${paxIndex + 1}`}
        <span className="text-xs text-gray-500 font-normal">{`(${paxType})`}</span>
      </Space>
      <div className="grid grid-cols-3 gap-2">
        <div className="">
          <span className="block w-24 text-xs text-gray-500">{t("paxTitle")}</span>
          <span>{paxTitle || "--"}</span>
        </div>
        <div className="">
          <span className="block w-24 text-xs text-gray-500">{t("lastName")}</span>
          <span>{paxLastname || "--"}</span>
        </div>
        <div className="">
          <span className="block w-24 text-xs text-gray-500">{t("middleAndFirstName")}</span>
          <span>{paxMiddleFirstName || "--"}</span>
        </div>
        <div className="">
          <span className="block w-24 text-xs text-gray-500">{t("gender.label")}</span>
          <span>{paxGender}</span>
        </div>
        <div className="">
          <span className="block w-24 text-xs text-gray-500">{t("DOB")}</span>
          <span>{paxBirthDate}</span>
        </div>
        <div>
          <Button
            type="link"
            size="small"
            className="!p-0 !inline-flex items-center !underline"
            icon={<IconPen className="w-3 h-3" />}
            onClick={onClick}
          >
            {t("button.editInformation")}
          </Button>
        </div>
      </div>
    </div>
  );
};
