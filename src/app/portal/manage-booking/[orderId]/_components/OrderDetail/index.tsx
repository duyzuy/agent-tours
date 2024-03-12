import React, { useState, useEffect } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { Button, Col, Row, Space, Tag, Form, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { IBookingOrderDetail } from "@/models/management/booking/order.interface";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import DrawerCustomerInfo, {
    DrawerCustomerInfoProps,
} from "../DrawerCustomerInfo";
import {
    IBookingOrderCancelPayload,
    IBookingOrderCustomerPayload,
} from "../../../modules/bookingOrder.interface";
import ModalCancelBookingConfirmation from "../ModalCanelBookingConfirmation";
import { useRouter } from "next/navigation";

interface OrderDetailProps {
    orderDetail: IBookingOrderDetail["bookingOrder"];
    className?: string;
    onCancelBooking?: (
        payload: IBookingOrderCancelPayload,
        cb?: () => void,
    ) => void;
    onSave?: (payload: IBookingOrderCustomerPayload, cb?: () => void) => void;
}
const OrderDetail: React.FC<OrderDetailProps> = ({
    orderDetail,
    className = "",
    onCancelBooking,
    onSave,
}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [record, setRecord] = useState<IBookingOrderDetail["bookingOrder"]>();
    const [isShowModalConfirm, setShowModalConfirm] = useState(false);
    const [cancelBookingData, setCancelBookingData] =
        useState<IBookingOrderCancelPayload>({
            bookingOrder: { recId: orderDetail.recId, rmk4: "" },
        });
    const router = useRouter();
    const onEditCustomerInfo = (
        record: IBookingOrderDetail["bookingOrder"],
    ) => {
        setShowDrawer(true);
        setRecord(record);
    };

    const onCancelEditCustomerInfo = () => {
        setShowDrawer(false);
        setRecord(undefined);
    };

    const handleCancelBookingOrder = () => {
        onCancelBooking?.(cancelBookingData, () => {
            setShowModalConfirm(false);
            router.push("./portal/manage-booking/order-list");
        });
    };

    const handleSubmitCustomerInfo: DrawerCustomerInfoProps["onSubmit"] = (
        data,
    ) => {
        onSave?.({ bookingOrder: { ...data } }, () => {
            setShowDrawer(false);
            setRecord(undefined);
        });
    };
    return (
        <>
            <div
                className={classNames("order__detail", {
                    [className]: className,
                })}
            >
                <div className="order__detail-product mb-6">
                    <span className="flex items-center">
                        <span className="text-[16px] font-[500]">
                            {orderDetail.template.name}
                        </span>
                        <span className="mx-3">-</span>
                        <span className=" inline-block">
                            {orderDetail.sellable.code}
                        </span>
                    </span>
                </div>
                <div className="order__detail--subtotal mb-6 border-b pb-6">
                    <div className="flex items-center">
                        <div className="w-40 border-r mr-6">
                            <span className="block">Giá tour</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.tourPrice)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Phí bổ sung</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.extraPrice)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Thuế phí</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.charge)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Tổng tiền</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.totalAmount)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Ngày đặt</span>
                            <span className="block text-[16px] font-semibold">
                                {formatDate(orderDetail.sysFstUpdate)}
                            </span>
                        </div>
                        <div className="w-40">
                            <span className="block">Trạng thái</span>
                            <span className="block text-[16px] mb-3">
                                {(orderDetail.paymentStatus === "paid" && (
                                    <Tag color="green">Đã thanh toán</Tag>
                                )) ||
                                    (orderDetail.paymentStatus ===
                                        "deposit" && (
                                        <Tag color="blue">
                                            Thanh toán 1 phầm
                                        </Tag>
                                    )) || (
                                        <Tag color="red">Chưa thanh toán</Tag>
                                    )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="booking__order__Detail-actions pb-6 mb-6 bg-white">
                    <Space>
                        <Button
                            type="default"
                            danger
                            ghost
                            size="small"
                            onClick={() => setShowModalConfirm(true)}
                        >
                            Huỷ booking
                        </Button>
                        <Button size="small" type="primary" ghost>
                            Tách booking
                        </Button>
                        <Button type="primary" size="small">
                            Thanh toán ngay
                        </Button>
                    </Space>
                </div>
                <div className="order__detail-customer-info">
                    <div className="order__detail-customer-info-head mb-2">
                        <span className="font-semibold text-[16px] mr-3">
                            Thông tin người đặt
                        </span>
                        <Button
                            icon={<EditOutlined />}
                            type="primary"
                            ghost
                            size="small"
                            onClick={() => onEditCustomerInfo(orderDetail)}
                        >
                            Sửa
                        </Button>
                    </div>
                    <Row gutter={16}>
                        <Col span={8} className="mb-3">
                            <div className="">
                                <span className="block text-xs">Họ và tên</span>
                                <span className="font-[500]">
                                    {orderDetail.custName}
                                </span>
                            </div>
                        </Col>
                        <Col span={8} className="mb-3">
                            <div className="">
                                <span className="block text-xs">Email</span>
                                <span className="font-[500]">
                                    {orderDetail.custEmail}
                                </span>
                            </div>
                        </Col>
                        <Col span={8} className="mb-3">
                            <div className="">
                                <span className="block text-xs">
                                    Số điện thoại
                                </span>
                                <span className="font-[500]">
                                    {orderDetail.custPhoneNumber}
                                </span>
                            </div>
                        </Col>
                        <Col span={8} className="mb-3">
                            <div className="">
                                <span className="block text-xs">Địa chỉ</span>
                                <span className="font-[500]">
                                    {orderDetail.custAddress}
                                </span>
                            </div>
                        </Col>
                        <Col span={8} className="mb-3">
                            <div className="">
                                <span className="block text-xs">Ghi chú</span>
                                <span className="font-[500]">
                                    {orderDetail.rmk}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <DrawerCustomerInfo
                isOpen={showDrawer}
                initialValues={record}
                onClose={onCancelEditCustomerInfo}
                onSubmit={handleSubmitCustomerInfo}
            />
            <ModalCancelBookingConfirmation
                isShowModal={isShowModalConfirm}
                title="Huỷ booking!"
                descriptions="Kiểm tra thông tin trước khi nhấn xác nhận huỷ booking."
                onCancel={() => setShowModalConfirm(false)}
                render={() => (
                    <Form layout="vertical">
                        <FormItem>
                            <Input.TextArea
                                placeholder="Ghi chú"
                                name=""
                                onChange={(ev) =>
                                    setCancelBookingData((prev) => ({
                                        ...prev,
                                        bookingOrder: {
                                            ...prev?.bookingOrder,
                                            rmk4: ev.target.value,
                                        },
                                    }))
                                }
                            />
                        </FormItem>
                    </Form>
                )}
                onConfirm={handleCancelBookingOrder}
            />
        </>
    );
};
export default OrderDetail;
