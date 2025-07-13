"use client";
import dayjs from "dayjs";
import { getLabelHotDealIcon } from "@/constants/icons.constant";
import React, { useMemo } from "react";
import { stringToDate } from "@/utils/date";

interface TourCardBadgetPromotionProps {
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
}

const TourCardBadgetPromotion: React.FC<TourCardBadgetPromotionProps> = ({ promotion }) => {
  const { promotionLabelType, promotionLabel, promotionImage, promotionValidTo, promotionValidFrom } = promotion || {};
  const now = dayjs();
  const IconEl = getLabelHotDealIcon(promotionImage)?.icon;

  const showPromotion = useMemo(() => {
    if (!promotionValidTo || !promotionValidFrom) return false;
    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidFrom, promotionValidTo]);

  return (
    <>
      {showPromotion && promotionLabelType === "text" ? (
        <span className="absolute z-10 w-24 h-24 -top-12 -right-6 bg-rose-600 rounded-full">
          <span className="w-12 h-12 absolute left-4 bottom-0 flex items-center bg-rose-600 text-[13px] leading-[16px] rounded-full text-white text-center">
            {promotionLabel}
          </span>
        </span>
      ) : showPromotion && promotionLabelType === "image" ? (
        <span className="absolute z-10 top-1 right-1">{IconEl ? <IconEl className="w-8 h-8" /> : ""}</span>
      ) : null}
    </>
  );
};
export default TourCardBadgetPromotion;
