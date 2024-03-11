import React from "react";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { Button, Col, Row, Space, Tag } from "antd";
import { IBookingOrderDetail } from "@/models/management/booking/order.interface";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
interface OrderDetailProps {
    orderDetail: IBookingOrderDetail["bookingOrder"];
    className?: string;
}
const OrderDetail: React.FC<OrderDetailProps> = ({
    orderDetail,
    className = "",
}) => {
    return (
        <div
            className={classNames("order__detail", {
                [className]: className,
            })}
        >
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
                    <div className="w-40 mr-6">
                        <span className="block">Trạng thái</span>
                        <span className="block text-[16px] mb-3">
                            {(orderDetail.paymentStatus === "paid" && (
                                <Tag color="green">Đã thanh toán</Tag>
                            )) ||
                                (orderDetail.paymentStatus === "deposit" && (
                                    <Tag color="blue">Thanh toán 1 phầm</Tag>
                                )) || <Tag color="red">Chưa thanh toán</Tag>}
                        </span>
                    </div>
                    <div className="w-40">
                        <span className="block">
                            <Space>
                                <Button
                                    type="default"
                                    danger
                                    ghost
                                    size="small"
                                >
                                    Huỷ booking
                                </Button>
                                <Button type="primary" size="small">
                                    Thanh toán ngay
                                </Button>
                            </Space>
                        </span>
                    </div>
                </div>
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
                    >
                        Sửa
                    </Button>
                </div>
                <Row gutter={16}>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Họ và tên</span>
                            <span className="">{orderDetail.custName}</span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Email</span>
                            <span>{orderDetail.custEmail}</span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Số điện thoại</span>
                            <span>{orderDetail.custPhoneNumber}</span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Địa chỉ</span>
                            <span>{orderDetail.custAddress}</span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Ghi chú</span>
                            <span>{orderDetail.rmk}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default OrderDetail;
