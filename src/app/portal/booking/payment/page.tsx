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
import IconPaylater from "@/assets/icons/IconPaylater";
import IconCreditCard from "@/assets/icons/IconCreditCard";
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
        <div className="payment__page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
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
                <div className="payment__customer">
                    <Row gutter={32}>
                        <Col span={15}>
                            <CustomerInformationForm
                                customerInformation={customerInformation}
                                setCustomerInformation={setCustomerInformation}
                                errors={errors}
                                className="bg-white rounded-md drop-shadow-sm mb-6"
                            />
                            <div className="payment__methods bg-white drop-shadow-sm mb-6 rounded-md">
                                <div className="payment__methods-head pt-6 px-6">
                                    <div>
                                        <span className="font-[500] text-lg">
                                            Phương thức thanh toán
                                        </span>
                                    </div>
                                </div>
                                <Divider />
                                <div className="payment__methods-body px-6 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="method-item border w-1/4 text-center px-3 py-3 rounded-md bg-slate-50 border-primary-default drop-shadow-sm">
                                            <div className="method-item-inner">
                                                <div className="icon mx-auto mb-2 inline-block">
                                                    <IconPaylater
                                                        width={36}
                                                        height={36}
                                                        stroke="none"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block">
                                                        Thanh toán sau
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="method-item border w-1/4 text-center px-3 py-3 rounded-md drop-shadow-sm">
                                            <div className="method-item-inner">
                                                <div className="icon mx-auto mb-2 inline-block">
                                                    <IconCreditCard
                                                        width={36}
                                                        height={36}
                                                        stroke="none"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block">
                                                        Visa/master
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <BookingSummary label="Chi tiết giá tour" />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default PaymentPage;
