"use client";
import React from "react";
import { IconChevronDown } from "@/assets/icons";
import QuantityInput from "@/components/frontend/QuantityInput";
import { Flex, Button } from "antd";
import { IconShippingCart } from "@/assets/icons";
import classNames from "classnames";
interface Props {
    className?: string;
}
const BookingBreakDownBox: React.FC<Props> = ({ className = "" }) => {
    return (
        <div
            className={classNames("col-booking", {
                [className]: className,
            })}
        >
            <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
                <div className="header py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-red-600">
                        ĐẶT NGAY, CHỈ 2 PHÚT
                    </h3>
                    <span>
                        <IconChevronDown />
                    </span>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="origin w-1/2 px-3">
                        <p className="text-xs">Điểm khởi hành</p>
                        <p className="text-lg font-semibold">TP. Hồ Chí Minh</p>
                    </div>
                    <div className="arrival px-3">
                        <p className="text-xs">Điểm đến</p>
                        <p className="text-lg font-semibold">Đài loan</p>
                    </div>
                </div>
                <div className="py-2">
                    <p className="text-xs">Chỉ từ</p>
                    <p className="text-red-600 font-semibold text-2xl">
                        2.500.000 <span className="text-lg">VND</span>
                    </p>
                </div>
                <div className="schedules mb-6">
                    <div className="label mb-3">
                        <p>Ngày khởi hành</p>
                    </div>
                    <div className="schedules-list">
                        <ul className="flex gap-x-3">
                            <li className="w-1/3 h-16 px-2 border border-primary-default rounded-md flex items-center">
                                <p>
                                    <span className="block text-[16px] font-semibold">
                                        16/12
                                    </span>
                                    <span className="text-xs">16/12/2024</span>
                                </p>
                            </li>
                            <li className="w-1/3 h-16 border rounded-md flex items-center px-2">
                                <p>
                                    <span className="block text-[16px] font-semibold">
                                        10/01
                                    </span>
                                    <span className="text-xs">16/12/2024</span>
                                </p>
                            </li>
                            <li className="w-1/3 h-16 border rounded-md flex items-center px-2">
                                <p>
                                    <span className="block text-[16px] font-semibold">
                                        20/02
                                    </span>
                                    <span className="text-xs">16/12/2024</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="passengers mb-4">
                    <div className="label mb-3">
                        <p>Số lượng hành khách</p>
                    </div>
                    <div className="select flex">
                        <QuantityInput
                            label="Người lớn"
                            value={1}
                            className="w-1/3"
                        />
                        <QuantityInput label="Trẻ em" className="w-1/3" />
                        <QuantityInput label="Em bé" className="w-1/3" />
                    </div>
                </div>
                <div className="breakdown">
                    <div className="breakdown-table -mx-2">
                        <div className="row flex items-center py-2 font-bold text-primary-default">
                            <div className="cell flex-1 px-2">Hành khách</div>
                            <div className="cell w-20 px-2">Số lượng</div>
                            <div className="cell flex-1 text-right px-2">
                                Đơn giá <span className="text-xs">(VND)</span>
                            </div>
                        </div>
                        <div className="row flex py-2 items-center">
                            <div className="cell flex-1 px-2">
                                <p>Người lớn</p>
                                <p className="text-xs text-red-600 font-semibold">
                                    2.550.000
                                </p>
                            </div>
                            <div className="cell w-20 px-2 text-center">
                                x 1
                            </div>
                            <div className="cell flex-1 text-right px-2">
                                2.550.000
                            </div>
                        </div>
                        <div className="row flex py-2 items-center">
                            <div className="cell flex-1 px-2">
                                <p>Trẻ em</p>
                                <p className="text-xs text-red-600 font-semibold">
                                    1.550.000
                                </p>
                            </div>
                            <div className="cell w-20 px-2 text-center">
                                x 0
                            </div>
                            <div className="cell flex-1 text-right px-2">0</div>
                        </div>
                        <div className="row flex py-2 items-center">
                            <div className="cell flex-1 px-2">
                                <p>Em bé</p>
                                <p className="text-xs text-red-600 font-semibold">
                                    550.000
                                </p>
                            </div>
                            <div className="cell w-20 px-2 text-center">
                                x 0
                            </div>
                            <div className="cell flex-1 text-right px-2">0</div>
                        </div>
                    </div>
                    <div className="py-2 mt-2 border-t">
                        <p className="flex items-center justify-between font-semibold">
                            <span className="text-gray-600">Tổng cộng</span>
                            <span className="text-red-600">2.550.000</span>
                        </p>
                    </div>
                </div>
                <div className="actions py-2 mt-2">
                    <Flex gap="middle">
                        <Button
                            type="primary"
                            block
                            className="h-11 bg-primary-default"
                        >
                            Đặt tour ngay
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="h-11 w-20 flex items-center justify-center"
                        >
                            <span className="icon">
                                <IconShippingCart />
                            </span>
                        </Button>
                    </Flex>
                </div>
            </div>
            <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
                <Flex gap="middle">
                    <div className="px-2 w-full rounded-lg py-2">
                        <p className="text-xs">HOTLINE ĐẶT TOUR</p>
                        <span className="text-lg text-primary-default">
                            0988.308.530
                        </span>
                    </div>
                </Flex>
            </div>
        </div>
    );
};
export default BookingBreakDownBox;
