"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Col, Divider, Row } from "antd";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import useCreateBooking from "../modules/useCreateBooking";
import CustomerInformationForm, {
    CustomerInformationFormProps,
} from "./_components/CustomerInformationForm";
import { Space, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { customerInformationSchema } from "../schema/customerInformation.schema";
import BookingSummary from "../_components/BookingSummary";
interface Props {}

const PaymentPage = ({}: Props) => {
    const [bookingInformation, setBookingInfomation] = useBooking();
    const router = useRouter();
    const { onCreateBooking } = useCreateBooking();

    const [customerInformation, setCustomerInformation] =
        useState<CustomerInformation>(
            () => new CustomerInformation("", "", "", "", ""),
        );

    const { handlerSubmit, errors } = useFormSubmit<CustomerInformation>({
        schema: customerInformationSchema,
    });

    const handleSubmitBooking: HandleSubmit<CustomerInformation> = (
        customerInfo,
    ) => {
        onCreateBooking(customerInfo);
    };

    const isDisableNextAction = useMemo(() => {
        return (
            isUndefined(customerInformation) ||
            isUndefined(customerInformation.custEmail)
        );
    }, [bookingInformation]);

    useEffect(() => {
        if (bookingInformation.bookingInfo?.customerInformation) {
            const customerInfo =
                bookingInformation.bookingInfo?.customerInformation;

            setCustomerInformation((prev) => ({
                ...prev,
                custAddress: customerInfo.custAddress,
                custEmail: customerInfo.custEmail,
                custName: customerInfo.custName,
                custPhoneNumber: customerInfo.custPhoneNumber,
            }));
        }
    }, [bookingInformation]);
    // console.log(bookingInformation);
    // useEffect(() => {
    //     if (
    //         isUndefined(bookingInformation?.bookingInfo?.product) ||
    //         isUndefined(bookingInformation?.bookingInfo?.bookingItems) ||
    //         !bookingInformation?.bookingInfo?.bookingItems.length
    //     ) {
    //         router.push("./portal/booking");
    //     }
    // }, [bookingInformation]);

    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb
                    items={[
                        {
                            title: "Chọn tour",
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
                            <CustomerInformationForm
                                customerInformation={customerInformation}
                                setCustomerInformation={setCustomerInformation}
                                errors={errors}
                                className="drop-shadow-sm mb-6"
                            />

                            <div className="text-right">
                                <Space align="end">
                                    <Button
                                        type="primary"
                                        ghost
                                        disabled={isDisableNextAction}
                                        onClick={() =>
                                            router.push(
                                                "./portal/booking/tour-services",
                                            )
                                        }
                                    >
                                        Mua thêm dịch vụ
                                    </Button>
                                    <Button
                                        type="primary"
                                        disabled={isDisableNextAction}
                                        onClick={() =>
                                            handlerSubmit(
                                                customerInformation,
                                                handleSubmitBooking,
                                            )
                                        }
                                    >
                                        Đặt và giữ chỗ
                                    </Button>
                                </Space>
                            </div>
                        </Col>
                        <Col span={9}>
                            <BookingSummary />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default PaymentPage;
