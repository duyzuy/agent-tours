import React, { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { Button, Space, Tag, Form, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import classNames from "classnames";
import { IBookingOrderCancelPayload } from "../../../modules/bookingOrder.interface";
import ModalCancelBookingConfirmation from "../ModalCanelBookingConfirmation";
import { useRouter } from "next/navigation";
import DrawerFormOfPayment from "./DrawerFormOfPayment";
import { PaymentStatus } from "@/models/management/common.interface";

interface OrderDetailProps {
    orderDetail: IOrderDetail["bookingOrder"];
    fops: IOrderDetail["fops"];
    className?: string;
    onCancelBooking?: (
        payload: IBookingOrderCancelPayload,
        cb?: () => void,
    ) => void;
}
const OrderSummary: React.FC<OrderDetailProps> = ({
    orderDetail,
    className = "",
    onCancelBooking,
    fops,
}) => {
    const [isShowDrawerFOP, setShowDrawerFOP] = useState(false);
    const [isShowModalConfirm, setShowModalConfirm] = useState(false);
    const [cancelBookingData, setCancelBookingData] =
        useState<IBookingOrderCancelPayload>({
            bookingOrder: { recId: orderDetail.recId, rmk4: "" },
        });
    const router = useRouter();

    const handleCancelBookingOrder = () => {
        onCancelBooking?.(cancelBookingData, () => {
            setShowModalConfirm(false);
            router.push("./portal/manage-booking/order-list");
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
                                {(orderDetail.paymentStatus ===
                                    PaymentStatus.PAID && (
                                    <Tag color="green">Đã thanh toán</Tag>
                                )) ||
                                    (orderDetail.paymentStatus ===
                                        PaymentStatus.DEPOSITED && (
                                        <Tag color="blue">
                                            Thanh toán 1 phần
                                        </Tag>
                                    )) || (
                                        <Tag color="red">Chưa thanh toán</Tag>
                                    )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="order__detail--payment-detail mb-6 border-b pb-6">
                    <div className="flex items-center">
                        <div className="w-40 border-r mr-6">
                            <span className="block">Tổng tiền phiếu thu</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.totalFop)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Đã thanh toán</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.totalPaid)}
                            </span>
                        </div>
                        <div className="w-40 border-r mr-6">
                            <span className="block">Đã hoàn</span>
                            <span className="block text-[16px] font-semibold text-primary-default">
                                {moneyFormatVND(orderDetail.totalRefunded)}
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
                        <Button
                            size="small"
                            type="primary"
                            ghost
                            onClick={() =>
                                router.push(
                                    `./portal/manage-booking/${orderDetail.recId}/split-booking`,
                                )
                            }
                        >
                            Tách booking
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => setShowDrawerFOP(true)}
                        >
                            Phiếu thu
                        </Button>
                    </Space>
                </div>
            </div>
            <DrawerFormOfPayment
                orderId={orderDetail.recId}
                isOpen={isShowDrawerFOP}
                fops={fops}
                onClose={() => setShowDrawerFOP(false)}
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
export default OrderSummary;
