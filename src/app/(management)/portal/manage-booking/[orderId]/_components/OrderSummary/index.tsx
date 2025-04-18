import React, { memo, useMemo } from "react";
import { Divider, Tag } from "antd";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PaymentStatus } from "@/models/common.interface";

interface OrderDetailProps {
  orderId?: number;
  name?: string;
  code?: string;
  data: Partial<
    Pick<
      IOrderDetail["bookingOrder"],
      | "tourPrice"
      | "extraPrice"
      | "charge"
      | "sysFstUpdate"
      | "totalAmount"
      | "totalFop"
      | "totalPaid"
      | "totalRefunded"
      | "paymentStatus"
    >
  >;
  rulesAndPolicies?: IOrderDetail["rulesAndPolicies"];
  className?: string;
  coupons?: IOrderDetail["fops"];
}
const OrderSummary = ({ orderId, data, code, rulesAndPolicies, name, className = "", coupons }: OrderDetailProps) => {
  const { tourPrice, extraPrice, charge, totalPaid = 0, totalRefunded = 0, totalAmount = 0, sysFstUpdate } = data;

  const totalRemainTopay = useMemo(() => {
    return totalAmount + totalRefunded - totalPaid;
  }, [totalAmount, totalPaid, totalRefunded]);
  return (
    <>
      <div
        className={classNames("order__detail", {
          [className]: className,
        })}
      >
        <OrderSummary.Title name="Thông tin thanh toán" code={code} className="mb-6" />

        <OrderSummary.Pricings
          tourPrice={moneyFormatVND(tourPrice)}
          extraPrice={moneyFormatVND(extraPrice)}
          charge={moneyFormatVND(charge)}
          totalAmount={moneyFormatVND(totalAmount)}
          totalRemainTopay={moneyFormatVND(totalRemainTopay)}
          totalPaid={moneyFormatVND(totalPaid)}
          totalRefunded={moneyFormatVND(totalRefunded)}
          coupons={coupons}
        />
      </div>
    </>
  );
};
export default memo(OrderSummary);

interface OrderSummaryPricings {
  tourPrice?: string;
  charge?: string;
  extraPrice?: string;
  totalAmount?: string;
  totalFop?: string;
  totalRemainTopay?: string;
  totalRefunded?: string;
  totalPaid?: string;
  coupons?: OrderDetailProps["coupons"];
}
OrderSummary.Pricings = function OrderSummaryPricings({
  tourPrice,
  extraPrice,
  totalAmount,
  charge,
  totalRemainTopay,
  totalFop,
  totalRefunded,
  totalPaid,
  coupons,
}: OrderSummaryPricings) {
  return (
    <>
      <div className="order__detail--subtotal">
        <div className="flex items-center flex-wrap">
          <div className="w-48">
            <span className="block">Giá tour</span>
            <span className="block text-[16px] font-semibold text-primary-default">{tourPrice}</span>
          </div>
          <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
          <div className="w-48">
            <span className="block">Phí bổ sung</span>
            <span className="block text-[16px] font-semibold text-primary-default">{extraPrice}</span>
          </div>
          <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
          <div className="w-48">
            <span className="block">Thuế phí</span>
            <span className="block text-[16px] font-semibold text-primary-default">{charge}</span>
          </div>
          <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
          <div className="w-60 mr-6 border-r">
            <span className="block">Áp dụng mã giảm</span>
            <span className="block">
              {coupons && coupons.length
                ? coupons.map((item) => (
                    <div className="coupon-item" key={item.recId}>
                      <span className="text-[16px] font-semibold text-green-600 mr-1">
                        {moneyFormatVND(item.amount)}
                      </span>
                      <span className="text-[10px]">{item.type}</span>
                    </div>
                  ))
                : "--"}
            </span>
          </div>
          <div className="w-48 mr-6">
            <span className="block">Tổng tiền phải thanh toán</span>
            <span className="block text-[16px] font-semibold text-primary-default">{totalAmount}</span>
          </div>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="order__detail--payment-detail">
        <div className="flex items-center flex-wrap">
          <div className="w-48">
            <span className="block">Đã thanh toán</span>
            <span className="block text-[16px] font-semibold text-green-600">{totalPaid}</span>
          </div>
          <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
          <div className="w-48">
            <span className="block">Đã hoàn</span>
            <span className="block text-[16px] font-semibold text-amber-400">{totalRefunded}</span>
          </div>
          <div className="h-[36px] bg-gray-300/40 w-[1px] mx-6"></div>
          <div className="w-48">
            <span className="block">Số tiền còn lại phải thanh toán</span>
            <span className="block text-[16px] font-semibold text-red-600">{totalRemainTopay}</span>
          </div>
        </div>
      </div>
    </>
  );
};

interface OrderSummaryTitle {
  name?: string;
  code?: string;
  className?: string;
}
OrderSummary.Title = function OrderSummaryTitle({ name, code, className = "" }: OrderSummaryTitle) {
  return (
    <div
      className={classNames("order__detail-product", {
        [className]: className,
      })}
    >
      <span className="text-lg font-[500]">{name}</span>
    </div>
  );
};
