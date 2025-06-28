import React, { memo } from "react";
import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Card, Divider } from "antd";
import { useMemo } from "react";

import { usePortalBookingServiceSelector } from "../store/bookingServiceContext";
import useBreakDownSummary from "../modules/useBreakDownSummary";

interface BookingBreakDownSummaryProps {
  label?: string;
}
type BreakdownTourSummaryItem = {
  qty: number;
  type: PassengerType;
  price: number;
  class: string;
  subTotal: number;
};
const PortalBookingSummary: React.FC<BookingBreakDownSummaryProps> = ({ label }) => {
  const bookingInfo = usePortalBookingServiceSelector((state) => state);

  const productItem = useMemo(() => {
    return bookingInfo.bookingInfo?.product;
  }, [bookingInfo]);

  const { total, services } = useBreakDownSummary();

  return (
    <div className="booking-summary rounded-md">
      <Card>
        <h3 className="text-lg font-[500]">{label}</h3>
        <Divider />

        <div className="product__item mb-3">
          <div className="product__item-label mb-3">
            <span className="font-[500]">Sản phẩm</span>
          </div>
          <div className="product__item-body">
            <ul>
              <li className="flex justify-between mb-1">
                <span>Tên sản phẩm</span>
                <span>{productItem?.template.name}</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Mã sản phẩm</span>
                <span className="text-xs">{productItem?.template.code}</span>
              </li>
            </ul>
          </div>
        </div>
        <Divider />
        <div className="passenger__item">
          <div className="passenger__item-label mb-2">
            <span className="font-[500]">Giá tour</span>
          </div>
          <ul>
            {services.adult.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`adult-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Người lớn - ${item.configItem.class}`}</span>
                  <span className="block text-xs text-primary-default">
                    {moneyFormatVND(item.configItem[item.type])}
                  </span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
            {services.child.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`child-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Trẻ em - ${item.configItem.class}`}</span>
                  <span className="block text-xs text-primary-default">
                    {moneyFormatVND(item.configItem[item.type])}
                  </span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
            {services.infant.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`infant-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Em bé - ${item.configItem.class}`}</span>
                  <span className="block text-xs text-primary-default">
                    {moneyFormatVND(item.configItem[item.type])}
                  </span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Divider />
        <div className="booking-summary__total flex justify-between">
          <span>Tổng tiền</span>
          <span className="font-[500] text-primary-default text-lg">{moneyFormatVND(total)}</span>
        </div>
      </Card>
    </div>
  );
};
export default memo(PortalBookingSummary);
