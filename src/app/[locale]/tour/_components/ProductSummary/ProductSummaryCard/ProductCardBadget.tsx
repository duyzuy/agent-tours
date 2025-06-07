import { getLabelHotDealIcon } from "@/constants/icons.constant";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import { memo, useMemo } from "react";
import dayjs from "dayjs";
import { stringToDate } from "@/utils/date";

const ProductCardBadget: ProductSummaryCardCompound["Badget"] = ({ className }) => {
  const { promotion } = useProductSummaryCard();
  const { promotionLabelType, promotionLabel, promotionImage, promotionValidFrom, promotionValidTo } = promotion || {};
  const IconEl = getLabelHotDealIcon(promotionImage ?? "");

  const isOnPromotion = useMemo(() => {
    const now = dayjs();
    if (!promotionValidTo || !promotionValidFrom) return false;

    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidFrom, promotionValidTo]);

  if (isOnPromotion && promotionLabelType === "text") {
    return (
      <span className="absolute z-10 w-24 h-24 -top-12 -right-6 bg-rose-600 rounded-full">
        <span className="w-12 h-12 absolute left-4 bottom-0 flex items-center text-[13px] leading-[16px] text-white text-center">
          {promotionLabel}
        </span>
      </span>
    );
  }
  if (isOnPromotion && promotionLabelType === "image") {
    return IconEl ? (
      <span className="absolute z-10 top-1 right-1">{<IconEl.icon width={32} height={32} />}</span>
    ) : null;
  }

  return null;
};
export default memo(ProductCardBadget);
