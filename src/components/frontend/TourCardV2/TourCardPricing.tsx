"use client";
import dayjs from "dayjs";
import { useMemo } from "react";
import { stringToDate } from "@/utils/date";
import classNames from "classnames";
import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";

export type TourCardPricingProps = {
  className?: string;
  promotion:
    | {
        promotionImage?: string;
        promotionLabel?: string;
        promotionLabelType?: "text" | "image" | "";
        promotionReferencePrice?: number;
        promotionValidFrom?: string;
        promotionValidTo?: string;
      }
    | undefined;
  price: number | undefined;
};
const TourCardPricing: React.FC<TourCardPricingProps> = ({ className = "", promotion, price }) => {
  const t = useTranslations("String");

  const { promotionValidTo, promotionValidFrom, promotionReferencePrice } = promotion || {};
  const now = dayjs();

  const showPromotion = useMemo(() => {
    if (!promotionValidTo || !promotionValidFrom) return false;
    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidTo, promotionValidFrom]);

  return (
    <div
      className={classNames("price no-price", {
        [className]: className,
      })}
    >
      {!price ? (
        <p className="text-[16px] lg:text-lg">{t("card.contact")}</p>
      ) : promotionReferencePrice && promotionReferencePrice > price && showPromotion ? (
        <>
          <span className="text-red-600 text-[16px] lg:text-lg font-[500] block">{moneyFormatVND(price)}</span>
          <span className="line-through text-[12px] lg:text-[14px] opacity-60 block">
            {moneyFormatVND(promotionReferencePrice)}
          </span>
        </>
      ) : (
        <p className="text-red-600 text-[16px] lg:text-lg font-[500]">{moneyFormatVND(price)}</p>
      )}
    </div>
  );
};
export default TourCardPricing;
