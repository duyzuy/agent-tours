"use client";
import React, { useState, useCallback } from "react";
import { Button, Space } from "antd";
import { PaymentStatus } from "@/models/common.interface";
import { EFopType } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import DrawerPaymentList from "./formOfPayment/DrawerPaymentList";
import DrawerPaymentForm from "./formOfPayment/DrawerPaymentForm";

interface BookingOrderActionsProps {
  orderId?: number;
  totalAmount?: number;
  totalPaid?: number;
  paymentStatus?: PaymentStatus;
}
const BookingOrderActions: React.FC<BookingOrderActionsProps> = ({
  orderId,
  totalAmount,
  totalPaid,
  paymentStatus,
}) => {
  const [openFOPList, setOpenFOPList] = useState(false);

  const [drawerForm, showDrawerForm] = useState<{
    show: boolean;
    type?: FOPFormData["type"];
  }>({ show: false, type: undefined });

  const onShowDrawerForm = useCallback((type: FOPFormData["type"]) => {
    showDrawerForm({ show: true, type });
  }, []);

  const onCloseDrawerForm = useCallback(() => {
    showDrawerForm({ show: false, type: undefined });
  }, []);

  return (
    <>
      <Space>
        {paymentStatus !== PaymentStatus.PAID ? (
          <Button
            type="text"
            className="!text-emerald-700 !bg-emerald-100 hover:!bg-emerald-200"
            onClick={() => onShowDrawerForm(EFopType.PAYMENT)}
          >
            Thanh toán
          </Button>
        ) : null}
        <Button
          type="text"
          className="!text-rose-700 !bg-rose-100 hover:!bg-rose-200"
          onClick={() => onShowDrawerForm(EFopType.REFUND)}
        >
          Hoàn tiền
        </Button>
        <Button
          type="text"
          className="!text-cyan-600 !bg-cyan-100 hover:!bg-cyan-200"
          onClick={() => onShowDrawerForm(EFopType.DISCOUNT)}
        >
          Giảm giá
        </Button>
        <Button
          type="text"
          className="!text-pink-600 !bg-pink-100 hover:!bg-pink-200"
          onClick={() => onShowDrawerForm(EFopType.CHARGE)}
        >
          Thêm phí
        </Button>
        <Button
          type="text"
          className="!text-orange-700 !bg-orange-100 hover:!bg-orange-200"
          onClick={() => setOpenFOPList(true)}
        >
          Lịch sử giao dịch
        </Button>
      </Space>
      <DrawerPaymentList
        orderId={orderId}
        totalAmount={totalAmount}
        totalPaid={totalPaid}
        isOpen={openFOPList}
        formOfPaymentType={[EFopType.CHARGE, EFopType.DISCOUNT, EFopType.PAYMENT, EFopType.REFUND]}
        onClose={() => setOpenFOPList(false)}
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
