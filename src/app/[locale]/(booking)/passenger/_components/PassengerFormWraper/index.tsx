"use client";
import React, { memo, useState } from "react";
import {
    Control,
    FieldArrayWithId,
    UseFormClearErrors,
    UseFormSetValue,
} from "react-hook-form";
import classNames from "classnames";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import PassengerForm from "./PassengerForm";
import ModalConfirmation from "./ModalConfirmation";
import { FeBookingInformation } from "../../../modules/booking.interface";
import { IconPen } from "@/assets/icons";
export type PassengerItemType =
    FeBookingInformation["bookingInfo"]["passengers"][0];

export type PassengerFormValues = {
    passengerItem: PassengerItemType[];
};
export interface FePassengerInformationFormProps {
    className?: string;
    startDate?: string;
    passengerList: FeBookingInformation["bookingInfo"]["passengers"];
    title?: string;
    descriptions?: React.ReactNode;
    children?: React.ReactNode;
    isCompleted?: boolean;
    canEditPax?: boolean;
    control?: Control<PassengerFormValues>;
    fields?: FieldArrayWithId<PassengerFormValues, "passengerItem", "id">[];
    clearErrors?: UseFormClearErrors<PassengerFormValues>;
    setValue?: UseFormSetValue<PassengerFormValues>;
    onEditPax?: () => void;
}

const PassengerFormWraper = ({
    className = "",
    passengerList,
    startDate,
    title,
    descriptions,
    children,
    isCompleted = false,
    canEditPax = true,
    setValue,
    clearErrors,
    fields,
    control,
    onEditPax,
}: FePassengerInformationFormProps) => {
    const [isShow, setShowModal] = useState(false);

    const t = useTranslations("String");

    return (
        <>
            <div
                className={classNames("passenger__information", {
                    [className]: className,
                })}
            >
                <div className="page-passenger__head mb-3">
                    <h1 className="text-xl font-[500]">{title}</h1>
                </div>
                <div className="page-passenger__note mb-6 text-gray-600 rounded-md">
                    <p>{descriptions}</p>
                </div>
                <div className="passenger__information-body">
                    {isCompleted && !canEditPax
                        ? passengerList.map(({ info, index, type }) => (
                              <PassengerFormWraper.Info
                                  key={index}
                                  className={classNames(
                                      "pax-item-info border rounded-md px-4",
                                      {
                                          "mt-6": index !== 0,
                                      },
                                  )}
                                  paxLastname={info.paxLastname}
                                  paxBirthDate={
                                      info.paxBirthDate
                                          ? dayjs(info.paxBirthDate)
                                                .locale("en")
                                                .format("DD/MM/YYYY")
                                          : "--"
                                  }
                                  paxGender={t(`gender.${info.paxGender}`)}
                                  paxMiddleFirstName={info.paxMiddleFirstName}
                                  onClick={onEditPax}
                              />
                          ))
                        : fields?.map((paxField, index) => (
                              <PassengerForm
                                  key={paxField.id}
                                  {...{ control, index, field: paxField }}
                                  startDate={startDate}
                                  type={paxField.type}
                                  setValue={setValue}
                                  clearErrors={clearErrors}
                                  className={classNames("bg-white ", {
                                      "mt-6 pt-6 border-t": index !== 0,
                                  })}
                              />
                          ))}
                </div>
            </div>
            <ModalConfirmation
                isShowModal={isShow}
                onCancel={() => {}}
                onConfirm={() => {}}
            />
        </>
    );
};
export default memo(PassengerFormWraper);

interface PassengerFormWrapperInfomationItemProps {
    className?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxType?: string;
    paxGender?: string;
    paxBirthDate?: string;
    onClick?: () => void;
}
PassengerFormWraper.Info = function PassengerFormWrapperInfomationItem({
    className = "",
    paxLastname,
    paxMiddleFirstName,
    paxType,
    paxGender,
    paxBirthDate,
    onClick,
}: PassengerFormWrapperInfomationItemProps) {
    const t = useTranslations("String");
    return (
        <div
            className={classNames("pax-item-info border rounded-md px-4", {
                [className]: className,
            })}
        >
            <div className="pax-item-info__head py-3 flex justify-between">
                <span className="flex items-center gap-x-2">
                    <span className="text-[16px] uppercase">{`${paxLastname}, ${paxMiddleFirstName}`}</span>
                    <span className="text-xs text-gray-500">{paxType}</span>
                </span>
                <span
                    className="flex items-center gap-x-1 cursor-pointer text-primary-default"
                    onClick={onClick}
                >
                    <IconPen width={14} height={14} />
                    {t("button.edit")}
                </span>
            </div>
            <div className="pax-item-info__body">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-1/2 px-3 mb-3">
                        <span className="block w-24 text-xs text-gray-500">
                            {t("gender")}
                        </span>
                        <span>{paxGender}</span>
                    </div>
                    <div className="w-1/2 px-3 mb-3">
                        <span className="block w-24 text-xs text-gray-500">
                            {t("DOB")}
                        </span>
                        <span>{paxBirthDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
