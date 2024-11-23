import { useUpdateBookingOrderInvoiceInfoMutation } from "@/mutations/managements/booking";
import { BookingOrderInvoiceFormData } from "./bookingOrder.interface";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";

const useUpdateInvoiceInfo = () => {
  const { mutate: makeUpdate } = useUpdateBookingOrderInvoiceInfoMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onUpdate = (formData: BookingOrderInvoiceFormData, cb?: () => void) => {
    makeUpdate(
      { bookingOrder: formData },
      {
        onSuccess(data, variables, context) {
          message.success("Cập nhật thành công.");
          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL, { recId: Number(variables.bookingOrder?.recId) }],
          });
          cb?.();
        },
        onError(error, variables, context) {
          console.log(error);
          message.error(error.message);
        },
      },
    );
  };
  return {
    onUpdate,
  };
};
export default useUpdateInvoiceInfo;
