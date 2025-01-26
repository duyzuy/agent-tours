import { operationDutyAPIs } from "@/services/management/cores/operation";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

const useUpdateOperationDuty = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: operationDutyAPIs.update,
    onSuccess(data, variables, context) {
      message.success("Cập nhật thành công");
    },
    onError(error, variables, context) {
      message.error("Cập nhật thất bại");
    },
  });
};

export default useUpdateOperationDuty;
