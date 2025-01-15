import React, { memo } from "react";
import { PassengerType } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { Divider } from "antd";
import { useMemo } from "react";
import { useBookingSelector } from "../../hooks/useBooking";
import useBreakDownSummary from "../../modules/useBreakDownSummary";
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
const BookingSummary: React.FC<BookingBreakDownSummaryProps> = ({ label }) => {
  const bookingInfo = useBookingSelector((state) => state);

  const productItem = useMemo(() => {
    return bookingInfo.bookingInfo?.product;
  }, [bookingInfo]);

  const { tourPrices, servicesByPax, servicesNoPax, total } = useBreakDownSummary();
  const { ssrNoStock, ssrStock } = servicesByPax;

  const { ssrNoStock: ssrNoStockNoPax, ssrStock: ssrStockNopax } = servicesNoPax;

  const adultTourBreakdownSummarys = useMemo(() => {
    const totalAdultTour = tourPrices["adult"];
    let totalItem: BreakdownTourSummaryItem[] = [];
    if (totalAdultTour) {
      totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>((acc, item) => {
        acc = [...acc, totalAdultTour[item]];
        return acc;
      }, []);
    }
    return totalItem;
  }, []);

  const childTourBreakdownSummarys = useMemo(() => {
    const totalAdultTour = tourPrices["child"];
    let totalItem: BreakdownTourSummaryItem[] = [];
    if (totalAdultTour) {
      totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>((acc, item) => {
        acc = [...acc, totalAdultTour[item]];
        return acc;
      }, []);
    }
    return totalItem;
  }, []);

  const infantTourBreakdownSummarys = useMemo(() => {
    const totalAdultTour = tourPrices["infant"];
    let totalItem: BreakdownTourSummaryItem[] = [];
    if (totalAdultTour) {
      totalItem = Object.keys(totalAdultTour).reduce<typeof totalItem>((acc, item) => {
        acc = [...acc, totalAdultTour[item]];
        return acc;
      }, []);
    }
    return totalItem;
  }, []);

  return (
    <div className="booking__summary bg-white rounded-md">
      <div className="booking__summary-head px-6 pt-6">
        <h3 className="text-lg font-[500]">{label}</h3>
      </div>
      <Divider />
      <div className="booking__summary-body px-6 pb-4">
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
            {adultTourBreakdownSummarys.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`adult-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Người lớn - ${item.class}`}</span>
                  <span className="block text-xs text-primary-default">{moneyFormatVND(item.price)}</span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
            {childTourBreakdownSummarys.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`child-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Trẻ em - ${item.class}`}</span>
                  <span className="block text-xs text-primary-default">{moneyFormatVND(item.price)}</span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
            {infantTourBreakdownSummarys.map((item, _index) => (
              <li className="flex justify-between items-center mb-2" key={`infant-${_index}`}>
                <span className="passenger__item-passenger-type flex-1">
                  <span className="block">{`Em bé - ${item.class}`}</span>
                  <span className="block text-xs text-primary-default">{moneyFormatVND(item.price)}</span>
                </span>
                <span className="passenger__item-quantity w-10 text-center">{`x${item.qty}`}</span>
                <span className="passenger__item-price w-32 text-right inline-block text-primary-default">
                  {moneyFormatVND(item.subTotal)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {ssrNoStock || ssrStock ? (
          <>
            <Divider />
            <div className="passenger__item-label mb-2">
              <span className="text-lg font-semibold">Dịch vụ theo khách</span>
            </div>
          </>
        ) : null}
        {ssrNoStock ? (
          <>
            {Object.keys(ssrNoStock).map((key, _index) => (
              <div className="mb-2" key={`inventory-${_index}`}>
                <div className="flex justify-between items-center py-3">
                  <span className="block font-semibold text-[16px] flex-1">
                    {ssrNoStock[key].serviceItem.inventory.name}
                  </span>
                  <span className="w-32 text-right inline-block text-primary-default text-[16px] font-semibold">
                    {moneyFormatVND(ssrNoStock[key].subTotal)}
                  </span>
                </div>
                {ssrNoStock[key].items.map(({ bookingIndex, item, type, qty }) => (
                  <div key={`${bookingIndex}${item.recId}`} className="flex justify-between mb-1">
                    <span className="flex-1">
                      <span>{`Hành khách ${bookingIndex + 1} - ${item.class}`}</span>
                      <span className="text-xs block text-primary-default">{moneyFormatVND(item[type])}</span>
                    </span>
                    <span className="w-10 text-center">{`x ${qty}`}</span>
                    <span className="text-primary-default w-32 text-right">{moneyFormatVND(qty * item[type])}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : null}
        {ssrStock ? (
          <>
            {Object.keys(ssrStock).map((key, _index) => (
              <div className="mb-2" key={`inventory-stock-${_index}`}>
                <div className="flex justify-between items-center py-3">
                  <span className="block font-semibold text-[16px] flex-1">
                    {`${ssrStock[key].serviceItem.inventory.name}- ${ssrStock[key].serviceItem.stock?.code}`}
                  </span>
                  <span className="passenger__item-price w-32 text-right inline-block text-primary-default text-[16px] font-semibold">
                    {moneyFormatVND(ssrStock[key].subTotal)}
                  </span>
                </div>
                {ssrStock[key].items.map(({ bookingIndex, type, item, qty }) => (
                  <div key={item.recId} className="flex justify-between mb-1">
                    <span className="flex-1">
                      <span>{`Hành khách ${bookingIndex + 1} - ${item.class}`}</span>
                      <span className="text-xs block text-primary-default">{moneyFormatVND(item[type])}</span>
                    </span>
                    <span className="w-10 text-center">{`x ${qty}`}</span>
                    <span className="text-primary-default w-32 text-right">{moneyFormatVND(qty * item[type])}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : null}

        {ssrNoStockNoPax || ssrStockNopax ? (
          <>
            <Divider />
            <div className="passenger__item-label mb-2">
              <span className="text-lg font-semibold">Dịch vụ</span>
            </div>
          </>
        ) : null}

        {ssrNoStockNoPax ? (
          <>
            {Object.keys(ssrNoStockNoPax).map((key, _index) => (
              <div className="mb-2" key={`inventory-stock-${_index}`}>
                <div className="flex justify-between items-center py-3">
                  <span className="block font-semibold text-[16px] flex-1">
                    {ssrNoStockNoPax[key].serviceItem.inventory.name}
                  </span>
                  <span className="w-32 text-right inline-block text-primary-default text-[16px] font-semibold">
                    {moneyFormatVND(ssrNoStockNoPax[key].subTotal)}
                  </span>
                </div>
                {ssrNoStockNoPax[key].items.map(({ type, item, qty }) => (
                  <div key={item.recId} className="flex justify-between mb-1">
                    <span className="flex-1">
                      <span>{`Hạng - ${item.class}`}</span>
                      <span className="text-xs block text-primary-default">{moneyFormatVND(item[type])}</span>
                    </span>
                    <span className="w-10 text-center">{`x ${qty}`}</span>
                    <span className="text-primary-default w-32 text-right">{moneyFormatVND(qty * item[type])}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : null}

        {ssrStockNopax ? (
          <>
            {Object.keys(ssrStockNopax).map((key, _index) => (
              <div className="mb-2" key={`inventory-stock-${_index}`}>
                <div className="flex justify-between items-center py-3">
                  <span className="block font-semibold text-[16px] flex-1">
                    {`${ssrStockNopax[key].serviceItem.inventory.name}- ${ssrStockNopax[key].serviceItem.stock?.code}`}
                  </span>
                  <span className="w-32 text-right inline-block text-primary-default text-[16px] font-semibold">
                    {moneyFormatVND(ssrStockNopax[key].subTotal)}
                  </span>
                </div>
                {ssrStockNopax[key].items.map(({ type, item, qty }) => (
                  <div key={item.recId} className="flex justify-between mb-1">
                    <span className="flex-1">
                      <span>{`Hạng - ${item.class}`}</span>
                      <span className="text-xs block text-primary-default">{moneyFormatVND(item[type])}</span>
                    </span>
                    <span className="w-10 text-center">{`x ${qty}`}</span>
                    <span className="text-primary-default w-32 text-right">{moneyFormatVND(qty * item[type])}</span>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : null}

        <Divider />
        <div className="booking__summary-total flex justify-between">
          <span>Tổng tiền</span>
          <span className="font-[500] text-primary-default text-lg">{moneyFormatVND(total)}</span>
        </div>
      </div>
    </div>
  );
};
export default memo(BookingSummary);
