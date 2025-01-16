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
  const onCreate = (data: OperationDeadlineFormData, cb?: () => void) => {
    createOperation(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_THING_TODO_LIST] });
        message.success("Tạo thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  const onUpdate = (data: OperationDeadlineFormData, cb?: () => void) => {
    updateOperation(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_THING_TODO_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  const onApproval = (data: OperationDeadlineFormData, cb?: () => void) => {
    updateOperation(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_THING_TODO_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  return {
    onCreate,
    onUpdate,
  };
};
export default useOperationDeadline;
