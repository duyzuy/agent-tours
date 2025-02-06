import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useTMutation } from "@/lib/reactQueryHooks";
import { queryCore } from "@/queries/var";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";

const useUpdateCustomerInfo = () => {
  const queryClient = useQueryClient();
  const mesage = useMessage();
  return useTMutation({
    mutationFn: manageBookingAPIs.updateCustomer,
    onSuccess(data, variables, context) {
      mesage.success("Cập nhật thành công.");

      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables?.bookingOrder?.recId) }],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_LIST],
      });
    },
    onError(error, variables, context) {
      console.log(error);
      mesage.error(error.message);
    },
  });
};
export default useUpdateCustomerInfo;
