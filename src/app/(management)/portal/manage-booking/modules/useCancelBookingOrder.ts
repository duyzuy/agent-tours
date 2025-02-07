import useMessage from "@/hooks/useMessage";
import { useTMutation } from "@/lib/reactQueryHooks";
import { manageBookingAPIs } from "@/services/management/booking/manageBooking";

const useCancelBookingOrder = () => {
  const message = useMessage();

  return useTMutation({
    mutationFn: manageBookingAPIs.cancelBookingOrder,
    onSuccess(data, variables, context) {
      message.success("Huỷ tour thành công.");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
export default useCancelBookingOrder;
