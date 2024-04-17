import React, { useCallback } from "react";
import { Row, Col, Button } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { moneyFormatVND } from "@/utils/helper";
import { getPassengerType } from "@/utils/common";
import {
    getPassengerGender,
    getPassengerTitle,
    EPassengerGender,
    EPassengerTitle,
} from "@/constants/common";
import classNames from "classnames";

export interface PassengerDetailListProps {
    items: IOrderDetail["bookingDetails"];
    selectedItems: IOrderDetail["bookingDetails"];
    onSelectItem: (item: IOrderDetail["bookingDetails"][0]) => void;
    className?: string;
}
const PassengerDetailList: React.FC<PassengerDetailListProps> = ({
    items,
    selectedItems,
    onSelectItem,
    className = "",
}) => {
    const hasSelectedItem = useCallback(
        (bkItem: IOrderDetail["bookingDetails"][0]) => {
            return selectedItems.some(
                (item) => item.booking.recId === bkItem.booking.recId,
            );
        },
        [selectedItems],
    );
    return (
        <div
            className={classNames("box__items", {
                [className]: className,
            })}
        >
            <Row gutter={[24, 24]}>
                {items.map((bookingItem, _index) => (
                    <Col
                        span={12}
                        lg={12}
                        xl={8}
                        className="booking__detail__item"
                        key={_index}
                    >
                        <div
                            className={classNames(
                                "p-4 bg-white border rounded-md shadow-sm",
                                {
                                    "border-primary-default":
                                        hasSelectedItem(bookingItem),
                                },
                            )}
                        >
                            <div className="booking__detail__item-head border-b mb-3 pb-3">
                                <ul className="flex">
                                    <li className="w-32">
                                        <span className="block text-xs">
                                            Hành khách
                                        </span>
                                        <span className="font-[500]">
                                            {getPassengerType(
                                                bookingItem.booking.type,
                                            )}
                                        </span>
                                    </li>
                                    <li className="flex-1">
                                        <span className="block text-xs">
                                            Class
                                        </span>
                                        <span className="font-[500]">
                                            {bookingItem.booking.class}
                                        </span>
                                    </li>
                                    <li>
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                onSelectItem(bookingItem)
                                            }
                                            ghost
                                            size="small"
                                        >
                                            {hasSelectedItem(bookingItem)
                                                ? "Huỷ bỏ"
                                                : "Chọn"}
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                            <div className="booking__detail__item-passenger">
                                <div className="booking__detail__item-passenger-info">
                                    <Row gutter={16}>
                                        <Col span={24} xs={24} lg={12} xl={8}>
                                            <div>
                                                <span className="block text-xs">
                                                    Danh xưng
                                                </span>
                                                <span className="font-[500]">
                                                    {getPassengerTitle(
                                                        bookingItem.booking.pax
                                                            .paxTitle as EPassengerTitle,
                                                    )}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col span={6} xs={12} lg={12} xl={8}>
                                            <div>
                                                <span className="block text-xs">
                                                    Họ
                                                </span>
                                                <span className="font-[500]">
                                                    {bookingItem.booking.pax
                                                        .paxLastname || "--"}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col span={6} xs={12} lg={12} xl={8}>
                                            <div>
                                                <span className="block text-xs">
                                                    Tên đệm và tên
                                                </span>
                                                <span className="font-[500]">
                                                    {bookingItem.booking.pax
                                                        .paxMiddleFirstName ||
                                                        "--"}
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={16} className="mb-3"></Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default PassengerDetailList;
