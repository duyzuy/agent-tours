"use client";
import React from "react";

import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { moneyFormatVND } from "@/utils/helper";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import MobileProductSummaryWraper from "@/components/frontend/ProductSummaryWraper/MobileProductSummaryWraper";
import CalendarSelector from "../../ProductSummary/MobileBoxSummary/CalendarSelector";
import Quantity from "@/components/base/Quantity";
import PromotionSelector from "../../ProductSummary/PromotionSelector";
import { stringToDate } from "@/utils/date";
import useSetProductItemAndPaxQuantity from "@/app/[locale]/(booking)/modules/useSetProductItemAndPaxQuantity";
import { IconCalendarDays } from "@/assets/icons";

interface Props {
  label?: string;
  lowestPrice?: number;
  subtotal: number;
  lowestPriceConfigItem?: FeProductItem["configs"][0];
  couponPolicy?: FeProductItem["promotions"][0];
  promotions?: FeProductItem["promotions"];
  sellableDetails?: FeProductItem["sellableDetails"];
  durationDay?: number;
  startDate?: string;
  isLoading?: boolean;
  breakDownItems: {
    type: PassengerType;
    pricing: number;
    id: number;
    configClass: string;
  }[];
  onChangeProduct?: (value: dayjs.Dayjs | null, dateString: string) => void;
  onNext?: () => void;
  isInBookingDate: (d: Dayjs) => boolean;
  className?: string;
}
const MobileBoxSummary = ({
  lowestPrice,
  subtotal,
  breakDownItems,
  isLoading,
  couponPolicy,
  label,
  className = "",
  lowestPriceConfigItem,
  promotions,
  startDate,
  sellableDetails,
  isInBookingDate,
  onNext,
  onChangeProduct,
  durationDay,
}: Props) => {
  const t = useTranslations("String");
  const { inventories } = sellableDetails || {};
  return (
    <div
      className={classNames("mb-summary-booking", {
        [className]: className,
      })}
    >
      <MobileProductSummaryWraper
        label={label}
        productPrice={lowestPrice ?? undefined}
        openAmount={lowestPriceConfigItem?.open}
        onBookNow={onNext}
        isLoading={isLoading}
        breakDown={{
          pricingConfigs: breakDownItems,
          couponPolicy: couponPolicy && {
            code: couponPolicy.code,
            discountAmount: couponPolicy.discountAmount,
          },
          subtotal: moneyFormatVND(subtotal),
        }}
      >
        {promotions && promotions.length ? <PromotionSelector items={promotions || []} className="mb-6" /> : null}
        <CalendarSelector
          value={startDate ? stringToDate(startDate) : undefined}
          disabledDate={(date) => {
            if (isInBookingDate(date) && date.isAfter(dayjs())) {
              return false;
            }
            return true;
          }}
          onChange={onChangeProduct}
        />
        <div className="h-6"></div>
        {durationDay && (
          <div className="duration-day mb-6">
            <div className="flex items-center">
              <span className="mr-2">
                <IconCalendarDays width={20} height={20} />
              </span>
              <span>{`${durationDay} ngày ${durationDay - 1} đêm`}</span>
            </div>
          </div>
        )}
        {inventories && (
          <div className="includes mb-6">
            {inventories.map((inv) => (
              <div className="inv" key={inv.recId}>
                <div className="inv-inner">{inv.type}</div>
              </div>
            ))}
          </div>
        )}
        <div className="h-6"></div>
        <MobileBoxSummary.PassengerQuantity label={t("productSummary.passengerQuantity.title")} />
      </MobileProductSummaryWraper>
    </div>
  );
};
export default MobileBoxSummary;

interface ProductSummaryPassengerQuantityProps {
  label?: string;
}
MobileBoxSummary.PassengerQuantity = function ProductSummaryPassengerQuantity({
  label,
}: ProductSummaryPassengerQuantityProps) {
  const t = useTranslations("String");
  const passenger = useBookingSelector((state) => state.bookingPassenger);
  const { setQuantityPassenger } = useSetProductItemAndPaxQuantity();
  return (
    <div className="passengers-selection mb-4 border rounded-lg p-4 bg-white">
      <div className="label mb-6 border-b pb-3">
        <p>{label}</p>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="quantity-adult flex items-center justify-between">
          <span>{t("adult")}</span>
          <Quantity
            maximum={9}
            minimum={1}
            value={passenger["adult"]}
            onChange={(action, value) => setQuantityPassenger({ type: PassengerType.ADULT, quantity: value, action })}
          />
        </div>
        <div className="quantity-adult flex items-center justify-between">
          <span>{t("children")}</span>
          <Quantity
            maximum={9}
            minimum={0}
            value={passenger["child"]}
            onChange={(action, value) => setQuantityPassenger({ type: PassengerType.CHILD, quantity: value, action })}
          />
        </div>
        <div className="quantity-adult flex items-center justify-between">
          <span>{t("infant")}</span>
          <Quantity
            maximum={9}
            minimum={0}
            value={passenger["infant"]}
            onChange={(action, value) => setQuantityPassenger({ type: PassengerType.INFANT, quantity: value, action })}
          />
        </div>
      </div>
    </div>
  );
};
