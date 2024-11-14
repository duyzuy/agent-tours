"use client";
import classNames from "classnames";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { useMemo } from "react";
import { mediaConfig } from "@/configs";
import Image from "next/image";
import useBookingSummary from "../../modules/useBookingSummary";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { PassengerType } from "@/models/common.interface";
import { useTranslations } from "next-intl";
import { Tag } from "antd";
interface BookingBreakDownProps {
  className?: string;
}
const BookingBreakDown: React.FC<BookingBreakDownProps> = ({ className = "" }) => {
  const { productBreakdown, subTotal, subTotalProduct, lastTotalPayment, servicesBreakdown, discountBreakdown } =
    useBookingSummary();
  const product = useBookingSelector((state) => state.bookingInfo.product);
  const cmsTemplate = useBookingSelector((state) => state.bookingInfo.cmsTemplate);
  const t = useTranslations("String");

  const subtotalServices = useMemo(() => {
    return servicesBreakdown
      ? Object.entries(servicesBreakdown).reduce((acc, [key, svItem]) => {
          return (acc += svItem.subTotal);
        }, 0)
      : 0;
  }, [servicesBreakdown]);
  return (
    <div
      className={classNames("booking__breakdown", {
        [className]: className,
      })}
    >
      <div className="booking__breakdown-inner">
        <div className="box product-detail px-6 py-4 bg-white rounded-lg mb-6">
          <div className="box-inner flex">
            <div className="thumbail w-24 h-24 rounded-md relative mr-4 overflow-hidden">
              {cmsTemplate?.thumbnail ? (
                <Image
                  src={`${mediaConfig.rootApiPath}/${cmsTemplate?.thumbnail.small}`}
                  fill
                  alt={cmsTemplate?.name}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div>no image</div>
              )}
            </div>
            <div className="content flex-1">
              <p className="text-lg font-[500] mb-3">{cmsTemplate?.name}</p>
              <Tag color="blue">{`#${product?.code}`}</Tag>
            </div>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500">{t("departDate")}</span>
              <span className="text-lg text-primary-default">
                {product?.startDate ? formatDate(product?.startDate, "DD/MM/YYYY") : null}
              </span>
            </div>
            <div className="breakdown__products">
              {Object.entries(productBreakdown)?.map(([type, configs]) =>
                configs.length ? (
                  <div className="breakdown-pax flex justify-between mb-2" key={type}>
                    <div className="pax-name flex-1 text-gray-500">{t(type)}</div>
                    <div className="price-list w-48">
                      {configs.map((config, _index) => (
                        <div key={`${type}-${_index}`} className="flex justify-end">
                          <span className="breakdown__quantity">
                            <span className="config-class text-gray-500 text-xs mr-1">{`(${config.class})`}</span>
                            <span>1 x</span>
                          </span>
                          <span className="block text-right ml-2">{moneyFormatVND(config[type as PassengerType])}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null,
              )}
            </div>
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <span className="text-gray-500">{t("subtotal")}</span>
              <span className="font-[500] text-lg">{moneyFormatVND(subTotalProduct)}</span>
            </div>
          </div>
        </div>
        {servicesBreakdown ? (
          <div className="service__breakdown px-6 py-4 bg-white rounded-md mb-6">
            <div className="service__breakdown-head mb-6">
              <span className="text-lg font-500">Dịch vụ</span>
            </div>
            <div className="service__breakdown-body">
              {Object.entries(servicesBreakdown).map(([key, svItem]) => (
                <div className="service__breakdown-item" key={key}>
                  <div className="service__breakdown-item__inner">
                    <div className="service__breakdown-item__name mb-3 bg-slate-50 rounded-md px-3 py-2">
                      <span className="text-primary-default block font-[500]">{svItem.serviceName}</span>
                    </div>
                    <div className="service__breakdown-item__passengers">
                      {svItem.passengers.map(({ info, index, priceConfigs, type }, _index) => (
                        <div key={_index} className="service__breakdown-item__passenger-item flex justify-between mb-2">
                          <div className="service__breakdown-item__passenger-item-name flex-1">
                            <span>{`${info.paxLastname}, ${info.paxMiddleFirstName}`}</span>
                          </div>
                          <div className="service__breakdown-item__passenger-item__price-configs w-48">
                            {priceConfigs.map((configItem) => (
                              <div
                                className="service__breakdown-item__passenger-item__price-config"
                                key={configItem.priceConfig.recId}
                              >
                                <div className="flex justify-end">
                                  <span className="breakdown__quantity">
                                    <span className="text-xs text-gray-500 blockk mr-1">
                                      {`(${configItem.priceConfig.class})`}
                                    </span>
                                    <span>{`${configItem.quantity} x`}</span>
                                  </span>

                                  <span className="block ml-2 text-right">
                                    {moneyFormatVND(configItem.priceConfig[type])}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <span className="text-gray-500">{t("subtotal")}</span>
              <span className="font-[500] text-lg">{moneyFormatVND(subtotalServices)}</span>
            </div>
          </div>
        ) : null}
        <div className="box total px-6 py-4 bg-white rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500">{t("subtotal")}</span>
            <span>{moneyFormatVND(subTotal)}</span>
          </div>

          {discountBreakdown?.couponPolicy || discountBreakdown?.coupons.length ? (
            <div className="discount__policy">
              <div className="discount__policy-label">Mã giảm giá</div>
              {discountBreakdown?.couponPolicy ? (
                <div className="discount__policy-item flex justify-between">
                  <span className="discount__policy-code">{discountBreakdown?.couponPolicy.code}</span>
                  <div className="text-right">
                    <span className="price text-emerald-500">
                      {`-${moneyFormatVND(discountBreakdown?.couponPolicy.discountAmount)}`}
                    </span>
                  </div>
                </div>
              ) : null}
              {discountBreakdown?.coupons
                ? discountBreakdown?.coupons.map((coupon, _index) => (
                    <div className="discount__policy-item flex justify-between" key={_index}>
                      <span className="discount__policy-code">{coupon.code}</span>
                      <div className="text-right">
                        <span className="price text-emerald-500">{`-${moneyFormatVND(coupon.discountAmount)}`}</span>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <span className="text-gray-500">{t("totalPayment")}</span>
            <span className="text-red-600 text-lg font-[500]">{moneyFormatVND(lastTotalPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingBreakDown;
