import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useTMutation } from "@/lib/reactQueryHooks";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";

export const useExtendBookingTimeLimit = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useTMutation({
    mutationFn: manageBookingAPIs.extendBookingTimeLimit,
    onSuccess(data, variables, context) {
      message.success("Gia hạn thanh toán thành công.");
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
      });
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
