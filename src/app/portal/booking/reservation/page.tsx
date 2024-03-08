"use client";
import React, { useEffect, useMemo } from "react";
import { Space, Button } from "antd";
import { useBookingSelector } from "../hooks/useBooking";
import IconSuccess from "@/assets/icons/IconSuccess";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";

const ReservationPage = () => {
    const bookingInformation = useBookingSelector();
    const router = useRouter();
    const reservation = useMemo(() => {
        return bookingInformation.reservation;
    }, [bookingInformation]);

    useEffect(() => {
        if (isUndefined(reservation)) {
            router.push("./portal/booking");
        }
    }, [reservation]);
    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 h-full">
            <div className="max-w-4xl mx-auto">
                <div className="customer__page">
                    {/* <div className="customer__page-head">
                        <h3>Thành công</h3>
                    </div> */}
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
                    <div className="customer__information bg-white px-6 py-4 rounded-md max-w-xl mx-auto mb-3">
                        <div className="customer__information-head border-b mb-3 pb-3">
                            <h3 className="font-bold text-lg">
                                Thông tin người đặt
                            </h3>
                        </div>
                        <div className="customer__information-body">
                            <div>
                                <ul>
                                    <li className="mb-2 flex">
                                        <span className="label w-32">
                                            Họ và tên
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.custName ||
                                                "nguyen van a"}
                                        </span>
                                    </li>
                                    <li className="mb-2 flex">
                                        <span className="label w-32">
                                            Email
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.custEmail ||
                                                "nguyenvana@gmail.com"}
                                        </span>
                                    </li>
                                    <li className="mb-2 flex">
                                        <span className="label w-32">
                                            Số điện thoại
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.custPhoneNumber ||
                                                "0988228467"}
                                        </span>
                                    </li>
                                    <li className="mb-2 flex">
                                        <span className="label w-32">
                                            Địa chỉ
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.custAddress ||
                                                "ho CHi minh viet nam"}
                                        </span>
                                    </li>
                                    <li className="mb-2 flex">
                                        <span className="label w-32">
                                            Ghi chú
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.rmk ||
                                                "Khong co gi de ghi chu"}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="customer__information bg-white px-6 py-4 rounded-md max-w-xl mx-auto">
                        <div className="customer__information-body">
                            <div>
                                <ul>
                                    <li className="mb-2">
                                        <span className="label w-32">
                                            Trạng thái
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.paymentStatus}
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="label w-32">
                                            Tour price
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.tourPrice}
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="label w-32">
                                            Extra price
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.extraPrice}
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="label w-32">
                                            Charge
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.charge}
                                        </span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="label w-32">
                                            Tổng tiền
                                        </span>
                                        <span className="flex-1">
                                            {reservation?.totalAmount}
                                        </span>
                                    </li>
                                </ul>
                            </div>
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
                                <Button type="primary" onClick={() => {}}>
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
