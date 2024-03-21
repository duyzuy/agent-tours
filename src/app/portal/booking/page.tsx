"use client";
import React, { useMemo } from "react";
import BoxBooking from "./_components/BoxBooking";
import { Button, Empty, Spin } from "antd";
import useBooking from "./hooks/useBooking";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";
import TourBoxItem from "./_components/TourBoxItem";
import { isUndefined } from "lodash";
import { UndoOutlined } from "@ant-design/icons";
import { PassengerType } from "@/models/management/common.interface";
import PassengerQuantity from "./_components/PassengerQuantity";

import useSelectProductTour from "./modules/useSelectProductTour";

const BookingPage = () => {
    const [bookingInformation, setBookingInformation] = useBooking();
    const { onSearchBooking, isLoading } = useSearchBookingInformation();

    const productList = useMemo(
        () => bookingInformation?.productList,
        [bookingInformation],
    );

    const isSearched = useMemo(() => {
        return (
            !isUndefined(bookingInformation.searchBooking?.byMonth) &&
            !isUndefined(bookingInformation.searchBooking?.byDest)
        );
    }, [bookingInformation]);

    const productSelectedItem = useMemo(() => {
        return bookingInformation.bookingInfo?.product;
    }, [bookingInformation]);

    const { onNext, onSetQuantityPassenger, onReselectTour } =
        useSelectProductTour();

    return (
        <div className="page">
            <div
                className="header-page p-6 bg-gray-200 rounded-lg mb-14"
                style={{
                    background: "url('/assets/images/bg-header.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom center",
                }}
            >
                <div className="h-44"></div>
                <BoxBooking className="searchbox" onSubmit={onSearchBooking} />
            </div>
            <div className="tours-wrapper">
                {isLoading ? (
                    <Spin tip="Đang tìm kiếm...">
                        <div className="content" />
                    </Spin>
                ) : (
                    <div className="tour-list">
                        {isSearched ? (
                            <>
                                {(productList?.length &&
                                    productList.map((item) => (
                                        <TourBoxItem
                                            key={item.recId}
                                            tour={item}
                                            isSelected={
                                                item.recId ===
                                                productSelectedItem?.recId
                                            }
                                            hideBoxNotSelect={
                                                !isUndefined(
                                                    productSelectedItem,
                                                )
                                            }
                                            onSelect={() =>
                                                setBookingInformation(
                                                    (prev) => ({
                                                        ...prev,
                                                        bookingInfo: {
                                                            ...prev.bookingInfo,
                                                            product: item,
                                                        },
                                                    }),
                                                )
                                            }
                                        />
                                    ))) || (
                                    <Empty description="Không có tour nào" />
                                )}
                            </>
                        ) : null}
                        {!isUndefined(productSelectedItem) ? (
                            <div className="text-right mb-2">
                                <span
                                    className="inline-flex text-primary-default cursor-pointer"
                                    onClick={onReselectTour}
                                >
                                    <UndoOutlined size={12} />
                                    <span className="ml-2 inline-block">
                                        Chọn lại
                                    </span>
                                </span>
                            </div>
                        ) : null}
                        {productSelectedItem ? (
                            <div className="passenger__selection-box border px-6 py-4 rounded-[3px]">
                                <div>
                                    <div className="mb-3">
                                        <span className="block text-lg font-[500]">
                                            Nhập số lượng khách
                                        </span>
                                        <p>
                                            * Giá lựa chọn sẽ dc áp dụng cho
                                            toàn bộ hành khách trong tour.
                                        </p>
                                    </div>
                                    <div className="line h-[1px] mt-4 mb-4 bg-slate-100"></div>
                                    <div className="flex justify-between items-center">
                                        <PassengerQuantity
                                            adultAmount={
                                                bookingInformation.searchBooking
                                                    ?.passengers[
                                                    PassengerType.ADULT
                                                ] || 1
                                            }
                                            childAmount={
                                                bookingInformation.searchBooking
                                                    ?.passengers[
                                                    PassengerType.CHILD
                                                ] || 0
                                            }
                                            infantAmount={
                                                bookingInformation.searchBooking
                                                    ?.passengers[
                                                    PassengerType.INFANT
                                                ] || 0
                                            }
                                            onSetQuantityPassenger={
                                                onSetQuantityPassenger
                                            }
                                        />
                                        <Button
                                            type="primary"
                                            className="w-32"
                                            onClick={onNext}
                                        >
                                            Đi tiếp
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
};
export default BookingPage;
