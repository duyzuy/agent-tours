"use client";
import React from "react";
import { SwapOutlined } from "@ant-design/icons";

import { moneyFormatVND } from "@/utils/helper";
import BoxBooking from "../_components/BoxBooking";
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
    },
];
const SearchTourPage = ({}: Props) => {
    return (
        <>
            <div className="page">
                <div
                    className="header-page p-6 bg-gray-200 rounded-lg mb-6"
                    style={{
                        background: "url('/assets/images/bg-header.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom center",
                    }}
                >
                    <div className=" h-36"></div>
                    <BoxBooking className="searchbox px-6 py-4 bg-white shadow-lg rounded-lg" />
                </div>

                <div className="tours-wrapper">
                    <h3 className="text-lg py-3 font-bold">Các tour giá tốt</h3>
                    <div className="tour-list flex items-center flex-wrap -mx-3 ">
                        {TOURSS.map((tour, _index) => (
                            <div
                                className="tour-item px-3 mb-3 w-full lg:w-1/3"
                                key={_index}
                            >
                                <div className="p-3 bg-white rounded-lg shadow-lg">
                                    <div>
                                        <p>{tour.title}</p>
                                        <p className="text-red-500 font-bold">
                                            {tour.code}
                                        </p>
                                        <div className="schedule-date flex justify-between border-b mb-3 pb-3">
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

                                        <div>
                                            <p>{moneyFormatVND(tour.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchTourPage;
