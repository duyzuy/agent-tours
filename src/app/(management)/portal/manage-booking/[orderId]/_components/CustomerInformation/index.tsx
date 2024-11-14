import React, { memo, useState } from "react";
import { Button, Row, Col } from "antd";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import { IBookingOrderCustomerPayload } from "../../../modules/bookingOrder.interface";
import DrawerCustomerInformation, { DrawerCustomerInformationProps } from "./DrawerCustomerInformation";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { ButtonSecondary } from "@/components/base/buttons";

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
    <>
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
        <Row gutter={16}>
          <Col span={12} className="mb-3">
            <div className="">
              <span className="block text-xs">Họ và tên</span>
              <span className="font-[500]">{cusInfo?.custName}</span>
            </div>
          </Col>
          <Col span={12} className="mb-3">
            <div className="">
              <span className="block text-xs">Email</span>
              <span className="font-[500]">{cusInfo?.custEmail}</span>
            </div>
          </Col>
          <Col span={12} className="mb-3">
            <div className="">
              <span className="block text-xs">Số điện thoại</span>
              <span className="font-[500]">{cusInfo?.custPhoneNumber}</span>
            </div>
          </Col>
          <Col span={12} className="mb-3">
            <div className="">
              <span className="block text-xs">Địa chỉ</span>
              <span className="font-[500]">{cusInfo?.custAddress}</span>
            </div>
          </Col>
          <Col span={12} className="mb-3">
            <div className="">
              <span className="block text-xs">Ghi chú</span>
              <span className="font-[500]">{cusInfo?.rmk}</span>
            </div>
          </Col>
        </Row>
      </div>
      <DrawerCustomerInformation
        isOpen={showDrawer}
        orderId={orderId}
        initialValues={cusInfo}
        onClose={onCloseDrawer}
        onSubmit={handleUpdate}
      />
    </>
  );
};
export default memo(CustomerInformation);
