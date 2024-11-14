import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";

import { useRouter } from "next/navigation";

import { MiscDocumentFormData } from "./miscDocument.interface";
import {
  useCreateMiscDocumentMutation,
  useUpdateMiscDocumentMutation,
  useDeleteMiscDocumentMutation,
} from "@/mutations/managements/document";

const useCRUDMiscDocument = () => {
  const { mutate: makeCreate } = useCreateMiscDocumentMutation();
  const { mutate: makeUpdate } = useUpdateMiscDocumentMutation();
  const { mutate: makeDelete } = useDeleteMiscDocumentMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: MiscDocumentFormData, cb?: () => void) => {
    makeCreate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MISC_DOCUMENT_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };
  const onUpdate = (formData: MiscDocumentFormData, cb?: () => void) => {
    makeUpdate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MISC_DOCUMENT_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };
  const onDelete = (recId: number, cb?: () => void) => {
    makeDelete(recId, {
      onSuccess: (data, variables) => {
        message.success(`Xoá thành công.`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MISC_DOCUMENT_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };

  return {
    onUpdate,
    onCreate,
    onDelete,
  };
};
export default useCRUDMiscDocument;
