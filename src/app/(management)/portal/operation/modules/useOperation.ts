import {
  useCreateOperationMutation,
  useUpdateOperationMutation,
  useUpdateStatusOperationMutation,
} from "@/mutations/managements/operation";
import { OperationFormData } from "./operation.interface";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryCore } from "@/queries/var";
import { IOperationStatus, OperationPayload, OperationResponse } from "@/models/management/core/operation.interface";
import { BaseResponse } from "@/models/common.interface";
const useOperation = () => {
  const { mutate: create } = useCreateOperationMutation();
  const { mutate: update } = useUpdateOperationMutation();
  const { mutate: updateStatus } = useUpdateStatusOperationMutation();

  const queryClient = useQueryClient();
  const message = useMessage();
  const onCreate = (
    data: OperationFormData,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: MutateOptions<OperationResponse, BaseResponse<null>, OperationPayload, unknown>["onSuccess"];
      onError?: MutateOptions<OperationResponse, BaseResponse<null>, OperationPayload, unknown>["onError"];
    },
  ) => {
    create(data, {
      onSuccess(data, variables, context) {
        onSuccess?.(data, variables, context);
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_LIST] });
        message.success("Tạo thành công");
      },
      onError(error, variables, context) {
        onError?.(error, variables, context);
        message.error(error.message);
      },
    });
  };
  const onUpdate = (
    data: OperationFormData,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: MutateOptions<OperationResponse, BaseResponse<null>, OperationPayload, unknown>["onSuccess"];
      onError?: MutateOptions<OperationResponse, BaseResponse<null>, OperationPayload, unknown>["onError"];
    },
  ) => {
    update(data, {
      onSuccess(data, variables, context) {
        onSuccess?.(data, variables, context);
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        onError?.(error, variables, context);
        message.error(error.message);
      },
    });
  };
  const onUpdateStatus = (
    data: { id?: number; status?: IOperationStatus },
    cb?: {
      onSuccess?: MutateOptions<
        OperationResponse,
        BaseResponse<null>,
        { id?: number; status?: IOperationStatus },
        unknown
      >["onSuccess"];
      onError?: MutateOptions<
        OperationResponse,
        BaseResponse<null>,
        { id?: number; status?: IOperationStatus },
        unknown
      >["onError"];
    },
  ) => {
    const { onSuccess, onError } = cb || {};
    updateStatus(data, {
      onSuccess(data, variables, context) {
        onSuccess?.(data, variables, context);
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_LIST] });
        message.success("Cập nhật thành công");
      },
      onError(error, variables, context) {
        onError?.(error, variables, context);
        message.error(error.message);
      },
    });
  };
  return {
    onCreate,
    onUpdate,
    onUpdateStatus,
  };
};
export default useOperation;
