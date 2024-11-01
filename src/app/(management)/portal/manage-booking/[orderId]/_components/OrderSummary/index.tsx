import React, { memo } from "react";
import { Tag } from "antd";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PaymentStatus } from "@/models/common.interface";
import { IFormOfPayment } from "@/models/management/core/formOfPayment.interface";

type DataType = Pick<
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
>;
interface OrderDetailProps {
  orderId?: number;
  name?: string;
  code?: string;
  data?: Partial<DataType>;
  rulesAndPolicies?: IOrderDetail["rulesAndPolicies"];
  className?: string;
  coupons?: IFormOfPayment[];
}
const OrderSummary = ({ orderId, data, code, rulesAndPolicies, name, className = "", coupons }: OrderDetailProps) => {
  return (
    <>
      <div
        className={classNames("order__detail", {
          [className]: className,
        })}
      >
        {/* <OrderSummary.Title name={name} code={code} className="mb-6" /> */}

        <OrderSummary.Pricings
          tourPrice={moneyFormatVND(data?.tourPrice)}
          extraPrice={moneyFormatVND(data?.extraPrice)}
          charge={moneyFormatVND(data?.charge)}
          totalAmount={moneyFormatVND(data?.totalAmount)}
          totalFop={moneyFormatVND(data?.totalFop)}
          totalPaid={moneyFormatVND(data?.totalPaid)}
          totalRefunded={moneyFormatVND(data?.totalRefunded)}
          sysFstUpdate={data?.sysFstUpdate && formatDate(data?.sysFstUpdate)}
          paymentStatus={
            (data?.paymentStatus === PaymentStatus.PAID && <Tag color="green">Đã thanh toán</Tag>) ||
            (data?.paymentStatus === PaymentStatus.DEPOSITED && <Tag color="blue">Thanh toán 1 phần</Tag>) || (
              <Tag color="red">Chưa thanh toán</Tag>
            )
          }
          coupons={coupons}
          // timelimit={
          //     data?.timelimits && data?.timelimits.length ? (
          //         <div className="flex-1">
          //             <span className="block">
          //                 Thời hạn thanh toán
          //             </span>
          //             <span className="block text-[16px]">
          //                 {data?.timelimits.map((item) => (
          //                     <div key={item.recId}>
          //                         <span>
          //                             {formatDate(item.deadline)}
          //                         </span>
          //                     </div>
          //                 ))}
          //             </span>
          //             <p className="text-xs">
          //                 * Đặt chỗ sẽ bị huỷ nếu chưa thực hiện thanh
          //                 toán trước thời hạn thanh toán.
          //             </p>
          //         </div>
          //     ) : null
          // }
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
  sysFstUpdate?: string;
  paymentStatus?: React.ReactNode;
  totalFop?: string;
  totalRefunded?: string;
  totalPaid?: string;
  coupons?: IFormOfPayment[];
}
OrderSummary.Pricings = function OrderSummaryPricings({
  tourPrice,
  extraPrice,
  sysFstUpdate,
  totalAmount,
  charge,
  paymentStatus,
  totalFop,
  totalRefunded,
  totalPaid,
  coupons,
}: OrderSummaryPricings) {
  return (
    <>
      <div className="order__detail--subtotal mb-6 border-b pb-6">
        <div className="flex items-center">
          <div className="w-40 border-r mr-6">
            <span className="block">Giá tour</span>
            <span className="block text-[16px] font-semibold text-primary-default">{tourPrice}</span>
          </div>
          <div className="w-40 border-r mr-6">
            <span className="block">Phí bổ sung</span>
            <span className="block text-[16px] font-semibold text-primary-default">{extraPrice}</span>
          </div>
          <div className="w-40 border-r mr-6">
            <span className="block">Thuế phí</span>
            <span className="block text-[16px] font-semibold text-primary-default">{charge}</span>
          </div>
          <div className="w-60 mr-6 border-r">
            <span className="block">Mã giảm giá</span>
            <span className="block">
              {coupons && coupons.length
                ? coupons.map((item) => (
                    <div className="coupon-item" key={item.recId}>
                      <span className="text-[16px] font-semibold text-green-600">{moneyFormatVND(item.amount)}</span>
                      <span className=" bg-pink-100 px-3 py-1 ml-2 text-pink-600 rounded-sm text-xs">
                        {item.fopDocument}
                      </span>
                    </div>
                  ))
                : "--"}
            </span>
          </div>
          <div className="w-40 mr-6">
            <span className="block">Tổng tiền</span>
            <span className="block text-[16px] font-semibold text-primary-default">{totalAmount}</span>
          </div>
        </div>
      </div>
      <div className="order__detail--payment-detail mb-6 border-b pb-6">
        <div className="flex items-center">
          <div className="w-40 border-r mr-6">
            <span className="block">Đã thanh toán</span>
            <span className="block text-[16px] font-semibold text-green-600">{totalPaid}</span>
          </div>
          <div className="w-40 border-r mr-6">
            <span className="block">Đã hoàn</span>
            <span className="block text-[16px] font-semibold text-amber-400">{totalRefunded}</span>
          </div>
          <div className="w-40 border-r mr-6">
            <span className="block">Tổng thanh toán</span>
            <span className="block text-[16px] font-semibold text-red-600">{totalFop}</span>
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
      <span className="flex items-center">
        <span className="text-[16px] font-[500]">{name}</span>
        <span className="mx-3">-</span>
        <span className=" inline-block">{code}</span>
      </span>
    </div>
  );
};
