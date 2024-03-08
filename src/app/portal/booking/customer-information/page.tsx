"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Divider, Row } from "antd";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import BookingBreakDownSummary from "./_components/BookingBreakDownSummary";

import useCreateBooking from "../modules/useCreateBooking";
import CustomerInformationForm, {
    CustomerInformationFormProps,
} from "./_components/CustomerInformationForm";

interface Props {}

const CustomerInformationPage = ({}: Props) => {
    const [bookingInformation, setBookingInfomation] = useBooking();
    const router = useRouter();
    const { onCreateBooking } = useCreateBooking();

    const [isSubmitBooking, setSubmitBooking] = useState(false);

    const onSubmitBooking: CustomerInformationFormProps["onSubmit"] = (
        customerInfo,
        customerNote,
    ) => {
        setBookingInfomation((prev) => ({
            ...prev,
            bookingInfo: {
                ...prev.bookingInfo,
                customerInformation: customerInfo,
                rmk: customerNote,
            },
        }));
        setSubmitBooking(true);
    };

    console.log(bookingInformation);
    useEffect(() => {
        isSubmitBooking && onCreateBooking(), setSubmitBooking(false);
    }, [isSubmitBooking]);

    useEffect(() => {
        if (
            isUndefined(bookingInformation?.bookingInfo?.product) ||
            isUndefined(bookingInformation.bookingInfo.passengerSelections) ||
            !bookingInformation.bookingInfo.passengerSelections.length
        ) {
            router.push("./portal/booking");
        }
    }, [bookingInformation]);

    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 h-full">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb
                    items={[
                        {
                            title: "Chọn sản phẩm",
                        },
                        {
                            title: "Thông tin người đặt",
                        },
                    ]}
                />
                <div className="h-4"></div>
                <div className="customer__page">
                    <Row gutter={32}>
                        <Col span={15}>
                            <div className="customer__information bg-white px-6 py-4 rounded-md">
                                <div className="customer__information-head">
                                    <h3 className="font-bold text-lg">
                                        Thông tin người đặt
                                    </h3>
                                </div>
                                <Divider />
                                <div className="customer__information-body">
                                    <CustomerInformationForm
                                        onSubmit={onSubmitBooking}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={9}>
                            <BookingBreakDownSummary label="Thông tin sản phẩm" />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default CustomerInformationPage;
