import { useState } from "react";
import { useUpdateSSRByPassengerMutation } from "@/mutations/managements/booking";

import { IEditOrderSSRPayload, ManageBookingDetail } from "../../modules/manageBooking.interface";

import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
import { useSelectorManageBooking } from "../../hooks/useManageBooking";
import { useRouter } from "next/navigation";
const useUpdateSSROrder = () => {
  const { mutate: doUpdate } = useUpdateSSRByPassengerMutation();
  const [isLoading, setLoading] = useState(false);
  const message = useMessage();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { order, editSSROrder } = useSelectorManageBooking((state) => state);

  const onUpdateSSRByPax = () => {
    const payloadData = transformToPayloadData({
      bookingDetails: editSSROrder.bookingDetails,
      bookingSsrDelete: editSSROrder.bookingSsrDelete,
      orderId: order?.bookingOrder.recId,
    });
    setLoading(true);
    doUpdate(payloadData, {
      onSuccess(data, variables, context) {
        router.push(`./portal/manage-booking/${variables.bookingOrder?.recId}/addon-service/reservation`);
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables.bookingOrder?.recId) }],
        });
        setLoading(false);
      },
      onError(error, variables, context) {
        message.error(error.message);
        setLoading(false);
      },
    });
  };

  const transformToPayloadData = (
    bookingSSRData: ManageBookingDetail["editSSROrder"] & {
      orderId?: number;
    },
  ): IEditOrderSSRPayload => {
    const { bookingDetails, bookingSsrDelete, orderId } = bookingSSRData;

    let payloadData: IEditOrderSSRPayload = {
      bookingOrder: {
        recId: orderId,
      },
      bookingDetails: [],
      bookingSsrDelete: [],
    };

    if (bookingDetails) {
      let bookingDetailsPayload: Required<IEditOrderSSRPayload>["bookingDetails"] = [];
      Object.entries(bookingDetails).forEach(([key, svItem], _index) => {
        svItem.items.forEach((bkSSRItem) => {
          const indexBookingItem = bookingDetailsPayload.findIndex(
            (item) => item.booking.recId === bkSSRItem.booking.recId,
          );

          const correctSSRLists = bkSSRItem.ssr.reduce<(typeof bookingDetailsPayload)[0]["booking"]["ssr"]>(
            (acc, item) => {
              acc = [
                ...acc,
                {
                  sellableConfigId: item.priceConfig.recId,
                  qty: item.quantity,
                  type: item.type,
                  amount: item.priceConfig[item.type],
                },
              ];
              return acc;
            },
            [],
          );

          /**
           * if exists index booking item
           */

          if (indexBookingItem !== -1) {
            const bookingItem = bookingDetailsPayload[indexBookingItem];

            bookingDetailsPayload.splice(indexBookingItem, 1, {
              booking: {
                recId: bkSSRItem.booking.recId,
                bookingRefId: bkSSRItem.booking.bookingRefId,
                ssr: [...bookingDetailsPayload[indexBookingItem].booking.ssr, ...correctSSRLists],
              },
            });
          } else {
            bookingDetailsPayload = [
              ...bookingDetailsPayload,
              {
                booking: {
                  recId: bkSSRItem.booking.recId,
                  bookingRefId: bkSSRItem.booking.bookingRefId,
                  ssr: [...correctSSRLists],
                },
              },
            ];
          }
        });
      });
      payloadData = {
        ...payloadData,
        bookingDetails: bookingDetailsPayload,
      };
    }
    if (bookingSsrDelete && bookingSsrDelete.length) {
      let bookingRemoveItems: Required<IEditOrderSSRPayload>["bookingSsrDelete"] = [];
      bookingSsrDelete.forEach((bkSSRItemRemove) => {
        bookingRemoveItems = [
          ...bookingRemoveItems,
          {
            bookingId: bkSSRItemRemove.recId,
            sellableConfigId: bkSSRItemRemove.config.recId,
          },
        ];
      });

      payloadData = {
        ...payloadData,
        bookingSsrDelete: bookingRemoveItems,
      };
    }

    return payloadData;
  };

  return { onUpdateSSRByPax, isLoading };
};
export default useUpdateSSROrder;
