import React, { memo, useState } from "react";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import DrawerInvoiceInformation, { DrawerInvoiceInformationProps } from "./DrawerInvoiceInformation";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { ButtonSecondary } from "@/components/base/buttons";
import useUpdateInvoiceInfo from "../../../modules/useUpdateInvoiceInfo";
import { ContentDetailList } from "@/components/admin/ContentDetailList";

interface InvoiceInformationProps {
  className?: string;
  invoiceInfo?: Partial<IInvoice>;
  orderId?: number;
}
const InvoiceInformation: React.FC<InvoiceInformationProps> = ({ orderId, invoiceInfo, className = "" }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const onCloseDrawer = () => setShowDrawer(false);
  const onOpenDrawer = () => setShowDrawer(true);
  const { onUpdate: onUpdateInvoiceInfo } = useUpdateInvoiceInfo();

  const handleUpdateInvoiceInfo: DrawerInvoiceInformationProps["onSubmit"] = (data) => {
    orderId &&
      onUpdateInvoiceInfo?.({ ...data, recId: orderId }, () => {
        setShowDrawer(false);
      });
  };

  return (
    <div
      className={classNames("order__detail-invoice-info", {
        [className]: className,
      })}
    >
      <div className="order__detail-invoice-info-head mb-2">
        <span className="font-semibold text-[16px] mr-3">Thông xuất hoá đơn</span>
        <ButtonSecondary
          buttonProps={{
            icon: <EditOutlined />,
            size: "small",
            shape: "circle",
          }}
          color="primary"
          onClick={onOpenDrawer}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ContentDetailList.Item
          label="Họ và tên"
          value={<span className="font-[500]">{invoiceInfo?.invoiceName || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Email"
          value={<span className="font-[500]">{invoiceInfo?.invoiceEmail || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Tên công ty"
          value={<span className="font-[500]">{invoiceInfo?.invoiceCompanyName || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Mã số thuế"
          value={<span className="font-[500]">{invoiceInfo?.invoiceTaxCode || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Địa chỉ"
          value={<span className="font-[500]">{invoiceInfo?.invoiceAddress || "--"}</span>}
        />
      </div>

      <DrawerInvoiceInformation
        isOpen={showDrawer}
        orderId={orderId}
        initialValues={invoiceInfo}
        onClose={onCloseDrawer}
        onSubmit={handleUpdateInvoiceInfo}
      />
    </div>
  );
};
export default memo(InvoiceInformation);
