import { useTMutation } from "@/lib/reactQueryHooks";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
import { useQueryClient } from "@tanstack/react-query";
export const useSplitTwoNewBooking = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: manageBookingAPIs.splitBooking,
    onSuccess(data, variables, context) {
      message.success("Tách thành công.");
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
      });
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
