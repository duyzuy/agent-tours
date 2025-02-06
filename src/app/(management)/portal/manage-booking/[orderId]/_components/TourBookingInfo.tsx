import React, { memo } from "react";
import classNames from "classnames";
import { PaymentStatus } from "@/models/common.interface";
import { Card } from "antd";

interface TourBookingInfoProps {
  name?: string;
  code?: string;
  startDate?: string;
  endDate?: string;
  className?: string;
  orderId?: number;
  paymentStatus?: PaymentStatus;
  sellableCode?: string;
  sysFstUpdate?: string;
}
const TourBookingInfo: React.FC<TourBookingInfoProps> = ({
  className = "",
  name,
  endDate,
  startDate,
  code,
  orderId,
  sysFstUpdate,
  paymentStatus,
  sellableCode,
}) => {
  return (
    <Card
      className={classNames("tour-infor-card", {
        [className]: className,
      })}
    >
      <div className="flex flex-wrap items-center">
        <div className="w-fit">
          <span className="block">Tên</span>
          <span className="block text-[15px] font-[500]">{name}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Mã Tour</span>
          <span className="block text-[15px] font-[500]">{code}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Mã sản phẩm</span>
          <span className="block text-[15px] font-[500]">{sellableCode}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="mr-6">
          <span className="block">Ngày đi</span>
          <span className="block text-[15px] font-[500]">{startDate}</span>
        </div>
        <div className="mr-6 pr-6 w-fit">
          <span className="block">Ngày về</span>
          <span className="block text-[15px] font-[500]">{endDate}</span>
        </div>
      </div>
    </Card>
  );
};
export default memo(TourBookingInfo);
