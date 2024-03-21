import { useBookingSelector } from "../hooks/useBooking";
import { PassengerType } from "@/models/management/common.interface";
import {
    IBookingItem,
    IPricingBookingItem,
} from "./bookingInformation.interface";
const useBreakDownSummary = () => {
    const { bookingInfo } = useBookingSelector();

    const bookingItemList = bookingInfo?.bookingItems || [];

    const getTourBookingPriceByPassengerType = (paxType: PassengerType) => {
        const passengerList =
            bookingItemList?.filter((pItem) => pItem.type === paxType) || [];
        return passengerList.reduce<
            | {
                  [key: string]: {
                      qty: number;
                      type: PassengerType;
                      price: number;
                      class: string;
                      subTotal: number;
                  };
              }
            | undefined
        >((acc, item) => {
            if (acc && acc[item.item.class]) {
                const newQty = acc[item.item.class].qty + 1;
                acc[item.item.class] = {
                    ...acc[item.item.class],
                    qty: newQty,
                    subTotal: item.item[paxType] * newQty,
                };
            } else {
                acc = {
                    ...acc,
                    [item.item.class]: {
                        qty: 1,
                        type: paxType,
                        class: item.item.class,
                        subTotal: item.item[paxType],
                        price: item.item[paxType],
                    },
                };
            }
            return acc;
        }, undefined);
    };

    const serviceSummaries = () => {
        const allSerViceObBookingList = bookingItemList.reduce<
            IPricingBookingItem[]
        >((acc, bkItem) => {
            acc = [...acc, ...bkItem.ssr];
            return acc;
        }, []);

        const servicesByGroupServiceName = allSerViceObBookingList.reduce<
            | {
                  [key: string]: {
                      name: string;
                      sellableDetailId: number;
                      items: IPricingBookingItem[];
                      qty: number;
                      subtotal: number;
                  };
              }
            | undefined
        >((acc, pricingItem) => {
            if (acc && acc[pricingItem.sellableDetailsId]) {
                acc = {
                    ...acc,
                    [pricingItem.sellableDetailsId]: {
                        ...acc[pricingItem.sellableDetailsId],
                        qty:
                            pricingItem.qty +
                            acc[pricingItem.sellableDetailsId].qty,
                        items: [
                            ...acc[pricingItem.sellableDetailsId].items,
                            pricingItem,
                        ],
                        subtotal:
                            acc[pricingItem.sellableDetailsId].subtotal +
                            pricingItem["qty"] *
                                pricingItem["item"][pricingItem.type],
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [pricingItem.sellableDetailsId]: {
                        name: pricingItem.item.details,
                        sellableDetailId: pricingItem.sellableDetailsId,
                        qty: pricingItem.qty,
                        items: [pricingItem],
                        subtotal:
                            pricingItem["qty"] *
                            pricingItem["item"][pricingItem.type],
                    },
                };
            }
            return acc;
        }, undefined);

        return servicesByGroupServiceName;
    };

    const getTotal = () => {
        const tourPrices = bookingItemList.reduce((acc, bkItem) => {
            acc += bkItem.item[bkItem.type];

            const ssrItemPrice = bkItem.ssr.reduce((totalSsr, ssrItem) => {
                totalSsr += ssrItem.qty * ssrItem.item[bkItem.type];
                return totalSsr;
            }, 0);
            return acc + ssrItemPrice;
        }, 0);

        return tourPrices;
    };
    return {
        tourPrices: {
            adult: getTourBookingPriceByPassengerType(PassengerType.ADULT),
            child: getTourBookingPriceByPassengerType(PassengerType.CHILD),
            infant: getTourBookingPriceByPassengerType(PassengerType.INFANT),
        },
        services: serviceSummaries(),
        total: getTotal(),
    };
};
export default useBreakDownSummary;
