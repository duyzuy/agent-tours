import React from "react";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Col, Row, Tag } from "antd";
import { IBookingOrderDetail } from "@/models/management/booking/order.interface";
import { EditOutlined } from "@ant-design/icons";
import DrawerPassengerInfo, {
    DrawerPassengerInfoProps,
} from "../DrawerPassengerInfo";
import { useState } from "react";
import { getPassengerType } from "@/utils/common";
import {
    BookingOrderPassengerFormData,
    IBookingOrderPassengersPayload,
} from "../../../modules/bookingOrder.interface";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
interface OrderDetailProps {
    bookingsDetail: IBookingOrderDetail["bookingDetails"];
    onSave?: (data?: IBookingOrderPassengersPayload, cb?: () => void) => void;
    orderId: number;
}

const BookingDetail: React.FC<OrderDetailProps> = ({
    bookingsDetail,
    orderId,
    onSave,
}) => {
    const [record, setEditRecord] =
        useState<IBookingOrderDetail["bookingDetails"][0]>();
    const [showDrawer, setShowDrawer] = useState(false);

    const onEditPassengerInfo = (
        record: IBookingOrderDetail["bookingDetails"][0],
    ) => {
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
            <div className="booking__detail">
                <div className="booking__detail-head mb-3">
                    <span className="text-[16px] font-semibold">
                        Thông tin hành khách
                    </span>
                </div>
                <div className="booking__detail-body">
                    <Row gutter={16}>
                        {bookingsDetail.map((bookingDetail, _index) => (
                            <Col
                                span={12}
                                className="booking__detail__item"
                                key={_index}
                            >
                                <div className="p-4 bg-white border mb-3 rounded-md shadow-sm">
                                    <div className="booking__detail__item-head border-b mb-2 pb-2">
                                        <ul className="flex">
                                            <li className="w-28">
                                                <span className="block text-xs">
                                                    Channel
                                                </span>
                                                <span className="font-[500]">
                                                    {
                                                        bookingDetail.booking
                                                            .channel
                                                    }
                                                </span>
                                            </li>
                                            <li className="w-28">
                                                <span className="block text-xs">
                                                    Class
                                                </span>
                                                <span className="font-[500]">
                                                    {
                                                        bookingDetail.booking
                                                            .class
                                                    }
                                                </span>
                                            </li>

                                            <li className="w-32">
                                                <span className="block text-xs">
                                                    Loại hành khách
                                                </span>
                                                <span className="font-[500]">
                                                    {getPassengerType(
                                                        bookingDetail.booking
                                                            .type,
                                                    )}
                                                </span>
                                            </li>
                                            <li className="w-32">
                                                <span className="block text-xs">
                                                    Số lượng
                                                </span>
                                                <span className="font-[500]">
                                                    {
                                                        bookingDetail.booking
                                                            .quantity
                                                    }
                                                </span>
                                            </li>
                                            <li>
                                                <span className="block text-xs">
                                                    Giá tiền
                                                </span>
                                                <span className="font-[500]">
                                                    {moneyFormatVND(
                                                        bookingDetail.booking
                                                            .amount,
                                                    )}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="booking__detail__item-passenger">
                                        <div className="booking__detail__item-passenger-info mb-3 border-b pb-3">
                                            <Row gutter={16} className="mb-3">
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
                                                            Danh xưng
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxTitle ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
                                                            Giới tính
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxGender ||
                                                                "--"}
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
                                                        <span className="block text-xs">
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
                                            <Row gutter={16} className="mb-3">
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
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
                                                        <span className="block text-xs">
                                                            Số Passport/CCCD
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxPassportNumber ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
                                                            Quốc tịch
                                                        </span>
                                                        <span className="font-[500]">
                                                            {bookingDetail
                                                                .booking.pax
                                                                .paxNationality ||
                                                                "--"}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <span className="block text-xs">
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
                                        <div className="booking__detail__item-passenger-action">
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
