import React, { memo, useCallback } from "react";

import classNames from "classnames";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import PassengerForm, { PassengerFormProps } from "./PassengerForm";
import { PassengerType } from "@/models/management/common.interface";

export interface PassengersInformationFormProps {
    className?: string;
    passengerList: {
        bookingIndex: number;
        passengerInfo: IBookingItem["passengerInformation"];
        type: PassengerType;
    }[];
    onSetPassengerInfo: ({
        index,
        data,
    }: {
        index: number;
        data: IBookingItem["passengerInformation"];
    }) => void;
}

const PassengersInformationForm: React.FC<PassengersInformationFormProps> = ({
    className = "",
    passengerList,
    onSetPassengerInfo,
}) => {
    const onChangeFormData: PassengerFormProps["onChangeForm"] = useCallback(
        (data) => {
            onSetPassengerInfo(data);
        },
        [],
    );
    return (
        <div
            className={classNames("passenger__information", {
                [className]: className,
            })}
        >
            <div className="passenger__information-head mb-6">
                <h3 className="font-[500] text-lg">Thông tin hành khách</h3>
                <div>
                    <p>
                        Thông tin hành khách được thay đổi trong quản lý
                        booking.
                    </p>
                </div>
            </div>
            <div className="passenger__information-body">
                {passengerList.map((pax) => (
                    <React.Fragment key={pax.bookingIndex}>
                        <PassengerForm
                            index={pax.bookingIndex}
                            type={pax.type}
                            initialValues={pax.passengerInfo}
                            className="bg-white px-6 py-4 rounded-md drop-shadow-sm mb-6"
                            onChangeForm={onChangeFormData}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
export default memo(PassengersInformationForm);
