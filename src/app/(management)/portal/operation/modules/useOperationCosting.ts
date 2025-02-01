import {
  useCreateOperationCostingMutation,
  useDeleteOperationCostingMutation,
} from "@/mutations/managements/operation";

import { OperationCostingFormData } from "./operation.interface";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";

const useOperationCosting = () => {
  const { mutate: createCosting } = useCreateOperationCostingMutation();
  const { mutate: deleteCosting } = useDeleteOperationCostingMutation();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreateCosting = (data: OperationCostingFormData, cb?: () => void) => {
    createCosting(data, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Tạo thành công");
      },
      onError(error, variables, context) {
        console.log(data);
        message.error(error.message);
      },
    });
  };
  const onDeleteCosting = (costingId?: number, cb?: () => void) => {
    deleteCosting(costingId, {
      onSuccess(data, variables, context) {
        cb?.();
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_COSTING_LIST] });
        message.success("Xoá thành công");
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };
  return {
    onCreate: onCreateCosting,
    onDelete: onDeleteCosting,
  };
};
export default useOperationCosting;
