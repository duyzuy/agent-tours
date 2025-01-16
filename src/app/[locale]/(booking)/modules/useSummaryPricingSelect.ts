import { FeProductItem } from "@/models/fe/productItem.interface";
import { PassengerType } from "@/models/common.interface";
import { useCallback } from "react";
import { useBookingSelector } from "@/store/hooks";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";

const useSummaryPricingSelect = () => {
  const {
    bookingPassenger,
    bookingInfo: { product, couponPolicy },
  } = useBookingSelector((state) => state);

  const getProductFlatPricings = useCallback(() => {
    let items: FeProductItem["configs"] = [];
    product?.configs.forEach((configItem) => {
      Array.from({ length: configItem.open }, (v, k) => {
        items = [...items, configItem];
      });
    });
    return items.sort((a, b) => a.adult - b.adult);
  }, [product]);

  const getBreakDownProductPrice = () => {
    let pricingListPicker = getProductFlatPricings();

    let bookingDetailItemBookedList: {
      [key in PassengerType]: PriceConfig[];
    } = { adult: [], child: [], infant: [] };

    Object.entries(bookingPassenger).forEach(([type, amount]) => {
      for (let i = 0; i < amount; i++) {
        const priceConfigItem = pricingListPicker.shift();

        bookingDetailItemBookedList[type as PassengerType] = priceConfigItem
          ? [...bookingDetailItemBookedList[type as PassengerType], priceConfigItem]
          : [...bookingDetailItemBookedList[type as PassengerType]];
      }
    });

    return bookingDetailItemBookedList;
  };

  const getSubtotal = () => {
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
  };
  return {
    productBreakdown: getBreakDownProductPrice(),
    subtotal: getSubtotal(),
  };
};
export default useSummaryPricingSelect;
