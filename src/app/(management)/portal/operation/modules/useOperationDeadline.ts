import {
  useCreateOperationDeadlineMutation,
  useUpdateOperationDeadlineMutation,
} from "@/mutations/managements/operation";

import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
import { OperationDeadlineFormData } from "./operation.interface";
const useOperationDeadline = () => {
  const { mutate: createOperation } = useCreateOperationDeadlineMutation();
  const { mutate: updateOperation } = useUpdateOperationDeadlineMutation();

  const queryClient = useQueryClient();
  const message = useMessage();
  const onCreateOperation = (data: OperationDeadlineFormData, cb?: () => void) => {
    createOperation(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST] });
        message.success("Tạo thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  const onUpdateOperation = (data: OperationDeadlineFormData, cb?: () => void) => {
    updateOperation(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  return {
    onCreate: onCreateOperation,
    onUpdate: onUpdateOperation,
  };
};
export default useOperationDeadline;
