"use client";
import React from "react";
import { SwapOutlined } from "@ant-design/icons";

import { moneyFormatVND } from "@/utils/helper";
import BoxBooking from "../_components/BoxBooking";
import { Breadcrumb, Button } from "antd";

interface Props {}

const TOURSS = [
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "VIETJET AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
        salePrice: 2500000,
    },
];
const TourSelectionPage = ({}: Props) => {
    return (
        <>
            <div className="page bg-slate-50 -mx-6 -my-6 p-6 h-full">
                <div className="max-w-6xl mx-auto">
                    <Breadcrumb
                        items={[
                            {
                                title: "Search",
                            },
                            {
                                title: "Lựa chọn tour",
                            },
                        ]}
                    />
                    <div className="h-4"></div>
                    <BoxBooking />
                    <div className="h-8"></div>
                    <div className="tours-wrapper">
                        <h3 className="text-lg py-3 font-bold">
                            Lựa chọn tour
                        </h3>
                        <div className="tour-list">
                            {TOURSS.map((tour, _index) => (
                                <div
                                    className="tour-item mb-6 w-full "
                                    key={_index}
                                >
                                    <div className="p-4 bg-white rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <div className="tour-name w-96">
                                                <p>{tour.title}</p>
                                                <p className="text-primary-default font-bold">
                                                    {tour.code}
                                                </p>
                                            </div>
                                            <div className="schedule-date flex justify-between w-96 px-2">
                                                <div>
                                                    <span>Ngày đi</span>
                                                    <p className="font-bold">
                                                        {tour.departDate}
                                                    </p>
                                                </div>
                                                <SwapOutlined />
                                                <div>
                                                    <span>Ngày về</span>
                                                    <p className="font-bold">
                                                        {tour.returnDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-left flex items-center flex-1 justify-end">
                                                <div className="pricing">
                                                    <p className="pricing">
                                                        <span className="text-gray-500 line-through text-xs">
                                                            {moneyFormatVND(
                                                                tour.price,
                                                            )}
                                                        </span>
                                                        <p className="font-bold text-red-600">
                                                            {moneyFormatVND(
                                                                tour.salePrice,
                                                            )}
                                                        </p>
                                                    </p>
                                                </div>
                                                <Button
                                                    type="primary"
                                                    ghost
                                                    className="ml-6"
                                                >
                                                    Chọn
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TourSelectionPage;
