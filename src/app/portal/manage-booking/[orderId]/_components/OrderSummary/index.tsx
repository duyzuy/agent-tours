import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { Button, Space, Tag, Form, Input } from "antd";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { IBookingOrderCancelPayload } from "../../../modules/bookingOrder.interface";
import ModalCancelBookingConfirmation from "../ModalCanelBookingConfirmation";
import DrawerFormOfPayment from "./DrawerFormOfPayment";
import { PaymentStatus } from "@/models/management/common.interface";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";

interface OrderDetailProps {
    orderId?: number;
    name?: string;
    code?: string;
    data?: Partial<
        Pick<
            IOrderDetail["bookingOrder"],
            | "tourPrice"
            | "extraPrice"
            | "charge"
            | "sysFstUpdate"
            | "totalAmount"
            | "totalFop"
            | "totalPaid"
            | "totalRefunded"
            | "paymentStatus"
            | "timelimits"
        >
    >;
    className?: string;
    onCancelBooking?: (
        payload: IBookingOrderCancelPayload,
        cb?: () => void,
    ) => void;
}
const OrderSummary = ({
    orderId,
    data,
    code,
    name,
    className = "",
    onCancelBooking,
}: OrderDetailProps) => {
    const [formOfPaymentType, setFormOfPaymentType] =
        useState<FOPFormData["type"]>();
    const [isShowModalConfirm, setShowModalConfirm] = useState(false);
    const [cancelBookingData, setCancelBookingData] =
        useState<IBookingOrderCancelPayload>({
            bookingOrder: { recId: orderId, rmk4: "" },
        });
    const router = useRouter();

    const onConfirmCancelBookingOrder = () => {
        onCancelBooking?.(cancelBookingData, () => {
            setShowModalConfirm(false);
            router.push("./portal/manage-booking/order-list");
        });
    };
    const onShowModalCancelConfirm = () => setShowModalConfirm(true);
    const onCloseModalCancelConfirm = () => setShowModalConfirm(false);
    const onShowDrawerFOP = (type: FOPFormData["type"]) => {
        setFormOfPaymentType(type);
    };
    return (
        <>
            <div
                className={classNames("order__detail", {
                    [className]: className,
                })}
            >
                <OrderSummary.Title name={name} code={code} className="mb-6" />
                <OrderSummary.Pricings
                    tourPrice={moneyFormatVND(data?.tourPrice)}
                    extraPrice={moneyFormatVND(data?.extraPrice)}
                    charge={moneyFormatVND(data?.charge)}
                    totalAmount={moneyFormatVND(data?.totalAmount)}
                    totalFop={moneyFormatVND(data?.totalFop)}
                    totalPaid={moneyFormatVND(data?.totalPaid)}
                    totalRefunded={moneyFormatVND(data?.totalRefunded)}
                    sysFstUpdate={
                        data?.sysFstUpdate && formatDate(data?.sysFstUpdate)
                    }
                    paymentStatus={
                        (data?.paymentStatus === PaymentStatus.PAID && (
                            <Tag color="green">Đã thanh toán</Tag>
                        )) ||
                        (data?.paymentStatus === PaymentStatus.DEPOSITED && (
                            <Tag color="blue">Thanh toán 1 phần</Tag>
                        )) || <Tag color="red">Chưa thanh toán</Tag>
                    }
                    timelimit={
                        data?.timelimits && data?.timelimits.length ? (
                            <div className="flex-1">
                                <span className="block">
                                    Thời hạn thanh toán
                                </span>
                                <span className="block text-[16px]">
                                    {data?.timelimits.map((item) => (
                                        <div key={item.recId}>
                                            <span>
                                                {formatDate(item.deadline)}
                                            </span>
                                        </div>
                                    ))}
                                </span>
                                <p className="text-xs">
                                    * Đặt chỗ sẽ bị huỷ nếu chưa thực hiện thanh
                                    toán trước thời hạn thanh toán.
                                </p>
                            </div>
                        ) : null
                    }
                />
                <div className="booking__order__Detail-actions pb-6 mb-6 bg-white">
                    <Space>
                        <Button
                            type="default"
                            danger
                            ghost
                            size="small"
                            onClick={onShowModalCancelConfirm}
                        >
                            Huỷ tour
                        </Button>
                        <Button
                            size="small"
                            type="primary"
                            ghost
                            onClick={() =>
                                router.push(
                                    `./portal/manage-booking/${orderId}/split-booking`,
                                )
                            }
                        >
                            Tách tour
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => onShowDrawerFOP(FOP_TYPE.PAYMENT)}
                        >
                            Thanh toán
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => onShowDrawerFOP(FOP_TYPE.REFUND)}
                        >
                            Hoàn tiền
                        </Button>
                    </Space>
                </div>
            </div>
            <DrawerFormOfPayment
                orderId={orderId}
                totalAmount={data?.totalAmount}
                totalPaid={data?.totalPaid}
                isOpen={!isUndefined(formOfPaymentType)}
                formOfPaymentType={formOfPaymentType}
                onClose={() => setFormOfPaymentType(undefined)}
            />
            <ModalCancelBookingConfirmation
                isShowModal={isShowModalConfirm}
                title="Huỷ đặt chỗ!"
                descriptions="Bạn chắc chắn muốn huỷ đặt chỗ?"
                onCancel={onCloseModalCancelConfirm}
                render={() => (
                    <Form layout="vertical">
                        <FormItem required>
                            <Input.TextArea
                                placeholder="Lý do huỷ"
                                name="rmk4"
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
                onConfirm={onConfirmCancelBookingOrder}
            />
        </>
    );
};
export default OrderSummary;

interface OrderSummaryPricings {
    tourPrice?: string;
    charge?: string;
    extraPrice?: string;
    totalAmount?: string;
    sysFstUpdate?: string;
    paymentStatus?: React.ReactNode;
    totalFop?: string;
    totalRefunded?: string;
    totalPaid?: string;
    timelimit?: React.ReactNode;
}
OrderSummary.Pricings = function OrderSummaryPricings({
    tourPrice,
    extraPrice,
    sysFstUpdate,
    totalAmount,
    charge,
    paymentStatus,
    totalFop,
    totalRefunded,
    totalPaid,
    timelimit,
}: OrderSummaryPricings) {
    return (
        <>
            <div className="order__detail--subtotal mb-6 border-b pb-6">
                <div className="flex items-center">
                    <div className="w-40 border-r mr-6">
                        <span className="block">Giá tour</span>
                        <span className="block text-[16px] font-semibold text-primary-default">
                            {tourPrice}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Phí bổ sung</span>
                        <span className="block text-[16px] font-semibold text-primary-default">
                            {extraPrice}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Thuế phí</span>
                        <span className="block text-[16px] font-semibold text-primary-default">
                            {charge}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Tổng tiền</span>
                        <span className="block text-[16px] font-semibold text-primary-default">
                            {totalAmount}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Ngày đặt</span>
                        <span className="block text-[16px] font-semibold">
                            {sysFstUpdate}
                        </span>
                    </div>
                    <div className="w-40">
                        <span className="block">Trạng thái</span>
                        <span className="block text-[16px] mb-3">
                            {paymentStatus}
                        </span>
                    </div>
                </div>
            </div>
            <div className="order__detail--payment-detail mb-6 border-b pb-6">
                <div className="flex items-center">
                    <div className="w-40 border-r mr-6">
                        <span className="block">Tổng tiền phiếu thu</span>
                        <span className="block text-[16px] font-semibold text-green-600">
                            {totalFop}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Đã hoàn</span>
                        <span className="block text-[16px] font-semibold text-red-600">
                            {totalRefunded}
                        </span>
                    </div>
                    <div className="w-40 border-r mr-6">
                        <span className="block">Đã thanh toán</span>
                        <span className="block text-[16px] font-semibold text-green-600">
                            {totalPaid}
                        </span>
                    </div>
                    {timelimit}
                </div>
            </div>
        </>
    );
};

interface OrderSummaryTitle {
    name?: string;
    code?: string;
    className?: string;
}
OrderSummary.Title = function OrderSummaryTitle({
    name,
    code,
    className = "",
}: OrderSummaryTitle) {
    return (
        <div
            className={classNames("order__detail-product", {
                [className]: className,
            })}
        >
            <span className="flex items-center">
                <span className="text-[16px] font-[500]">{name}</span>
                <span className="mx-3">-</span>
                <span className=" inline-block">{code}</span>
            </span>
        </div>
    );
};
