import { manageBookingAPIs } from "@/services/management/booking/manageBooking";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useTMutation } from "@/lib/reactQueryHooks";

const useUpdatePassengerInformation = () => {
  const queryClient = useQueryClient();
  const mesage = useMessage();
  return useTMutation({
    mutationFn: manageBookingAPIs.updatePassengerInformation,
    onSuccess(data, variables, context) {
      mesage.success("Cập nhật thành công");
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables?.bookingOrderId) }],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
      });
    },
    onError(error, variables, context) {
      mesage.error(error.message);
    },
  });
};
export default useUpdatePassengerInformation;
