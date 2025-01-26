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
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const { onCancelBookingOrder } = useCancelBookingOrder();
  const [cancelBookingData, setCancelBookingData] = useState<IBookingOrderCancelPayload>({
    bookingOrder: { recId: orderId, rmk4: "" },
  });
  const router = useRouter();

  const onConfirmCancelBookingOrder = () =>
    onCancelBookingOrder?.(cancelBookingData, () => {
      setShowModalConfirm(false);
      router.push("/portal/manage-booking/order-list");
    });
  const onShowModalCancelConfirm = useCallback(() => setShowModalConfirm(true), []);
  const onCloseModalCancelConfirm = useCallback(() => setShowModalConfirm(false), []);

  return (
    <>
      <div
        className={classNames("flex items-center", {
          [className]: className,
        })}
      >
        <div className="w-20 border-r mr-6 pr-6">
          <span className="block">ID</span>
          <span className="block text-[15px] font-[500] ">{`#${orderId}`}</span>
        </div>
        {name ? (
          <div className="w-40 border-r mr-6 pr-6">
            <span className="block">Tên</span>
            <span className="block text-[15px] font-[500] ">{name}</span>
          </div>
        ) : null}
        {code ? (
          <div className="border-r mr-6 pr-6 w-fit">
            <span className="block">Mã Tour</span>
            <span className="block text-[15px] font-[500] ">{code}</span>
          </div>
        ) : null}

        <div className="border-r mr-6 pr-6 w-fit">
          <span className="block">Ngày đặt</span>
          <span className="block text-[15px] font-[500] ">{sysFstUpdate}</span>
        </div>
        <div className="border-r mr-6 pr-6 w-fit">
          <span className="block">Kênh bán</span>
          <span className="block text-[15px] font-[500] ">{channel ?? "--"}</span>
        </div>
        <div className="border-r mr-6 pr-6 w-fit">
          <span className="block">Mã đại lý</span>
          <span className="block text-[15px] font-[500] ">{agentId ?? "--"}</span>
        </div>

        <div className="border-r mr-6 pr-6 w-fit">
          <span className="block">Mã giới thiệu</span>
          <span className="block text-[15px] font-[500] ">
            {referenceId && isEmpty(referenceId) ? referenceId : "--"}
          </span>
        </div>
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
        {/* <div className="ml-auto">
          <Space>
            <Button
              size="small"
              type="primary"
              onClick={() => router.push(`/portal/manage-booking/${orderId}/split-booking`)}
            >
              Tách đặt chỗ
            </Button>
            <Button type="primary" danger size="small" ghost onClick={onShowModalCancelConfirm}>
              Huỷ đặt chỗ
            </Button>
          </Space>
        </div> */}
      </div>
      <ModalCancelBookingConfirmation
        orderId={orderId}
        isShowModal={isShowModalConfirm}
        title="Huỷ đặt chỗ!"
        descriptions="Bạn chắc chắn muốn huỷ đặt chỗ?"
        onCancel={onConfirmCancelBookingOrder}
      />
    </>
  );
};
export default memo(OrderInformation);
