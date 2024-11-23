import React, { useMemo } from "react";
import { Tabs, TabsProps, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormOfPayment } from "../../modules/useFormOfPayment";
import FOPList from "./FOPList";
import FOPForm from "./FOPForm";
import { EFopType } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";

import { useGetFormOfPaymentListCoreQuery } from "@/queries/core/formOfPayment";

import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";

export interface DrawerFormOfPaymentProps {
  orderId?: number;
  totalAmount?: number;
  totalPaid?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType: FOPFormData["type"];
}

const DrawerFormOfPayment: React.FC<DrawerFormOfPaymentProps> = ({
  isOpen,
  totalAmount,
  totalPaid,
  onClose,
  orderId,
  formOfPaymentType,
}) => {
  const queryParams = new FormOfPaymmentQueryParams(
    { orderId: orderId, types: formOfPaymentType ? [formOfPaymentType] : [] },
    undefined,
    undefined,
  );
  const { data: fopList, isLoading } = useGetFormOfPaymentListCoreQuery({
    queryParams: queryParams,
    enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType),
  });

  const { onCreateFormOfPayment, onApproval, onDelete } = useFormOfPayment();

  const items: TabsProps["items"] = [
    {
      key: "fopList",
      label: "Danh sách",
      children: (
        <FOPList
          items={fopList || []}
          onApproval={onApproval}
          onDelete={onDelete}
          totalPaid={totalPaid}
          totalAmount={totalAmount}
        />
      ),
    },
    {
      key: "fopCreate",
      label: "Thêm mới",
      children: (
        <FOPForm orderId={orderId} formOfPaymentType={formOfPaymentType} onSubmitForm={onCreateFormOfPayment} />
      ),
      icon: <PlusOutlined />,
    },
  ];

  return (
    <Drawer
      title={
        (formOfPaymentType === EFopType.PAYMENT && "Thanh toán") ||
        (formOfPaymentType === EFopType.REFUND && "Hoàn tiền") ||
        (formOfPaymentType === EFopType.DISCOUNT && "Giảm giá") ||
        (formOfPaymentType === EFopType.REFUND && "Thêm phí") ||
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
      <Tabs defaultActiveKey="fopList" items={items} />
    </Drawer>
  );
};
export default DrawerFormOfPayment;
