import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useTMutation } from "@/lib/reactQueryHooks";
import { formOfPaymentAPIs } from "@/services/management/cores/formOfPayment";

export const useApprovalFormOfpayment = () => {
  const queryClient = useQueryClient();
  const message = useMessage();
  return useTMutation({
    mutationFn: formOfPaymentAPIs.approval,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
      });
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_FORM_OF_PAYMENT_LIST],
      });
      message.success("Duyệt thành công");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
