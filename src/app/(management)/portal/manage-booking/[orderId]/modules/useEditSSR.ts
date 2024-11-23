import useMessage from "@/hooks/useMessage";
import { BaseResponse } from "@/models/common.interface";
import {
  AddNewSSRByPaxPayload,
  AddNewSSRNoPaxPayload,
  DeleteSSRPayload,
  IOrderDetailRs,
} from "@/models/management/booking/order.interface";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import {
  useAddSSRNoPassengerMutation,
  useAddSSRByPassengerMutation,
  useDeleteSSRMutation,
} from "@/mutations/managements/booking";
import { queryCore } from "@/queries/var";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { EditBookingSSRByPassenger, EditBookingSSRNoPassenger } from "./manageBooking.interface";

export type UseEditSSR = {
  onAddSSRByPax: (
    data: EditBookingSSRByPassenger,
    options?: MutateOptions<IOrderDetailRs, BaseResponse<null>, AddNewSSRByPaxPayload, unknown>,
  ) => void;
  onAddSSRNoPax: (
    payload: EditBookingSSRNoPassenger,
    options?: MutateOptions<IOrderDetailRs, BaseResponse<null>, AddNewSSRNoPaxPayload, unknown>,
  ) => void;
  onDeleteSSR: (
    payload: DeleteSSRPayload,
    options?: MutateOptions<IOrderDetailRs, BaseResponse<null>, DeleteSSRPayload, unknown>,
  ) => void;
};

const useEditSSR = () => {
  const { mutate: addSSRNoPax, isPending: loaddingAddNoPax } = useAddSSRNoPassengerMutation();
  const { mutate: addSSRByPax, isPending: loadingAddByPax } = useAddSSRByPassengerMutation();
  const { mutate: deleteSSR, isPending: loadingDelete } = useDeleteSSRMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onAddSSRByPax: UseEditSSR["onAddSSRByPax"] = (data, options) => {
    let payload: AddNewSSRByPaxPayload = { bookingOrderId: data.bookingOrderId };

    const ssrList = data.ssrList.reduce<Exclude<AddNewSSRByPaxPayload["ssrList"], undefined>>((acc, ssrItem) => {
      const paxIndex = acc.findIndex((sumItem) => sumItem.paxId === ssrItem.paxId);

      if (paxIndex !== -1) {
        acc.splice(paxIndex, 1, {
          ...acc[paxIndex],
          newSSR: [
            ...(acc[paxIndex].newSSR || []),
            {
              sellableConfigId: ssrItem.configItem.recId,
              qty: ssrItem.qty,
              amount: ssrItem.amount,
              type: ssrItem.type,
            },
          ],
        });
      } else {
        acc = [
          ...acc,
          {
            paxId: ssrItem.paxId,
            newSSR: [
              {
                sellableConfigId: ssrItem.configItem.recId,
                qty: ssrItem.qty,
                amount: ssrItem.amount,
                type: ssrItem.type,
              },
            ],
          },
        ];
      }
      return acc;
    }, []);

    addSSRByPax(
      {
        ...payload,
        ssrList: ssrList,
      },
      {
        onSuccess(data, variables, context) {
          message.success("Thêm dịch vụ thành công.");
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
          });

          options?.onSuccess?.(data, variables, context);
        },
        onError(error, variables, context) {
          message.error(error.message);
          options?.onError?.(error, variables, context);
        },
      },
    );
  };

  const onAddSSRNoPax: UseEditSSR["onAddSSRNoPax"] = (data, options) => {
    let payload: AddNewSSRNoPaxPayload = { bookingOrderId: data.bookingOrderId };

    const ssrList = data.ssrList.reduce<Exclude<AddNewSSRNoPaxPayload["newSSR"], undefined>>((acc, ssrItem) => {
      return [
        ...acc,
        { sellableConfigId: ssrItem.configItem.recId, qty: ssrItem.qty, type: ssrItem.type, amount: ssrItem.amount },
      ];
    }, []);

    addSSRNoPax(
      { ...payload, newSSR: ssrList },
      {
        onSuccess(data, variables, context) {
          message.success("Thêm dịch vụ thành công.");
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
          });

          options?.onSuccess?.(data, variables, context);
        },
        onError(error, variables, context) {
          message.error(error.message);
          options?.onError?.(error, variables, context);
        },
      },
    );
  };

  const onDeleteSSR: UseEditSSR["onDeleteSSR"] = (payload, options) => {
    deleteSSR(payload, {
      onSuccess(data, variables, context) {
        message.success("Xoá dịch vụ thành công.");
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
        });

        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };
  return {
    onAddSSRNoPax,
    onAddSSRByPax,
    onDeleteSSR,
    loaddingAddNoPax,
    loadingAddByPax,
    loadingDelete,
  };
};
export default useEditSSR;
