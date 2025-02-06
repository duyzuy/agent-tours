import React, { memo, useState } from "react";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import CustomerFormDrawer, { CustomerFormDrawerProps } from "./CustomerFormDrawer";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { ButtonSecondary } from "@/components/base/buttons";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import useUpdateCustomerInfo from "../../../modules/useUpdateCustomerInfo";
import { Button, Card } from "antd";

interface CustomerInformationProps {
  className?: string;
  cusInfo?: ICustomerInformation;
  orderId?: number;
  allowEdit?: boolean;
}
const CustomerInformation: React.FC<CustomerInformationProps> = ({ orderId, cusInfo, allowEdit, className = "" }) => {
  const { mutate: updateCustomerInfo, isPending } = useUpdateCustomerInfo();
  const [showDrawer, setShowDrawer] = useState(false);
  const onCloseDrawer = () => setShowDrawer(false);
  const onOpenDrawer = () => setShowDrawer(true);

  const handleUpdateCustomerInformation: CustomerFormDrawerProps["onSubmit"] = (data) => {
    updateCustomerInfo?.(
      { bookingOrder: { ...data, recId: orderId } },
      {
        onSuccess(data, variables, context) {
          setShowDrawer(false);
        },
      },
    );
  };
  return (
    <Card
      className={classNames("order__detail-customer-info", {
        [className]: className,
      })}
    >
      <div className="order__detail-customer-info-head mb-2">
        <span className="font-semibold text-[16px] mr-3">Thông tin người đặt</span>
        {allowEdit ? (
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            className="!text-blue-600 hover:!bg-blue-50"
            onClick={onOpenDrawer}
          >
            Sửa
          </Button>
        ) : null}
      </div>
      <CustomerInformationBox
        custName={cusInfo?.custName}
        custEmail={cusInfo?.custEmail}
        custPhoneNumber={cusInfo?.custPhoneNumber}
        custAddress={cusInfo?.custAddress}
        rmk={cusInfo?.rmk}
      />
      <CustomerFormDrawer
        isOpen={showDrawer}
        initialValues={cusInfo}
        onClose={onCloseDrawer}
        onSubmit={handleUpdateCustomerInformation}
        loading={isPending}
      />
    </Card>
  );
};
export default memo(CustomerInformation);

interface CustomerInformationBoxProps {
  custName?: string;
  custPhoneNumber?: string;
  custAddress?: string;
  rmk?: string;
  custEmail?: string;
}
function CustomerInformationBox(data: CustomerInformationBoxProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <ContentDetailList.Item label="Họ và tên" value={<span className="font-[500]">{data.custName || "--"}</span>} />
      <ContentDetailList.Item label="Email" value={<span className="font-[500]">{data.custEmail || "--"}</span>} />
      <ContentDetailList.Item
        label="Số điện thoại"
        value={<span className="font-[500]">{data.custPhoneNumber || "--"}</span>}
      />
      <ContentDetailList.Item label="Địa chỉ" value={<span className="font-[500]">{data.custAddress || "--"}</span>} />
      <ContentDetailList.Item label="Ghi chú" value={<span className="font-[500]">{data.rmk || "--"}</span>} />
    </div>
  );
}
