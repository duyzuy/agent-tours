import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useTMutation } from "@/lib/reactQueryHooks";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";

export const useDeleteFormOfPayment = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useTMutation({
    mutationFn: formOfPaymentAPIs.delete,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
      });
      message.success("Xoá thành công.");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
