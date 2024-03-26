import React from "react";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Col, Row, Tag } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EditOutlined } from "@ant-design/icons";
import DrawerPassengerInfo, {
    DrawerPassengerInfoProps,
} from "./DrawerPassengerInfo";
import { useState } from "react";
import { getPassengerType } from "@/utils/common";
import { IBookingOrderPassengersPayload } from "../../../modules/bookingOrder.interface";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import {
    EPassengerGender,
    EPassengerTitle,
    getPassengerGender,
    getPassengerTitle,
} from "@/constants/common";
interface OrderDetailProps {
    bookingOrderDetailList: IOrderDetail["bookingDetails"];
    onSave?: (data?: IBookingOrderPassengersPayload, cb?: () => void) => void;
    orderId: number;
}

const BookingDetail: React.FC<OrderDetailProps> = ({
    bookingOrderDetailList,
    orderId,
    onSave,
}) => {
    const [record, setEditRecord] =
        useState<IOrderDetail["bookingDetails"][0]>();
    const [showDrawer, setShowDrawer] = useState(false);

    const onEditPassengerInfo = (record: IOrderDetail["bookingDetails"][0]) => {
        setEditRecord(record);
        setShowDrawer(true);
    };

    const onCancelEdit = () => {
        setEditRecord(undefined);
        setShowDrawer(false);
    };

    const onSavePassengerDetail: DrawerPassengerInfoProps["onSubmit"] = (
        data,
    ) => {
        if (isUndefined(record)) {
            throw new Error("Thiếu chi tiết booking.");
        }

        onSave?.(
            {
                bookingOrder: {
                    recId: orderId,
                },
                bookingDetails: [
                    {
                        booking: {
                            recId: record.booking.recId,
                            bookingRefId: record.booking.bookingRefId,
                            pax: data,
                        },
                    },
                ],
            },
            () => {
                setEditRecord(undefined);
                setShowDrawer(false);
            },
        );
    };
    return (
        <>
            <div className="booking__detail mb-12">
                <div className="booking__detail-head mb-3">
                    <span className="text-[16px] font-bold">
                        Thông tin hành khách
                    </span>
                </div>
                <div className="booking__detail-body">
                    <Row gutter={[24, 24]}>
                        {bookingOrderDetailList.map((bookingDetail, _index) => (
                            <Col
                                span={8}
                                className="booking__detail__item"
                                key={_index}
                            >
                                <div className="p-4 bg-white border rounded-md shadow-sm">
                                    <div className="booking__detail__item-head border-b mb-3 pb-3">
                                        <ul className="flex">
                                            <li className="w-16">
                                                <span className="block text-xs text-gray-600">
                                                    Class
                                                </span>
                                                <span className="font-[500]">
                                                    {
                                                        bookingDetail.booking
                                                            .class
                                                    }
                                                </span>
                                            </li>
                                            <li className="w-24">
                                                <span className="block text-xs text-gray-600">
                                                    Hành khách
                                                </span>
                                                <span className="font-[500]">
                                                    {getPassengerType(
                                                        bookingDetail.booking
                                                            .type,
                                                    )}
                                                </span>
                                            </li>
                                            <li className=" flex-1">
                                                <span className="block text-xs text-gray-600">
                                                    Giá tiền
                                                </span>
                                                <span className="font-[500] text-primary-default">
                                                    {moneyFormatVND(
                                                        bookingDetail.booking
                                                            .amount,
                                                    )}
                                                </span>
                                            </li>
                                            <li>
                                                <Button
                                                    type="primary"
                                                    onClick={() =>
                                                        onEditPassengerInfo(
                                                            bookingDetail,
                                                        )
                                                    }
                                                    ghost
                                                    size="small"
                                                    icon={<EditOutlined />}
                                                >
                                                    Sửa
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="booking__detail__item-passenger">
                                        <div className="booking__detail__item-passenger-info">
                                            <Row gutter={16} className="mb-3">
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs text-gray-600">
                                                            Danh xưng
                                                        </span>
                                                        <span className="font-[500]">
                                                            {getPassengerTitle(
                                                                bookingDetail
                                                                    .booking.pax
                                                                    .paxTitle as EPassengerTitle,
                                                            )}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs text-gray-600">
                                                            Giới tính
                                                        </span>
                                                        <span className="font-[500]">
                                                            {getPassengerGender(
                                                                bookingDetail
                                                                    .booking.pax
                                                                    .paxGender as EPassengerGender,
                                                            )}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row gutter={16} className="mb-3">
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
                                                            Họ
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxLastname ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs text-gray-600">
                                                            Tên đệm và tên
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxMiddleFirstName ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs text-gray-600">
                                                            Ngày sinh
                                                        </span>
                                                        <span className="font-[500]">
                                                            {formatDate(
                                                                bookingDetail
                                                                    .booking.pax
                                                                    .paxBirthDate,
                                                            ) || "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs text-gray-600">
                                                            Số điện thoại
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxPhoneNumber ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="booking__detail__item-passenger-action hidden">
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    onEditPassengerInfo(
                                                        bookingDetail,
                                                    )
                                                }
                                                ghost
                                                size="small"
                                                icon={<EditOutlined />}
                                            >
                                                Sửa thông tin
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <DrawerPassengerInfo
                isOpen={showDrawer}
                initialValues={record?.booking.pax}
                onClose={onCancelEdit}
                onSubmit={(data) => onSavePassengerDetail(data)}
            />
        </>
    );
};
export default BookingDetail;

const formatDate = (dateStr: string, fm = "DD/MM/YYYY") => {
    return dayjs(dateStr).format(fm);
};
