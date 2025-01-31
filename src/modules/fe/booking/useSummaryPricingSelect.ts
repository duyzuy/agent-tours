import { FeProductItem } from "@/models/fe/productItem.interface";
import { PassengerType } from "@/models/common.interface";
import { useCallback, useMemo } from "react";
import { useBookingSelector } from "@/store";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";

const useSummaryPricingSelect = () => {
  const {
    bookingPassenger,
    bookingInfo: { product, couponPolicy },
  } = useBookingSelector();

  const flatAndSortConfigs = (configs: FeProductItem["configs"]) => {
    return configs
      .reduce<FeProductItem["configs"]>((sum, cur) => {
        Array.from({ length: cur.open }, (v, k) => {
          sum = [...sum, cur];
        });
        return sum;
      }, [])
      .sort((a, b) => a.adult - b.adult);
  };

  const getBreakDownProductPrice = () => {
    const pricingFlatList = flatAndSortConfigs(product?.configs || []);

    let bookingDetailItemBookedList: {
      [key in PassengerType]: PriceConfig[];
    } = { adult: [], child: [], infant: [] };

    Object.entries(bookingPassenger).forEach(([type, amount]) => {
      for (let i = 0; i < amount; i++) {
        const priceConfigItem = pricingFlatList.shift();

        bookingDetailItemBookedList[type as PassengerType] = priceConfigItem
          ? [...bookingDetailItemBookedList[type as PassengerType], priceConfigItem]
          : [...bookingDetailItemBookedList[type as PassengerType]];
      }
    });

    return bookingDetailItemBookedList;
  };

  const subtotal = useMemo(() => {
    const breakDown = getBreakDownProductPrice();

    let subtotal = 0;
    Object.entries(breakDown).forEach(([type, priceList]) => {
      priceList.forEach((configItem) => {
        subtotal += configItem[type as PassengerType];
      });
    });

    if (couponPolicy) {
      subtotal = subtotal - couponPolicy.discountAmount;
    }
    return subtotal;
  }, [couponPolicy, bookingPassenger]);

  return {
    productBreakdown: getBreakDownProductPrice(),
    subtotal,
  };
};
export default useSummaryPricingSelect;
