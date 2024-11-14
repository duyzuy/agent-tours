import { useSelectorManageBooking } from "../../hooks/useManageBooking";
import { useState, useMemo } from "react";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PassengerType } from "@/models/common.interface";
const useSummaryBookingOrder = () => {
  const [orderSummary, setOrderSummary] = useState({});
  const orderDetail = useSelectorManageBooking((state) => state.order);
  const { bookingOrder } = orderDetail || {};
  const ssrEditting = useSelectorManageBooking((state) => state.editSSROrder);

  const totalAmountNewOrder = useMemo(() => {
    const { totalAmount } = bookingOrder || {};

    let newTotalAmount = totalAmount || 0;

    if (ssrEditting.bookingDetails) {
      const totalAddNew = Object.entries(ssrEditting.bookingDetails).reduce((subtotal, [key, value]) => {
        const totalPaxOfsv = value.items.reduce((totalAmountItem, curent) => {
          const totalOfpax = curent.ssr.reduce((ssrTotal, ssrItem) => {
            return (ssrTotal += ssrItem.priceConfig[ssrItem.type] * ssrItem.quantity);
          }, 0);
          return (totalAmountItem += totalOfpax);
        }, 0);
        return (subtotal += totalPaxOfsv);
      }, 0);
      newTotalAmount += totalAddNew;
    }

    const totalAmountRemove = ssrEditting.bookingSsrDelete.reduce((acc, item) => {
      return (acc += item.amount);
    }, 0);

    return newTotalAmount - totalAmountRemove;
  }, [bookingOrder, ssrEditting.bookingSsrDelete]);

  const totalAmountNeedToPay = useMemo(() => {
    if (!bookingOrder?.totalAmount) return 0;
    return totalAmountNewOrder - bookingOrder.totalPaid;
  }, [totalAmountNewOrder, bookingOrder]);

  //   const groupingServices = useMemo(() => {
  //     type GroupServiceItemType = {
  //       serviceId: number;
  //       serviceName: string;
  //       items: {
  //         amount: number;
  //         type: PassengerType;
  //         class: string;
  //         quantity: number;
  //       }[];
  //     };
  //     const { bookingSsrDelete, bookingDetails } = ssrEditting;
  //     let totalItemsUpdated: { [key: string]: GroupServiceItemType } | undefined;
  //     /**
  //      *
  //      * Get serrvice items booked from currrent order
  //      */
  //     totalItemsUpdated = orderDetail?.ssr?.reduce<{
  //       [key: string]: GroupServiceItemType;
  //     }>((acc, { booking }) => {
  //       const detailsId = booking.config.sellableDetailsId;

  //       if (acc[detailsId]) {
  //         /**
  //          * Check items in list remove
  //          */
  //         const newItems = bookingSsrDelete.some((itemDelete) => itemDelete.recId === booking.recId)
  //           ? [...acc[detailsId].items]
  //           : [
  //               ...acc[detailsId].items,
  //               {
  //                 amount: booking.amount,
  //                 type: booking.type,
  //                 quantity: 1,
  //                 class: booking.class,
  //               },
  //             ];

  //         acc = {
  //           ...acc,
  //           [detailsId]: {
  //             ...acc[detailsId],
  //             items: newItems,
  //           },
  //         };
  //       } else {
  //         const item = bookingSsrDelete.some((itemDelete) => itemDelete.recId === booking.recId)
  //           ? undefined
  //           : {
  //               amount: booking.amount,
  //               type: booking.type,
  //               quantity: 1,
  //               class: booking.class,
  //             };
  //         acc = {
  //           ...acc,
  //           [detailsId]: {
  //             serviceId: detailsId,
  //             serviceName: booking.config.details,
  //             items: item ? [item] : [],
  //           },
  //         };
  //       }

  //       return acc;
  //     }, {});

  //     /**
  //      * Check item in list add more
  //      */
  //     if (bookingDetails) {
  //       Object.entries(bookingDetails).reduce<{
  //         [key: string]: GroupServiceItemType;
  //       }>((acc, [key, values]) => {
  //         const listItemNew = values.items.reduce<
  //           {
  //             amount: number;
  //             type: PassengerType;
  //             class: string;
  //             quantity: number;
  //           }[]
  //         >((acc, item) => {
  //           const arrItems = item.ssr.reduce<
  //             {
  //               amount: number;
  //               type: PassengerType;
  //               class: string;
  //               quantity: number;
  //             }[]
  //           >((accSSR, ssrItem) => {
  //             const flatArrItem = Array.from({
  //               length: ssrItem.quantity,
  //             }).map((key) => ({
  //               amount: ssrItem.priceConfig[ssrItem.type],
  //               type: ssrItem.type,
  //               class: ssrItem.priceConfig.class,
  //               quantity: 1,
  //             }));
  //             return [...accSSR, ...flatArrItem];
  //           }, []);

  //           return [...acc, ...arrItems];
  //         }, []);

  //         if (totalItemsUpdated?.[values.serviceId]) {
  //           if (values.items.length) {
  //             totalItemsUpdated = {
  //               ...totalItemsUpdated,
  //               [values.serviceId]: {
  //                 ...totalItemsUpdated[values.serviceId],
  //                 items: [...totalItemsUpdated[values.serviceId].items, ...listItemNew],
  //               },
  //             };
  //           }
  //         } else {
  //           totalItemsUpdated = {
  //             ...totalItemsUpdated,
  //             [values.serviceId]: {
  //               serviceId: values.serviceId,
  //               items: [...listItemNew],
  //               serviceName: values.items[0].ssr[0].priceConfig.details,
  //             },
  //           };
  //         }

  //         return acc;
  //       }, {});
  //     }

  //     return totalItemsUpdated;
  //   }, [orderDetail]);

  return {
    groupingServices: undefined,
    subTotal: {
      totalAmountNeedToPay: totalAmountNeedToPay,
      totalAmountNewOrder: totalAmountNewOrder,
      totalAmountOldOrder: bookingOrder?.totalAmount,
      totalPaid: bookingOrder?.totalPaid,
      totalCharge: bookingOrder?.charge,
      extraPrice: bookingOrder?.extraPrice,
    },
  };
};
export default useSummaryBookingOrder;
