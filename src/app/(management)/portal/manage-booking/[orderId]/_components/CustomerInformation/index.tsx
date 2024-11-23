import React, { memo, useState } from "react";
import { Button, Row, Col } from "antd";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import { IBookingOrderCustomerPayload } from "../../../modules/bookingOrder.interface";
import DrawerCustomerInformation, { DrawerCustomerInformationProps } from "./DrawerCustomerInformation";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { ButtonSecondary } from "@/components/base/buttons";
import { ContentDetailList } from "@/components/admin/ContentDetailList";

interface CustomerInformationProps {
  className?: string;
  cusInfo?: ICustomerInformation;
  orderId?: number;
  onSave?: (payload: IBookingOrderCustomerPayload, cb?: () => void) => void;
}
const CustomerInformation: React.FC<CustomerInformationProps> = ({ orderId, cusInfo, className = "", onSave }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const onCloseDrawer = () => setShowDrawer(false);
  const onOpenDrawer = () => setShowDrawer(true);

  const handleUpdate: DrawerCustomerInformationProps["onSubmit"] = (data) => {
    orderId &&
      onSave?.({ bookingOrder: { ...data, recId: orderId } }, () => {
        setShowDrawer(false);
      });
  };

  return (
    <div
      className={classNames("order__detail-customer-info", {
        [className]: className,
      })}
    >
      <div className="order__detail-customer-info-head mb-2">
        <span className="font-semibold text-[16px] mr-3">Thông tin người đặt</span>
        <ButtonSecondary
          buttonProps={{
            icon: <EditOutlined />,
            size: "small",
            shape: "circle",
          }}
          color="primary"
          onClick={onOpenDrawer}
        ></ButtonSecondary>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ContentDetailList.Item
          label="Họ và tên"
          value={<span className="font-[500]">{cusInfo?.custName || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Email"
          value={<span className="font-[500]">{cusInfo?.custEmail || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Số điện thoại"
          value={<span className="font-[500]">{cusInfo?.custPhoneNumber || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Địa chỉ"
          value={<span className="font-[500]">{cusInfo?.custAddress || "--"}</span>}
        />
        <ContentDetailList.Item label="Ghi chú" value={<span className="font-[500]">{cusInfo?.rmk || "--"}</span>} />
      </div>

      <DrawerCustomerInformation
        isOpen={showDrawer}
        orderId={orderId}
        initialValues={cusInfo}
        onClose={onCloseDrawer}
        onSubmit={handleUpdate}
      />
    </div>
  );
};
export default memo(CustomerInformation);
