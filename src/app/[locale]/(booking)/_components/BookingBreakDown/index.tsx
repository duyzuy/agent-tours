"use client";
import classNames from "classnames";
import { useBookingSelector } from "@/store/hooks";
import { useMemo } from "react";
import { mediaConfig } from "@/configs";
import Image from "next/image";
import useBookingSummary from "../../modules/useBookingSummary";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate, stringToDate } from "@/utils/date";
import { PassengerType } from "@/models/common.interface";
import { useTranslations } from "next-intl";
import { Divider, Space, Tag } from "antd";
import { IconCalendarRange, IconCheckCircle, IconImage, IconPlane } from "@/assets/icons";
import { useLocale } from "next-intl";
import { LangCode } from "@/models/management/cms/language.interface";
interface BookingBreakDownProps {
  className?: string;
}
const BookingBreakDown: React.FC<BookingBreakDownProps> = ({ className = "" }) => {
  const { productBreakdown, subTotal, subTotalProduct, lastTotalPayment, servicesBreakdown, discountBreakdown } =
    useBookingSummary();
  const product = useBookingSelector((state) => state.bookingInfo.product);
  const cmsTemplate = useBookingSelector((state) => state.bookingInfo.cmsTemplate);
  const t = useTranslations("String");
  const lang = useLocale() as LangCode;

  const subtotalServices = useMemo(() => {
    return servicesBreakdown
      ? Object.entries(servicesBreakdown).reduce((acc, [key, svItem]) => {
          return (acc += svItem.subTotal);
        }, 0)
      : 0;
  }, [servicesBreakdown]);

  const durationDay = useMemo(() => {
    if (!product || !product.endDate || !product.startDate) return;
    const dayNum = stringToDate(product.endDate)?.diff(stringToDate(product.startDate), "days");
    return dayNum;
  }, [product]);

  return (
    <div
      className={classNames("booking__breakdown", {
        [className]: className,
      })}
    >
      <div className="booking__breakdown-inner">
        <div className="box product-detail px-3 lg:px-6 py-4 bg-white rounded-lg mb-6">
          <div className="box-inner flex">
            <div className="thumbail w-24 h-24 rounded-md bg-gray-100 flex items-center justify-center relative mr-4 overflow-hidden">
              {cmsTemplate?.thumbnail ? (
                <Image
                  src={`${mediaConfig.rootApiPath}/${cmsTemplate?.thumbnail.small}`}
                  fill
                  alt={cmsTemplate?.name}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="text-xs opacity-60 text-center">
                  <IconImage className="mx-auto" />
                  no image
                </div>
              )}
            </div>
            <div className="content flex-1">
              <p className="text-lg font-[500] mb-3">{cmsTemplate?.name}</p>
              <div className="text-xs break-all mb-3">{`#${product?.code}`}</div>
              <Divider />
              <ul className="break-all">
                {durationDay ? (
                  <li>
                    <Space>
                      <IconCalendarRange className="w-5 h-5" />
                      <span className="text-sm">
                        {t("card.durationDayValues", { day: durationDay, night: durationDay - 1 })}
                      </span>
                    </Space>
                  </li>
                ) : null}
                <li>
                  <Space>
                    <IconPlane className="w-5 h-5" />
                    <span className="text-sm">
                      {lang === LangCode.VI ? product?.template.depart.name_vi : product?.template.depart.name_en}
                    </span>
                  </Space>
                </li>
              </ul>
              <div>
                <div className="font-semibold mb-2">Tour bao gồm</div>
                <ul>
                  {product?.sellableDetails.inventories.map((item, _index) => (
                    <li key={_index} className="flex gap-x-2">
                      <IconCheckCircle className="w-4 h-4 !text-emerald-600" />
                      {item.name}
                    </li>
                  ))}
                  {product?.sellableDetails.stocks.map((item, _index) => (
                    <li key={_index} className="flex gap-x-2">
                      <IconCheckCircle className="w-4 h-4 !text-emerald-600" />
                      {`${item.inventory.name} - ${item.type}`}
                    </li>
                  ))}
                </ul>
              </div>
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
                  <div className="breakdown-pax flex justify-between" key={type}>
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
          <div className="service__breakdown lg:px-6 px-3 py-4 bg-white rounded-md mb-6">
            <div className="service__breakdown-head mb-6">
              <span className="text-lg font-500">Dịch vụ</span>
            </div>
            <div className="service__breakdown-body">
              {Object.entries(servicesBreakdown).map(([key, svItem]) => (
                <div className="service__breakdown-item" key={key}>
                  <div className="service__breakdown-item__name mb-3 py-2 flex justify-between">
                    <span className="flex-1 text-primary-default block font-[500]">
                      {`${svItem.inventory.name}${svItem.stock ? ` - ${svItem.stock.code}` : ""}`}
                    </span>
                    <span className="w-36 text-right text-red-600">{moneyFormatVND(svItem.subTotal)}</span>
                  </div>
                  <div className="service__breakdown-item__passengers">
                    {svItem.passengers.map(({ info, index, priceConfigs, type }, _index) => (
                      <div key={_index} className="service__breakdown-item__passenger-item flex justify-between mb-2">
                        <div className="service__breakdown-item__passenger-item-name flex-1">
                          {info.paxLastname && info.paxMiddleFirstName
                            ? getPassengerFullname(info.paxLastname, info.paxMiddleFirstName)
                            : `Hành khách ${index + 1}`}
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
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <span className="text-gray-500">{t("subtotal")}</span>
              <span className="font-[500] text-lg">{moneyFormatVND(subtotalServices)}</span>
            </div>
          </div>
        ) : null}
        <div className="box total px-6 py-4 bg-white rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="">{t("subtotal")}</span>
            <span className="">{moneyFormatVND(subTotal)}</span>
          </div>

          {discountBreakdown?.couponPolicy || discountBreakdown?.coupons.length ? (
            <div className="discount__policy-label mb-2">Mã giảm giá</div>
          ) : null}
          {discountBreakdown?.couponPolicy ? (
            <div className="discount__policy-item flex justify-between mb-1">
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
                <div className="discount__policy-item flex justify-between mb-1" key={_index}>
                  <span className="discount__policy-code">{coupon.code}</span>
                  <div className="text-right">
                    <span className="price text-emerald-500">{`-${moneyFormatVND(coupon.discountAmount)}`}</span>
                  </div>
                </div>
              ))
            : null}

          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <span className="">{t("totalPayment")}</span>
            <span className="text-red-600 text-lg font-[500]">{moneyFormatVND(lastTotalPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingBreakDown;

const getPassengerFullname = (paxLastname: string, paxMiddleFirstName: string) => {
  return `${paxLastname}, ${paxMiddleFirstName}`;
};
