import React, { useState, useCallback } from "react";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { PaymentStatus } from "@/models/common.interface";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import DrawerPaymentList from "./formOfPayment/DrawerPaymentList";
import DrawerPaymentForm from "./formOfPayment/DrawerPaymentForm";

interface BookingOrderActionsProps {
  orderId?: number;
  sellableId?: number;
  totalAmount?: number;
  totalPaid?: number;
  paymentStatus?: PaymentStatus;
}
const BookingOrderActions: React.FC<BookingOrderActionsProps> = ({
  orderId,
  sellableId,
  totalAmount,
  totalPaid,
  paymentStatus,
}) => {
  const router = useRouter();

  const [formOfPaymentType, setFormOfPaymentType] = useState<FOPFormData["type"]>();

  const [drawerList, showDrawerList] = useState<{
    show: boolean;
    type?: FOPFormData["type"];
  }>({ show: false, type: undefined });

  const [drawerForm, showDrawerForm] = useState<{
    show: boolean;
    type?: FOPFormData["type"];
  }>({ show: false, type: undefined });

  const onShowDrawerForm = useCallback((type: FOPFormData["type"]) => {
    showDrawerForm({ show: true, type });
  }, []);

  const onShowDrawerList = useCallback((type: FOPFormData["type"]) => {
    showDrawerList({ show: true, type });
  }, []);

  const onCloseDrawerForm = useCallback(() => {
    showDrawerForm({ show: false, type: undefined });
  }, []);

  const onCloseDrawerList = useCallback(() => {
    showDrawerList({ show: false, type: undefined });
  }, []);

  return (
    <>
      <div className="booking__order__Detail-actions pb-6 mb-6 border-b bg-white">
        <Space>
          {paymentStatus !== PaymentStatus.PAID ? (
            <Button type="primary" size="small" onClick={() => onShowDrawerForm(FOP_TYPE.PAYMENT)}>
              Thanh toán
            </Button>
          ) : null}
          <Button type="primary" size="small" onClick={() => onShowDrawerForm(FOP_TYPE.REFUND)}>
            Hoàn tiền
          </Button>
          <Button type="primary" size="small" onClick={() => onShowDrawerForm(FOP_TYPE.DISCOUNT)}>
            Giảm giá
          </Button>
          <Button type="primary" size="small" onClick={() => onShowDrawerForm(FOP_TYPE.CHARGE)}>
            Thêm phí
          </Button>
          <Button type="primary" ghost size="small" onClick={() => onShowDrawerList(FOP_TYPE.PAYMENT)}>
            Lịch sử thanh toán
          </Button>
          <Button type="primary" ghost size="small" onClick={() => onShowDrawerList(FOP_TYPE.REFUND)}>
            Lịch sử hoàn tiền
          </Button>
          <Button type="primary" ghost size="small" onClick={() => onShowDrawerList(FOP_TYPE.DISCOUNT)}>
            Lịch sử giảm giá
          </Button>
          <Button type="primary" ghost size="small" onClick={() => onShowDrawerList(FOP_TYPE.CHARGE)}>
            Lịch sử phí
          </Button>
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() => router.push(`/portal/manage-booking/130/rooming/${sellableId}`)}
          >
            Xếp phòng
          </Button>
        </Space>
      </div>
      <DrawerPaymentList
        orderId={orderId}
        totalAmount={totalAmount}
        totalPaid={totalPaid}
        isOpen={drawerList.show}
        formOfPaymentType={drawerList.type}
        onClose={onCloseDrawerList}
      />
      <DrawerPaymentForm
        orderId={orderId}
        isOpen={drawerForm.show}
        formOfPaymentType={drawerForm.type}
        onClose={onCloseDrawerForm}
      />
    </>
  );
};
export default BookingOrderActions;
