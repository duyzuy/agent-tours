import React, { useState, useMemo, useCallback } from "react";
import { Button, Space, Tag, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";

import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { IBookingOrderCancelPayload } from "../../../modules/bookingOrder.interface";
import ModalCancelBookingConfirmation from "./ModalCanelBookingConfirmation";
import DrawerFormOfPayment from "./DrawerFormOfPayment";
import { PaymentStatus } from "@/models/management/common.interface";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";

interface BookingOrderActionsProps {
    orderId?: number;
    totalAmount?: number;
    totalPaid?: number;
    onCancelBooking?: (
        payload: IBookingOrderCancelPayload,
        cb?: () => void,
    ) => void;
}
const BookingOrderActions: React.FC<BookingOrderActionsProps> = ({
    onCancelBooking,
    orderId,
    totalAmount,
    totalPaid,
}) => {
    const router = useRouter();

    const [formOfPaymentType, setFormOfPaymentType] =
        useState<FOPFormData["type"]>();
    const [isShowModalConfirm, setShowModalConfirm] = useState(false);
    const [cancelBookingData, setCancelBookingData] =
        useState<IBookingOrderCancelPayload>({
            bookingOrder: { recId: orderId, rmk4: "" },
        });

    const onConfirmCancelBookingOrder = () =>
        onCancelBooking?.(cancelBookingData, () => {
            setShowModalConfirm(false);
            router.push("./portal/manage-booking/order-list");
        });
    const onShowModalCancelConfirm = useCallback(
        () => setShowModalConfirm(true),
        [],
    );
    const onCloseModalCancelConfirm = useCallback(
        () => setShowModalConfirm(false),
        [],
    );
    const onShowDrawerFOP = (type: FOPFormData["type"]) =>
        setFormOfPaymentType(type);

    return (
        <>
            <div className="booking__order__Detail-actions pb-6 mb-6 border-b bg-white">
                <Space>
                    <Button
                        type="primary"
                        danger
                        size="small"
                        onClick={onShowModalCancelConfirm}
                    >
                        Huỷ
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                            router.push(
                                `./portal/manage-booking/${orderId}/split-booking`,
                            )
                        }
                    >
                        Tách
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                            router.push(
                                `./portal/manage-booking/${orderId}/addon-service`,
                            )
                        }
                    >
                        Mua thêm dịch vụ
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
            <DrawerFormOfPayment
                orderId={orderId}
                totalAmount={totalAmount}
                totalPaid={totalPaid}
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
export default BookingOrderActions;
