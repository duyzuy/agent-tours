import React, { memo, useState, useCallback } from "react";
import classNames from "classnames";
import { PaymentStatus } from "@/models/common.interface";
import { Button, Tag, Form, Input, Space } from "antd";
import { isEmpty } from "lodash";
import ModalCancelBookingConfirmation from "./BookingOrderActions/ModalCanelBookingConfirmation";
import FormItem from "@/components/base/FormItem";
import { useRouter } from "next/navigation";
import { IBookingOrderCancelPayload } from "../../modules/bookingOrder.interface";
import useCancelBookingOrder from "../../modules/useCancelBookingOrder";
interface OrderInformationProps {
  name?: string;
  code?: string;
  className?: string;
  orderId: number;
  paymentStatus?: PaymentStatus;
  sysFstUpdate?: string;
  referenceId?: string;
  channel?: string;
  agentId?: number;
  sellableCode?: string;
}
const OrderInformation: React.FC<OrderInformationProps> = ({
  className = "",
  name,
  code,
  orderId,
  sysFstUpdate,
  paymentStatus,
  referenceId,
  channel,
  agentId,
  sellableCode,
}) => {
  return (
    <>
      <div
        className={classNames("flex flex-wrap items-center", {
          [className]: className,
        })}
      >
        <div className="w-20">
          <span className="block">ID</span>
          <span className="block text-[15px] font-[500] ">{`#${orderId}`}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Ngày đặt</span>
          <span className="block text-[15px] font-[500] ">{sysFstUpdate}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Kênh bán</span>
          <span className="block text-[15px] font-[500] ">{channel ?? "--"}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Mã đại lý</span>
          <span className="block text-[15px] font-[500] ">{agentId ?? "--"}</span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="w-fit">
          <span className="block">Mã giới thiệu</span>
          <span className="block text-[15px] font-[500] ">
            {referenceId && isEmpty(referenceId) ? referenceId : "--"}
          </span>
        </div>
        <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
        <div className="">
          <span className="block">Trạng thái</span>
          <span className="block text-[15px] font-[500] ">
            <Tag
              color={
                paymentStatus === PaymentStatus.PAID
                  ? "green"
                  : paymentStatus === PaymentStatus.DEPOSITED
                  ? "blue"
                  : "red"
              }
            >
              {paymentStatus === PaymentStatus.PAID
                ? "Đã thanh toán"
                : paymentStatus === PaymentStatus.DEPOSITED
                ? "Thanh toán 1 phần"
                : " Chưa thanh toán"}
            </Tag>
          </span>
        </div>
      </div>
    </>
  );
};
export default memo(OrderInformation);
