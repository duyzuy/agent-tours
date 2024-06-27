import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import classNames from "classnames";
import PassengerForm, { PassengerFormProps } from "./PassengerForm";
import { PassengerType } from "@/models/common.interface";
import { FePassengerInformationFormData } from "../../modules/passegner.interface";

import { Space, Button } from "antd";
import { useRouter } from "next/navigation";

import { object } from "yup";
import { isEqualObject } from "@/utils/compare";

import ModalConfirmation from "./ModalConfirmation";
import { passengerInformationSchema } from "../../schema/passenger.schema";

export type PassengerItemType = {
    index: number;
    type: PassengerType;
    passengerinfo: FePassengerInformationFormData;
};

export type PassengerFormValues = {
    passengerItem: PassengerItemType[];
};
export interface FePassengerInformationFormProps {
    className?: string;
    startDate?: string;
    passengerList?: PassengerItemType[];
    children?: React.ReactNode;
    onSetPassengerInfo?: ({
        index,
        data,
    }: {
        index: number;
        data: FePassengerInformationFormData;
    }) => void;
    onSetPassengerInformationBooking?: (data: PassengerItemType[]) => void;
}

const PassengerFormWraper: React.FC<FePassengerInformationFormProps> = ({
    className = "",
    passengerList,
    startDate,
    children,
    onSetPassengerInfo,
    onSetPassengerInformationBooking,
}) => {
    const [isShow, setShowModal] = useState(false);
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        clearErrors,
    } = useForm<PassengerFormValues>({
        resolver: yupResolver(passengerInformationSchema),
        defaultValues: {
            passengerItem: passengerList,
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "passengerItem",
    });

    return (
        <>
            <div
                className={classNames("passenger__information", {
                    [className]: className,
                })}
            >
                <div className="passenger__information-body">
                    {fields.map((field, index) => (
                        <PassengerForm
                            key={field.id}
                            {...{ control, index, field }}
                            startDate={startDate}
                            type={field.type}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            className="bg-white mb-6 border-b"
                        />
                    ))}
                </div>
            </div>
            {/* <Button onClick={() => setShowModal((prev) => !prev)}>
                submittt
            </Button> */}
            {children}
            <ModalConfirmation
                isShowModal={isShow}
                onCancel={() => {}}
                onConfirm={() => {}}
            />
        </>
    );
};
export default memo(PassengerFormWraper);
