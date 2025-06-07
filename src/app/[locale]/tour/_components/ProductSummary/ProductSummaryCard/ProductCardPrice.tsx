import { useTranslations } from "next-intl";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import { ProductSummaryCardNoPrice, ProductSummaryCardWithPrice } from "./ProductSummaryPrice";

import { memo, useMemo } from "react";
import dayjs from "dayjs";
import { stringToDate } from "@/utils/date";

const ProductCardPrice: ProductSummaryCardCompound["Price"] = ({ className }) => {
  const { productItem, promotion } = useProductSummaryCard();
  const t = useTranslations("String");
  const isOnPromotion = useMemo(() => {
    const now = dayjs();
    if (
      !promotion ||
      !promotion.promotionValidFrom ||
      !promotion.promotionValidTo ||
      now.isBefore(stringToDate(promotion.promotionValidFrom)) ||
      now.isAfter(stringToDate(promotion.promotionValidTo))
    )
      return false;

    return true;
  }, [promotion]);

  const lowestConfig = useMemo(() => {
    if (!productItem || !productItem.configs || !productItem.configs.length) return;

    const { configs } = productItem;

    let lowestItem = configs[0];

    configs.forEach((item) => {
      if (lowestItem.open <= 0) {
        lowestItem = item;
      }
      if (lowestItem.open <= 0 && item.open > 0) {
        lowestItem = item;
      }
      if (item.open > 0 && item.adult < lowestItem.adult) {
        lowestItem = item;
      }
    });
    return lowestItem;
  }, [productItem]);

  return (
    <>
      {lowestConfig ? (
        <ProductSummaryCardWithPrice
          price={lowestConfig.adult}
          referencePrice={isOnPromotion ? promotion?.promotionReferencePrice : undefined}
          subText={t("justFrom")}
          note={t("productSummary.amountRemain", {
            amount: lowestConfig.open,
          })}
          className={className}
        />
      ) : (
        <ProductSummaryCardNoPrice
          label={t("card.contact")}
          description={t("productSummary.emptyPrices")}
          className={className}
        />
      )}
    </>
  );
};

export default memo(ProductCardPrice);
