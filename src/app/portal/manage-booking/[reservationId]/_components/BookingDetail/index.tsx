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
    IBookingOrderCustomerAndPassengerPayload,
} from "../../../modules/bookingOrder.interface";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
interface OrderDetailProps {
    bookingsDetail: IBookingOrderDetail["bookingDetails"];
    onSave?: (
        data?: IBookingOrderCustomerAndPassengerPayload["bookingDetails"],
    ) => void;
}

const BookingDetail: React.FC<OrderDetailProps> = ({
    bookingsDetail,
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

        onSave?.([
            {
                booking: {
                    recId: record.booking.recId,
                    bookingRefId: record.booking.bookingRefId,
                    pax: data,
                },
            },
        ]);
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
                                                <span>
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
                                                <span>
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
                                                <span>
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
                                                <span>
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
                                                <span>
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
                                                        <span>
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
                                                        <span>
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
                                                        <span>
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
                                                        <span>
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
                                                        <span>
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
                                                            Số CCCD
                                                        </span>
                                                        <span>
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
                                                        <span>
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
                                                        <span>
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
    console.log(dayjs("22Aug24"));
    return dayjs(dateStr).format(fm);
};
