"use client";
import React, { useEffect, useMemo } from "react";
import { Space, Button, Tag } from "antd";
import { useBookingSelector } from "../hooks/useBooking";
import IconSuccess from "@/assets/icons/IconSuccess";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";

const ReservationPage = () => {
    const bookingInformation = useBookingSelector();
    const router = useRouter();
    const bookingOrder = useMemo(() => {
        return bookingInformation.reservation?.bookingOrder;
    }, [bookingInformation]);

    const templateProduct = useMemo(() => {
        return bookingInformation.reservation?.bookingOrder.template;
    }, [bookingInformation]);
    const sellableProduct = useMemo(() => {
        return bookingInformation.reservation?.bookingOrder.sellable;
    }, [bookingInformation]);
    useEffect(() => {
        if (isUndefined(bookingOrder)) {
            router.push("./portal/booking");
        }
    }, [bookingOrder]);
    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 min-h-full">
            <div className="max-w-4xl mx-auto">
                <div className="customer__page">
                    <div className="text-center pt-8 mb-6">
                        <IconSuccess
                            width={60}
                            height={60}
                            className="mx-auto mb-2"
                        />
                        <div className="text-center">
                            <span className="block font-[500] text-green-600 text-lg mb-2 uppercase">
                                Đặt chỗ thành công
                            </span>
                            <span className="block">
                                Thông tin đã được ghi nhận và giữ chỗ.
                            </span>
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Thông tin đặt chỗ
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Mã đơn hàng"
                                value={`#${bookingOrder?.recId}`}
                            />
                            <DetailItem
                                title="Tên tour"
                                value={templateProduct?.name}
                            />
                            <DetailItem
                                title="Mã Tour"
                                value={sellableProduct?.code}
                            />
                            <DetailItem
                                title="Ngày đi"
                                value={
                                    sellableProduct?.startDate
                                        ? formatDate(sellableProduct?.startDate)
                                        : undefined
                                }
                            />
                            <DetailItem
                                title="Ngày về"
                                value={
                                    sellableProduct?.endDate
                                        ? formatDate(sellableProduct?.endDate)
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Thông tin người đặt
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Họ và tên"
                                value={bookingOrder?.custName}
                            />
                            <DetailItem
                                title="Email"
                                value={bookingOrder?.custEmail}
                            />
                            <DetailItem
                                title="Số điện thoại"
                                value={bookingOrder?.custPhoneNumber}
                            />
                            <DetailItem
                                title="Địa chỉ"
                                value={bookingOrder?.custAddress}
                            />
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto drop-shadow-sm mb-6">
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Trạng thái"
                                value={
                                    <Tag color="red">
                                        {bookingOrder?.paymentStatus}
                                    </Tag>
                                }
                            />
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Chi tiết thanh toán
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Tour price"
                                value={moneyFormatVND(bookingOrder?.tourPrice)}
                            />
                            <DetailItem
                                title="Extra price"
                                value={moneyFormatVND(bookingOrder?.extraPrice)}
                            />
                            <DetailItem
                                title="Charge"
                                value={moneyFormatVND(bookingOrder?.charge)}
                            />
                            <DetailItem
                                title="Tổng tiền"
                                value={
                                    <span className=" text-primary-default font-[500]">
                                        {moneyFormatVND(
                                            bookingOrder?.totalAmount,
                                        )}
                                    </span>
                                }
                            />
                        </div>
                    </div>
                    <div className="customer__information py-4 rounded-md max-w-xl mx-auto">
                        <div className="flex justify-center">
                            <Space>
                                <Button
                                    onClick={() =>
                                        router.push("./portal/booking")
                                    }
                                >
                                    Về trang đặt chỗ
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        router.push(
                                            `./portal/manage-booking/${bookingOrder?.recId}`,
                                        )
                                    }
                                >
                                    Quản lý đặt chỗ
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReservationPage;

const DetailItem = ({
    title,
    value,
}: {
    title?: string;
    value?: React.ReactNode;
}) => {
    return (
        <div className="mb-3 flex">
            <span className="label w-32">{title}</span>
            <span className="flex-1">{value ?? "--"}</span>
        </div>
    );
};
