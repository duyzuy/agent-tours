import React from "react";
import { Drawer } from "antd";
import { useFormOfPayment } from "../../../modules/useFormOfPayment";
import { EFopType } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../../modules/formOfPayment.interface";
import FOPForm, { FOPFormProps } from "../FOPForm";

export interface DrawerPaymentFormProps {
  orderId?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType: FOPFormData["type"];
}

const DrawerPaymentForm: React.FC<DrawerPaymentFormProps> = ({ isOpen, onClose, orderId, formOfPaymentType }) => {
  const { onCreateFormOfPayment } = useFormOfPayment();

  const handleCreateFOP: FOPFormProps["onSubmit"] = (data) => {
    onCreateFormOfPayment(data, () => {
      onClose?.();
    });
  };
  return (
    <Drawer
      title={
        (formOfPaymentType === EFopType.PAYMENT && "Thanh toán") ||
        (formOfPaymentType === EFopType.REFUND && "Hoàn tiền") ||
        (formOfPaymentType === EFopType.DISCOUNT && "Giảm giá") ||
        (formOfPaymentType === EFopType.CHARGE && "Thêm phí") ||
        "--"
      }
      width={750}
      onClose={onClose}
      destroyOnClose={true}
      open={isOpen}
    >
      <FOPForm orderId={orderId} formOfPaymentType={formOfPaymentType} onSubmit={handleCreateFOP} />
    </Drawer>
  );
};
export default DrawerPaymentForm;
