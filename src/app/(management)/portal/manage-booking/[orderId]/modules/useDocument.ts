import useMessage from "@/hooks/useMessage";
import { MutationOptions, useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useCreateDocumentMutation, useUpdateDocumentMutation } from "@/mutations/managements/document";
import { DocumentFormData, DocumentPayload, DocumentResponse } from "@/models/management/core/document.interface";
import { BaseResponse } from "@/models/common.interface";

export interface UseDocumentActions {
  onCreate: (
    formData: DocumentFormData,
    options?: MutationOptions<DocumentResponse, BaseResponse<null>, DocumentPayload, unknown>,
  ) => void;
  onUpdateStatus: (
    payload: { documentCheckListId: number } & Pick<DocumentFormData, "status">,
    options?: MutationOptions<DocumentResponse, BaseResponse<null>, DocumentPayload, unknown>,
  ) => void;
}
export const useDocument = (): UseDocumentActions => {
  const { mutate: createDoc } = useCreateDocumentMutation();
  const { mutate: updateDoc } = useUpdateDocumentMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onCreate: UseDocumentActions["onCreate"] = (formData, options) => {
    createDoc(formData, {
      onSuccess(data, variables, context) {
        console.log(data, variables, context);
        message.success("Tạo thành công");
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
        });
        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };
  const onUpdateStatus: UseDocumentActions["onUpdateStatus"] = (payload, options) => {
    updateDoc(payload, {
      onSuccess(data, variables, context) {
        console.log(data, variables, context);
        message.success("Cập nhật thành công");
        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_BOOKING_ORDER_DETAIL],
        });
        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  return {
    onCreate,
    onUpdateStatus,
  };
};
