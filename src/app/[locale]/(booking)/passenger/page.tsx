"use client";
import React, { useMemo } from "react";
import {
    useBookingInformation,
    useBookingSelector,
} from "../../hooks/useBookingInformation";
import { FeBookingFormData } from "../modules/booking.interface";
import PassengerFormWraper, {
    PassengerItemType,
} from "./_components/PassengerFormWraper";
import { Space, Button } from "antd";
import { PassengerType } from "@/models/common.interface";
import { FePassengerInformationFormData } from "./modules/passegner.interface";
import { useTranslations } from "next-intl";

const PassengerPage = () => {
    const t = useTranslations("Passenger");
    const bookingDetailItems = useBookingSelector(
        (state) => state.bookingDetails,
    );
    const passengerList = useMemo(() => {
        return bookingDetailItems?.reduce<PassengerItemType[]>((acc, item) => {
            return [
                ...acc,
                {
                    index: item.index,
                    passengerinfo: new FePassengerInformationFormData(
                        undefined,
                        undefined,
                        "",
                        "",
                        undefined,
                        undefined,
                        undefined,
                        "",
                        "",
                        "",
                        "",
                        "",
                        undefined,
                    ),
                    type: item.type,
                },
            ];
        }, []);
    }, []);

    if (!bookingDetailItems?.length || !bookingDetailItems) {
        return null;
    }
    return (
        <>
            <div className="page-passenger px-6 py-4 bg-white rounded-lg">
                <div className="page-passenger__head mb-3">
                    <h1 className="text-2xl">{t("page.title")}</h1>
                </div>

                <div className="page-passenger__body">
                    <div className="page-passenger__note mb-6 text-gray-600 rounded-md">
                        <p>
                            Nhập tiếng Việt không dấu, họ tên trùng khớp trên
                            giấy tờ tuỳ thân, passport.
                        </p>
                    </div>
                    <PassengerFormWraper passengerList={passengerList}>
                        <div className="text-right">
                            <Space align="end">
                                <Button type="primary" ghost onClick={() => {}}>
                                    Mua thêm dịch vụ
                                </Button>
                                <Button type="primary" onClick={() => {}}>
                                    Tiến hành thanh toán
                                </Button>
                            </Space>
                        </div>
                    </PassengerFormWraper>
                </div>
            </div>
        </>
    );
};
export default PassengerPage;
