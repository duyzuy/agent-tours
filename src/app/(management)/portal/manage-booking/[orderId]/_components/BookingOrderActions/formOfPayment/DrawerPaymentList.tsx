import React from "react";
import { Drawer } from "antd";

import { useFormOfPayment } from "../../../modules/useFormOfPayment";
import FOPList, { FOPListProps } from "../FOPList";
import { FOP_TYPE, IFormOfPayment } from "@/models/management/core/formOfPayment.interface";
import { useGetFormOfPaymentListByOrderIdCoreQuery } from "@/queries/core/bookingOrder";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";
import { FOPFormData } from "../../../modules/formOfPayment.interface";
import useMessage from "@/hooks/useMessage";

export interface DrawerPaymentListProps {
  orderId?: number;
  totalAmount?: number;
  totalPaid?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType: FOPFormData["type"];
}

const DrawerPaymentList: React.FC<DrawerPaymentListProps> = ({
  isOpen = false,
  totalAmount,
  totalPaid = 0,
  onClose,
  orderId,
  formOfPaymentType,
}) => {
  const queryParams = new FormOfPaymmentQueryParams(
    { orderId: orderId, type: formOfPaymentType },
    undefined,
    undefined,
  );
  const { data: fopList, isLoading } = useGetFormOfPaymentListByOrderIdCoreQuery({
    queryParams: queryParams,
    enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType) && isOpen,
  });
  const message = useMessage();
  const { onApproval, onDelete } = useFormOfPayment();

  const handleApproval: FOPListProps["onApproval"] = (recId, record) => {
    const { amount } = record;

    console.log(record, totalPaid, totalAmount);

    if (formOfPaymentType === FOP_TYPE.REFUND) {
      if (amount > totalPaid) {
        message.error("Tổng tiền hoàn không vượt quá số tiền đã thanh toán.");
        return;
      }
    }
    onApproval(recId);
  };

  return (
    <Drawer
      title={
        (formOfPaymentType === FOP_TYPE.PAYMENT && "Lịch sử thanh toán") ||
        (formOfPaymentType === FOP_TYPE.REFUND && "Lịch sử hoàn tiền") ||
        (formOfPaymentType === FOP_TYPE.CHARGE && "Danh sách phí") ||
        (formOfPaymentType === FOP_TYPE.DISCOUNT && "Danh sách giảm giá") ||
        "--"
      }
      width={750}
      onClose={onClose}
      destroyOnClose={true}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <FOPList
        items={fopList || []}
        onApproval={handleApproval}
        onDelete={onDelete}
        totalPaid={totalPaid}
        totalAmount={totalAmount}
        loading={isLoading}
      />
    </Drawer>
  );
};
export default DrawerPaymentList;
