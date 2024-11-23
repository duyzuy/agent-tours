import React from "react";
import { Drawer } from "antd";
import { useFormOfPayment } from "../../../modules/useFormOfPayment";
import FOPList, { FOPListProps } from "../FOPList";
import { EFopType } from "@/models/management/core/formOfPayment.interface";

import { useGetFormOfPaymentListCoreQuery } from "@/queries/core/formOfPayment";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";
import useMessage from "@/hooks/useMessage";

export interface DrawerPaymentListProps {
  orderId?: number;
  totalAmount?: number;
  totalPaid?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType?: EFopType[];
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
    { orderId: orderId, types: formOfPaymentType },
    undefined,
    undefined,
  );
  const { data: fopList, isLoading } = useGetFormOfPaymentListCoreQuery({
    queryParams: queryParams,
    enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType) && isOpen,
  });
  // const { data: fopList, isLoading } = useGetFormOfPaymentListByOrderIdCoreQuery({
  //   queryParams: queryParams,
  //   enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType) && isOpen,
  // });
  const message = useMessage();
  const { onApproval, onDelete } = useFormOfPayment();

  const handleApproval: FOPListProps["onApproval"] = (recId, record) => {
    const { amount, type } = record;
    if (type === EFopType.REFUND) {
      if (amount > totalPaid) {
        message.error("Tổng tiền hoàn không vượt quá số tiền đã thanh toán.");
        return;
      }
    }
    onApproval(recId);
  };

  return (
    <Drawer
      title="Lịch sử giao dịch"
      width={850}
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
