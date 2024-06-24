import { FeProductItem } from "@/models/fe/productItem.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";
import { PassengerType } from "@/models/common.interface";
import { useCallback } from "react";
import useMessage from "@/hooks/useMessage";
import { FeBookingInformation } from "./booking.interface";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
const useSummaryPricingSelect = () => {
    const bookingPassenger = useBookingSelector(
        (state) => state.bookingPassenger,
    );
    const product = useBookingSelector((state) => state.product);

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
            [key: string]: PriceConfig[];
        } = { adult: [], child: [], infant: [] };

        Object.entries(bookingPassenger).forEach(([type, amount]) => {
            for (let i = 0; i < amount; i++) {
                const priceConfigItem = pricingListPicker.shift();

                bookingDetailItemBookedList[type] = priceConfigItem
                    ? [...bookingDetailItemBookedList[type], priceConfigItem]
                    : [...bookingDetailItemBookedList[type]];
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
        return subtotal;
    };
    return {
        productBreakdown: getBreakDownProductPrice(),
        subtotal: getSubtotal(),
    };
};
export default useSummaryPricingSelect;
