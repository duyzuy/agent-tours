import { operationDutyAPIs } from "@/services/management/cores/operation";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
const useDeleteOperationDuty = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: operationDutyAPIs.delete,
    onSuccess(data, variables, context) {
      message.success("Xoá thành công");
      queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_STATUS] });
    },
    onError(error, variables, context) {
      message.error("Cập nhật thất bại");
    },
  });
};

export default useDeleteOperationDuty;
