import { usePortalBookingManagerSelector } from "./store/context";
import { PassengerType } from "@/models/common.interface";
import { PortalBookingInformation } from "./bookingInformation.interface";
import { useCallback } from "react";

type BookingServiceItem = Exclude<PortalBookingInformation["bookingSsrWithPax"], undefined>[number];

const useBreakDownSummary = () => {
  const { bookingInfo } = usePortalBookingManagerSelector((state) => state);

  const bookingItemList = bookingInfo?.bookingItems || [];

  const bookingSsrWithPax = bookingInfo?.bookingSsrWithPax || [];

  const bookingSsr = bookingInfo?.bookingSsr || [];

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
      if (acc && acc[item.configItem.class]) {
        const newQty = acc[item.configItem.class].qty + 1;
        acc[item.configItem.class] = {
          ...acc[item.configItem.class],
          qty: newQty,
          subTotal: item.configItem[paxType] * newQty,
        };
      } else {
        acc = {
          ...acc,
          [item.configItem.class]: {
            qty: 1,
            type: paxType,
            class: item.configItem.class,
            subTotal: item.configItem[paxType],
            price: item.configItem[paxType],
          },
        };
      }
      return acc;
    }, undefined);
  }, []);

  const getSummaryServicesByPax = () => {
    const bookingSSRhasStock = bookingSsrWithPax.filter((item) => item.serviceItem.stock);
    const ssrStockGroupByService = bookingSSRhasStock.reduce<{
      [key: string]: {
        serviceItem: BookingServiceItem["serviceItem"];
        subTotal: number;
        totalQty: number;
        items: {
          bookingIndex: number;
          qty: BookingServiceItem["qty"];
          type: BookingServiceItem["type"];
          item: BookingServiceItem["configItem"];
        }[];
      };
    }>((acc, bkItem) => {
      if (bkItem.serviceItem.stock) {
        const keyService = `${bkItem.serviceItem.inventory.recId}-${bkItem.serviceItem.stock.recId}`;
        if (acc[keyService]) {
          acc = {
            ...acc,
            [keyService]: {
              ...acc[keyService],
              subTotal: acc[keyService].subTotal + bkItem.configItem[bkItem.type] * bkItem.qty,
              totalQty: acc[keyService].totalQty + bkItem.qty,
              items: [
                ...acc[keyService].items,

                {
                  bookingIndex: bkItem.bookingIndex,
                  qty: bkItem.qty,
                  type: bkItem.type,
                  item: bkItem.configItem,
                },
              ],
            },
          };
        } else {
          acc = {
            ...acc,
            [keyService]: {
              serviceItem: bkItem.serviceItem,
              subTotal: bkItem.qty * bkItem.configItem[bkItem.type],
              totalQty: bkItem.qty,
              items: [
                {
                  bookingIndex: bkItem.bookingIndex,
                  qty: bkItem.qty,
                  type: bkItem.type,
                  item: bkItem.configItem,
                },
              ],
            },
          };
        }
      }
      return acc;
    }, {});

    const bookingSSRNoStock = bookingSsrWithPax.filter((item) => !item.serviceItem.stock);
    const ssrNoStockGroupByService = bookingSSRNoStock.reduce<{
      [key: string]: {
        serviceItem: BookingServiceItem["serviceItem"];
        subTotal: number;
        totalQty: number;
        items: {
          bookingIndex: number;
          qty: BookingServiceItem["qty"];
          type: BookingServiceItem["type"];
          item: BookingServiceItem["configItem"];
        }[];
      };
    }>((acc, bkItem) => {
      if (acc[bkItem.serviceItem.inventory.recId]) {
        acc = {
          ...acc,
          [bkItem.serviceItem.inventory.recId]: {
            ...acc[bkItem.serviceItem.inventory.recId],
            subTotal: acc[bkItem.serviceItem.inventory.recId].subTotal + bkItem.configItem[bkItem.type] * bkItem.qty,
            totalQty: acc[bkItem.serviceItem.inventory.recId].totalQty + bkItem.qty,
            items: [
              ...acc[bkItem.serviceItem.inventory.recId].items,

              {
                bookingIndex: bkItem.bookingIndex,
                qty: bkItem.qty,
                type: bkItem.type,
                item: bkItem.configItem,
              },
            ],
          },
        };
      } else {
        acc = {
          ...acc,
          [bkItem.serviceItem.inventory.recId]: {
            serviceItem: bkItem.serviceItem,
            subTotal: bkItem.qty * bkItem.configItem[bkItem.type],
            totalQty: bkItem.qty,
            items: [
              {
                bookingIndex: bkItem.bookingIndex,
                qty: bkItem.qty,
                type: bkItem.type,
                item: bkItem.configItem,
              },
            ],
          },
        };
      }
      return acc;
    }, {});

    return {
      ssrStock: ssrStockGroupByService,
      ssrNoStock: ssrNoStockGroupByService,
    };
  };

  const getSummaryServicesNoPax = () => {
    const bookingSSRhasStock = bookingSsr.filter((item) => item.serviceItem.stock);
    const ssrStockGroupByService = bookingSSRhasStock.reduce<{
      [key: string]: {
        serviceItem: BookingServiceItem["serviceItem"];
        subTotal: number;
        totalQty: number;
        items: {
          qty: BookingServiceItem["qty"];
          type: BookingServiceItem["type"];
          item: BookingServiceItem["configItem"];
        }[];
      };
    }>((acc, bkItem) => {
      if (bkItem.serviceItem.stock) {
        const keyService = `${bkItem.serviceItem.inventory.recId}-${bkItem.serviceItem.stock.recId}`;
        if (acc[keyService]) {
          acc = {
            ...acc,
            [keyService]: {
              ...acc[keyService],
              subTotal: acc[keyService].subTotal + bkItem.configItem[bkItem.type] * bkItem.qty,
              totalQty: acc[keyService].totalQty + bkItem.qty,
              items: [
                ...acc[keyService].items,

                {
                  qty: bkItem.qty,
                  type: bkItem.type,
                  item: bkItem.configItem,
                },
              ],
            },
          };
        } else {
          acc = {
            ...acc,
            [keyService]: {
              serviceItem: bkItem.serviceItem,
              subTotal: bkItem.qty * bkItem.configItem[bkItem.type],
              totalQty: bkItem.qty,
              items: [
                {
                  qty: bkItem.qty,
                  type: bkItem.type,
                  item: bkItem.configItem,
                },
              ],
            },
          };
        }
      }
      return acc;
    }, {});

    const bookingSSRNoStock = bookingSsr.filter((item) => !item.serviceItem.stock);
    const ssrNoStockGroupByService = bookingSSRNoStock.reduce<{
      [key: string]: {
        serviceItem: BookingServiceItem["serviceItem"];
        subTotal: number;
        totalQty: number;
        items: {
          qty: BookingServiceItem["qty"];
          type: BookingServiceItem["type"];
          item: BookingServiceItem["configItem"];
        }[];
      };
    }>((acc, bkItem) => {
      if (acc[bkItem.serviceItem.inventory.recId]) {
        acc = {
          ...acc,
          [bkItem.serviceItem.inventory.recId]: {
            ...acc[bkItem.serviceItem.inventory.recId],
            subTotal: acc[bkItem.serviceItem.inventory.recId].subTotal + bkItem.configItem[bkItem.type] * bkItem.qty,
            totalQty: acc[bkItem.serviceItem.inventory.recId].totalQty + bkItem.qty,
            items: [
              ...acc[bkItem.serviceItem.inventory.recId].items,

              {
                qty: bkItem.qty,
                type: bkItem.type,
                item: bkItem.configItem,
              },
            ],
          },
        };
      } else {
        acc = {
          ...acc,
          [bkItem.serviceItem.inventory.recId]: {
            serviceItem: bkItem.serviceItem,
            subTotal: bkItem.qty * bkItem.configItem[bkItem.type],
            totalQty: bkItem.qty,
            items: [
              {
                qty: bkItem.qty,
                type: bkItem.type,
                item: bkItem.configItem,
              },
            ],
          },
        };
      }
      return acc;
    }, {});

    return {
      ssrStock: ssrStockGroupByService,
      ssrNoStock: ssrNoStockGroupByService,
    };
  };

  const getTotal = () => {
    const tourPrices = bookingItemList.reduce((acc, bkItem) => {
      acc += bkItem.configItem[bkItem.type];
      return acc;
    }, 0);

    const ssrSubTotalBypax = bookingSsrWithPax.reduce((acc, bkItem) => {
      acc += bkItem.configItem[bkItem.type] * bkItem.qty;
      return acc;
    }, 0);

    const ssrSubTotalNoPax = bookingSsr.reduce((acc, bkItem) => {
      acc += bkItem.configItem[bkItem.type] * bkItem.qty;
      return acc;
    }, 0);

    return tourPrices + ssrSubTotalBypax + ssrSubTotalNoPax;
  };
  return {
    tourPrices: {
      adult: getTourBookingPriceByPassengerType(PassengerType.ADULT),
      child: getTourBookingPriceByPassengerType(PassengerType.CHILD),
      infant: getTourBookingPriceByPassengerType(PassengerType.INFANT),
    },
    servicesByPax: getSummaryServicesByPax(),
    servicesNoPax: getSummaryServicesNoPax(),
    total: getTotal(),
  };
};
export default useBreakDownSummary;
