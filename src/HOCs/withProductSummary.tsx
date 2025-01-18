"use client";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import { stringToDate } from "@/utils/date";
import dayjs, { Dayjs } from "dayjs";

import { PassengerType } from "@/models/common.interface";

import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";

export interface WithProductSummaryProps {
  productList: FeProductItem[];
  productItem: FeProductItem;
  couponPolicy?: IPromotion;
}
export interface WrappedProductSummaryProps {
  lowestPrice?: number;
  subtotal: number;
  lowestPriceConfigItem?: PriceConfig;
  durationDay: number;
  breakDownItems: {
    type: PassengerType;
    pricing: number;
    id: number;
    configClass: string;
  }[];
  couponPolicy?: IPromotion;
  productItem: FeProductItem;
  onChangeProduct?: (value: dayjs.Dayjs | null, dateString: string) => void;
  onNext?: () => void;
  isInBookingDate: (d: Dayjs) => boolean;
}
const withProductSummary = (
  WrappedComponent: React.ElementType<WrappedProductSummaryProps>,
  { productItem, productList, couponPolicy }: WithProductSummaryProps,
) => {
  return function WithProductSummary(props: any) {
    console.log(props);
    console.log({ productItem, productList });

    const { productBreakdown, subtotal } = useSummaryPricingSelect();

    const { sellableDetails, startDate, endDate } = productItem || {};

    const departureDates = productList?.reduce<{ departDate: string }[]>((acc, item) => {
      return [...acc, { departDate: item.startDate }];
    }, []);

    const lowestPrice = useMemo(() => {
      if (!productItem) return;
      const { configs } = productItem;
      if (!configs || !configs.length) return;
      let minPrice: number | undefined;
      configs.forEach((item) => {
        if (!minPrice && item.open > 0) {
          minPrice = item.adult;
        }
        if (minPrice && item.open > 0 && item.adult < minPrice) {
          minPrice = item.adult;
        }
      });
      return minPrice;
    }, [productItem]);

    const lowestPriceConfigItem = useMemo(() => {
      let minConfig: FeProductItem["configs"][0] | undefined;
      productItem?.configs.forEach((item) => {
        if (!minConfig) {
          minConfig = item;
        } else {
          if (item.open > 0 && item.adult < minConfig.adult) {
            minConfig = item;
          }
        }
      });

      return minConfig;
    }, [productItem]);

    const durationDay = useMemo(() => {
      const dayNum = stringToDate(endDate)?.diff(stringToDate(startDate), "days");
      return dayNum;
    }, [startDate, endDate]);

    const isInBookingDate = useCallback(
      (d: Dayjs) => {
        return departureDates?.some((item) => {
          return d.isSame(stringToDate(item.departDate), "date");
        });
      },
      [departureDates],
    );

    const breakDownItems = useMemo(() => {
      return Object.entries(productBreakdown).reduce<
        {
          type: PassengerType;
          pricing: number;
          id: number;
          configClass: string;
        }[]
      >((acc, [type, configList]) => {
        const items = configList.map((configItem, _index) => ({
          type: type as PassengerType,
          pricing: configItem[type as PassengerType],
          id: configItem.recId,
          configClass: configItem.class,
        }));
        acc = [...acc, ...items];
        return acc;
      }, []);
    }, [productBreakdown]);

    return (
      <div className="with-product-summary">
        <WrappedComponent
          {...props}
          lowestPrice={lowestPrice}
          subtotal={subtotal}
          lowestPriceConfigItem={lowestPriceConfigItem}
          durationDay={durationDay}
          breakDownItems={breakDownItems}
          couponPolicy={couponPolicy}
          productItem={productItem}
          isInBookingDate={isInBookingDate}
        />
      </div>
    );
  };
};
export default withProductSummary;
