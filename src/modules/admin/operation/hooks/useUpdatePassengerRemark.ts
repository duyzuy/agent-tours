import { operationDeadlineAPIs } from "@/services/management/cores/operation";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

const useUpdateOperationDeadlineRemark = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: operationDeadlineAPIs.updateReamark,
    onSuccess(data, variables, context) {
      message.success("Cập nhật thành công");
    },
    onError(error, variables, context) {
      message.error("Cập nhật thất bại");
    },
  });
};

export default useUpdateOperationDeadlineRemark;
