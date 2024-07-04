import React, { memo } from "react";
import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Divider } from "antd";
import { useMemo } from "react";
import { useBookingSelector } from "../../hooks/useBooking";
import useBreakDownSummary from "../../modules/useBreakDownSummary";
import { isEmpty, isUndefined } from "lodash";
import { getPassengerType } from "@/utils/common";
interface BookingBreakDownSummaryProps {
    label?: string;
}
type BreakdownTourSummaryItem = {
    qty: number;
    type: PassengerType;
    price: number;
    class: string;
    subTotal: number;
};
const BookingSummary: React.FC<BookingBreakDownSummaryProps> = ({ label }) => {
    const bookingInfo = useBookingSelector();

    const productItem = useMemo(() => {
        return bookingInfo.bookingInfo?.product;
    }, [bookingInfo]);

    const { tourPrices, services, total } = useBreakDownSummary();

    const adultTourBreakdownSummarys = useMemo(() => {
        const totalAdultTour = tourPrices["adult"];
        let totalItem: BreakdownTourSummaryItem[] = [];
        if (totalAdultTour) {
            totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>(
                (acc, item) => {
                    acc = [...acc, totalAdultTour[item]];
                    return acc;
                },
                [],
            );
        }
        return totalItem;
    }, []);

    const childTourBreakdownSummarys = useMemo(() => {
        const totalAdultTour = tourPrices["child"];
        let totalItem: BreakdownTourSummaryItem[] = [];
        if (totalAdultTour) {
            totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>(
                (acc, item) => {
                    acc = [...acc, totalAdultTour[item]];
                    return acc;
                },
                [],
            );
        }
        return totalItem;
    }, []);

    const infantTourBreakdownSummarys = useMemo(() => {
        const totalAdultTour = tourPrices["infant"];
        let totalItem: BreakdownTourSummaryItem[] = [];
        if (totalAdultTour) {
            totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>(
                (acc, item) => {
                    acc = [...acc, totalAdultTour[item]];
                    return acc;
                },
                [],
            );
        }
        return totalItem;
    }, []);
    // console.log("render summary");

    return (
        <div className="booking__summary bg-white rounded-md drop-shadow-sm">
            <div className="booking__summary-head px-6 pt-6">
                <h3 className="text-lg font-[500]">{label}</h3>
            </div>
            <Divider />
            <div className="booking__summary-body px-6 pb-4">
                <div className="product__item mb-3">
                    <div className="product__item-label mb-3">
                        <span className="font-[500]">Sản phẩm</span>
                    </div>
                    <div className="product__item-body">
                        <ul>
                            <li className="flex justify-between mb-1">
                                <span>Tên sản phẩm</span>
                                <span>{productItem?.template.name}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Mã sản phẩm</span>
                                <span className="text-xs">
                                    {productItem?.code}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Divider />
                <div className="passenger__item">
                    <div className="passenger__item-label mb-2">
                        <span className="font-[500]">Giá tour</span>
                    </div>
                    <ul>
                        {adultTourBreakdownSummarys.map((item, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`adult-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        {`Người lớn - ${item.class}`}
                                    </span>
                                    <span className="block text-xs text-primary-default">
                                        {moneyFormatVND(item.price)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-10 text-center">
                                    {`x${item.qty}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                                    {moneyFormatVND(item.subTotal)}
                                </span>
                            </li>
                        ))}
                        {childTourBreakdownSummarys.map((item, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`child-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        {`Trẻ em - ${item.class}`}
                                    </span>
                                    <span className="block text-xs text-primary-default">
                                        {moneyFormatVND(item.price)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-10 text-center">
                                    {`x${item.qty}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                                    {moneyFormatVND(item.subTotal)}
                                </span>
                            </li>
                        ))}
                        {infantTourBreakdownSummarys.map((item, _index) => (
                            <li
                                className="flex justify-between items-center mb-2"
                                key={`infant-${_index}`}
                            >
                                <span className="passenger__item-passenger-type flex-1">
                                    <span className="block">
                                        {`Em bé - ${item.class}`}
                                    </span>
                                    <span className="block text-xs text-primary-default">
                                        {moneyFormatVND(item.price)}
                                    </span>
                                </span>
                                <span className="passenger__item-quantity w-10 text-center">
                                    {`x${item.qty}`}
                                </span>
                                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                                    {moneyFormatVND(item.subTotal)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {!isUndefined(services) && !isEmpty(services) ? (
                    <>
                        <Divider />
                        <div className="passenger__item">
                            <div className="passenger__item-label mb-2">
                                <span className="font-[500]">Dịch vụ</span>
                            </div>
                            <ul>
                                {Object.keys(services).map((key, _index) => (
                                    <li
                                        className="mb-2"
                                        key={`adult-${_index}`}
                                    >
                                        <div className="flex justify-between items-center py-3">
                                            <span className="passenger__item-passenger-type flex-1">
                                                <span className="block">
                                                    {services[key].details}
                                                </span>
                                            </span>
                                            <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                                                {moneyFormatVND(
                                                    services[key].subTotal,
                                                )}
                                            </span>
                                        </div>
                                        <ul className="">
                                            {services[key].items.map(
                                                (pricingItem) => (
                                                    <li
                                                        key={
                                                            pricingItem.item
                                                                .priceConfigRecId
                                                        }
                                                        className="flex justify-between mb-1"
                                                    >
                                                        <span className="flex-1">
                                                            <span>
                                                                {`Hành khách ${
                                                                    pricingItem
                                                                        .bookingItem
                                                                        .index +
                                                                    1
                                                                }`}
                                                            </span>
                                                            <span className="text-xs block text-primary-default">
                                                                {moneyFormatVND(
                                                                    pricingItem
                                                                        .item
                                                                        .item[
                                                                        pricingItem
                                                                            .item
                                                                            .type
                                                                    ],
                                                                )}
                                                            </span>
                                                        </span>
                                                        <span className="w-10 text-center">
                                                            {`x ${pricingItem.item.qty}`}
                                                        </span>
                                                        <span className="text-primary-default w-32 text-right">
                                                            {moneyFormatVND(
                                                                pricingItem.item
                                                                    .qty *
                                                                    pricingItem
                                                                        .item
                                                                        .item[
                                                                        pricingItem
                                                                            .item
                                                                            .type
                                                                    ],
                                                            )}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : null}
                <Divider />
                <div className="booking__summary-total">
                    <div className="flex justify-between">
                        <span>Tổng tiền</span>
                        <span className="font-[500] text-primary-default text-lg">
                            {moneyFormatVND(total)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default memo(BookingSummary);
