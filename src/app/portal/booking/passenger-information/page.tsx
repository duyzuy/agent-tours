"use client";
import React, { useEffect, useMemo } from "react";
import { Breadcrumb, Col, Row } from "antd";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import BookingSummary from "../_components/BookingSummary";
import PassengersInformationForm from "./_components/PassengersInformationForm";
import { Space, Button } from "antd";
import usePassenger from "../modules/usePassenger";
import { IBookingItem } from "../modules/bookingInformation.interface";
import { PassengerType } from "@/models/management/common.interface";
import { isUndefined } from "lodash";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { passengerInformationSchema } from "./schema/passengerInformation.schema";

const CustomerInformationPage = () => {
    const [bookingInformation, _] = useBooking();
    const router = useRouter();
    // const { handlerSubmit, errors } = useFormSubmit({ schema: undefined });
    // console.log(errors);
    const { onSetPassengerInformation } = usePassenger();

    const passengerList = useMemo(() => {
        return (
            bookingInformation.bookingInfo?.bookingItems?.reduce<
                {
                    bookingIndex: number;
                    passengerInfo: IBookingItem["passengerInformation"];
                    type: PassengerType;
                }[]
            >((acc, bkItem) => {
                acc = [
                    ...acc,
                    {
                        bookingIndex: bkItem.index,
                        type: bkItem.type,
                        passengerInfo: bkItem.passengerInformation,
                    },
                ];
                return acc;
            }, []) || []
        );
    }, [bookingInformation]);

    // const passengerFormData = useMemo(() => {
    //     return (
    //         bookingInformation.bookingInfo?.bookingItems?.reduce<
    //             IBookingItem["passengerInformation"] & { type: PassengerType }[]
    //         >((acc, bkItem) => {
    //             acc = [
    //                 ...acc,
    //                 {
    //                     ...bkItem.passengerInformation,
    //                     type: bkItem.type,
    //                 },
    //             ];
    //             return acc;
    //         }, []) || []
    //     );
    // }, [bookingInformation.bookingInfo?.bookingItems]);

    useEffect(() => {
        if (
            isUndefined(bookingInformation?.bookingInfo?.product) ||
            isUndefined(bookingInformation?.bookingInfo?.bookingItems) ||
            !bookingInformation?.bookingInfo?.bookingItems.length
        ) {
            router.push("./portal/booking");
        }
    }, [bookingInformation]);

    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb
                    items={[
                        {
                            title: "Chọn sản phẩm",
                        },
                        {
                            title: "Thông tin hành khách",
                        },
                    ]}
                />
                <div className="h-4"></div>
                <div className="customer__page">
                    <Row gutter={32}>
                        <Col span={15}>
                            <PassengersInformationForm
                                className="drop-shadow-sm mb-6"
                                startDate={
                                    bookingInformation.bookingInfo?.product
                                        ?.startDate
                                }
                                passengerList={passengerList}
                                onSetPassengerInfo={onSetPassengerInformation}
                            />
                            <div className="text-right">
                                <Space align="end">
                                    <Button
                                        type="primary"
                                        ghost
                                        onClick={() =>
                                            router.push(
                                                "./portal/booking/tour-services",
                                            )
                                        }
                                    >
                                        Mua thêm dịch vụ
                                    </Button>
                                    {/* <Button
                                        type="primary"
                                        onClick={() =>
                                            handlerSubmit(
                                                passengerFormDatas,
                                                onSubmitPax,
                                            )
                                        }
                                    >
                                        submit pax
                                    </Button> */}
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            router.push(
                                                "./portal/booking/payment",
                                            )
                                        }
                                    >
                                        Tiến hành đặt chỗ
                                    </Button>
                                </Space>
                            </div>
                        </Col>
                        <Col span={9}>
                            <BookingSummary label="Chi tiết giá tour" />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default CustomerInformationPage;
