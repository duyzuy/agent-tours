import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { updateBookingInvoice } from "@/services/fe/manageBooking";

export const useUpdateInvoice = () => {
  const message = useMessage();

  return useTMutation({
    mutationFn: updateBookingInvoice,
    onSuccess: (data, variables) => {
      message.success(`Cập nhật thành công`);
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};
