import { useBookingSelector } from "../hooks/useBooking";
import { PassengerType } from "@/models/common.interface";
import { IBookingItem } from "./bookingInformation.interface";
import { useCallback } from "react";
const useBreakDownSummary = () => {
  const { bookingInfo } = useBookingSelector();

  const bookingItemList = bookingInfo?.bookingItems || [];

  const getTourBookingPriceByPassengerType = useCallback((paxType: PassengerType) => {
    const passengerList = bookingItemList?.filter((pItem) => pItem.type === paxType) || [];
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
  }, []);

  const serviceSummaries = useCallback(() => {
    return bookingItemList.reduce<{
      [key: string]: {
        sellableDetailId: number;
        details: string;
        subTotal: number;
        totalQty: number;
        items: {
          bookingItem: IBookingItem;
          item: IBookingItem["ssr"][0];
        }[];
      };
    }>((acc, bkItem) => {
      bkItem.ssr.forEach((ssrItem) => {
        if (acc[ssrItem.sellableDetailsId]) {
          acc = {
            ...acc,
            [ssrItem.sellableDetailsId]: {
              ...acc[ssrItem.sellableDetailsId],
              subTotal: acc[ssrItem.sellableDetailsId].subTotal + ssrItem.qty * ssrItem.item[ssrItem.type],
              totalQty: acc[ssrItem.sellableDetailsId].totalQty + ssrItem.qty,
              items: [
                ...acc[ssrItem.sellableDetailsId].items,

                {
                  bookingItem: bkItem,
                  item: ssrItem,
                },
              ],
            },
          };
        } else {
          acc = {
            ...acc,
            [ssrItem.sellableDetailsId]: {
              sellableDetailId: ssrItem.sellableDetailsId,
              details: ssrItem.item.details,
              subTotal: ssrItem.qty * ssrItem.item[ssrItem.type],
              totalQty: ssrItem.qty,
              items: [
                {
                  bookingItem: bkItem,
                  item: ssrItem,
                },
              ],
            },
          };
        }
      });

      return acc;
    }, {});
  }, []);

  const getTotal = useCallback(() => {
    const tourPrices = bookingItemList.reduce((acc, bkItem) => {
      acc += bkItem.item[bkItem.type];

      const ssrItemPrice = bkItem.ssr.reduce((totalSsr, ssrItem) => {
        totalSsr += ssrItem.qty * ssrItem.item[bkItem.type];
        return totalSsr;
      }, 0);
      return acc + ssrItemPrice;
    }, 0);

    return tourPrices;
  }, []);
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
