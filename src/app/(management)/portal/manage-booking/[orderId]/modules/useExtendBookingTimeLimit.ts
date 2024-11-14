import { useExtendBookingTimeLimitMutation } from "@/mutations/managements/booking";
import { FOPFormData } from "./formOfPayment.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
export const useExtendBookingTimeLimit = () => {
  const { mutate: doExtendBookingTimeLimit } = useExtendBookingTimeLimitMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onExtendBookingTimeLimit = (
    {
      orderId,
      postponeHours,
    }: {
      orderId: number;
      postponeHours: number;
    },
    cb?: () => void,
  ) => {
    doExtendBookingTimeLimit(
      { orderId, postponeHours },
      {
        onSuccess(data, variables, context) {
          message.success("Gia hạn thanh toán thành công.");
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
          });
          cb?.();
        },
        onError(error, variables, context) {
          message.error(error.message);
          cb?.();
        },
      },
    );
  };

  return {
    onExtendBookingTimeLimit,
  };
};
