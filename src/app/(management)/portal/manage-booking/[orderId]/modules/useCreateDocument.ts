import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useTMutation } from "@/lib/reactQueryHooks";
import { documentAPIs } from "@/services/management/cores/document";

export const useCreateDocument = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useTMutation({
    mutationFn: documentAPIs.create,
    onSuccess(data, variables, context) {
      message.success("Tạo thành công");
      queryClient.invalidateQueries({
        queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
      });
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
