import { operationDeadlineAPIs } from "@/services/management/cores/operation";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";

const useUpdateOperationDeadlineRemark = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: operationDeadlineAPIs.updateReamark,
    onSuccess(data, variables, context) {
      message.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_STATUS] });
    },
    onError(error, variables, context) {
      message.error("Cập nhật thất bại");
    },
  });
};

export default useUpdateOperationDeadlineRemark;
