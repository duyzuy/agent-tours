"use client";
import React, { useMemo, useState } from "react";
import PassengerFormWraper from "./_components/PassengerFormWraper";
import { Space, Button } from "antd";

import { useTranslations } from "next-intl";
import ServiceContainer from "./_components/ServiceContainer";
import usePassengerInformation from "./modules/usePassengerInformation";
import { isEmpty } from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { passengerInformationSchema } from "./schema/passenger.schema";
import { FeBookingInformation } from "../modules/booking.interface";
import { useTransition } from "react";
import { useRouter } from "@/utils/navigation";
export type PassengerItemType =
    FeBookingInformation["bookingInfo"]["passengers"][0];

export type PassengerFormValues = {
    passengerItem: PassengerItemType[];
};
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray } from "react-hook-form";

enum ESubmitAction {
    SET_PASSENGER_INFO = "SET_PASSENGER_INFO",
    NEXT_TO_PAYMENT = "NEXT_TO_PAYMENT",
}
const PassengerPage = () => {
    /**
     * PassengerInfomation form data has been init from hook @useInitProductItemAndPassengersInformation
     */
    const { setPassengerInformation, passengers } = usePassengerInformation();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const t = useTranslations("Passenger");
    const [canEditPax, setCanEditPax] = useState(false);
    const [nextSubmitAction, setNextAction] = useState<ESubmitAction>(
        ESubmitAction.SET_PASSENGER_INFO,
    );

    const { handleSubmit, control, setValue, clearErrors } =
        useForm<PassengerFormValues>({
            resolver: yupResolver(passengerInformationSchema),
            defaultValues: {
                passengerItem: [...passengers],
            },
        });

    const { fields } = useFieldArray({
        control,
        name: "passengerItem",
    });

    const handleGonextActions: SubmitHandler<PassengerFormValues> = (data) => {
        startTransition(() => {
            if (nextSubmitAction === ESubmitAction.SET_PASSENGER_INFO) {
                setPassengerInformation?.(data.passengerItem);
                setCanEditPax(false);
                setNextAction(ESubmitAction.NEXT_TO_PAYMENT);
            }

            if (nextSubmitAction === ESubmitAction.NEXT_TO_PAYMENT) {
                console.log("payment");
                router.push("/payment");
            }
        });
    };
    const setEditPassengerInformation = () => {
        setCanEditPax(true);
        setNextAction(ESubmitAction.SET_PASSENGER_INFO);
    };
    const isCompletePassengerInformation = useMemo(() => {
        return !passengers.some(
            (pax) =>
                isEmpty(pax.info.paxLastname) ||
                isEmpty(pax.info.paxMiddleFirstName) ||
                isEmpty(pax.info.paxBirthDate) ||
                isEmpty(pax.info.paxGender),
        );
    }, [passengers]);

    if (!passengers?.length || !passengers) {
        return null;
    }

    return (
        <>
            <div className="page-passenger rounded-lg">
                <PassengerFormWraper
                    title={t("page.title")}
                    descriptions="Nhập tiếng Việt không dấu, họ tên trùng khớp trên
                            giấy tờ tuỳ thân, passport."
                    passengerList={passengers}
                    isCompleted={isCompletePassengerInformation}
                    canEditPax={canEditPax}
                    onEditPax={setEditPassengerInformation}
                    fields={fields}
                    control={control}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    className="bg-white rounded-lg p-6"
                />
                <div className="h-6"></div>
                {isCompletePassengerInformation && !canEditPax ? (
                    <>
                        <ServiceContainer
                            passengerList={passengers}
                            className="bg-white rounded-lg"
                        />
                        <div className="h-6"></div>
                    </>
                ) : null}
                <div className="text-right">
                    <Space align="end">
                        <Button
                            type="primary"
                            size="large"
                            className="w-[180px]"
                            onClick={handleSubmit(handleGonextActions)}
                            loading={isPending}
                        >
                            Tiếp tục
                        </Button>
                    </Space>
                </div>
            </div>
        </>
    );
};
export default PassengerPage;
