import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";

import {
  useCreateTemplateSellableMutation,
  useApprovalTemplateSellableMutation,
  useUpdateTemplateSellableMutation,
  useDeleteTemplateSellableMutation,
} from "@/mutations/managements/templateSellable";
import { ITemplateSellablePayload } from "@/models/management/core/templateSellable.interface";
import { TemplateSellableFormData } from "./templateSellable.interface";
import { queryCore } from "@/queries/var";
import { isEmpty } from "lodash";

const useCRUDTemplateSellable = () => {
  const { mutate: makeCreateTemplateSellable } = useCreateTemplateSellableMutation();

  const { mutate: makeApprovalTemplateSellable } = useApprovalTemplateSellableMutation();

  const { mutate: makeDeleteTemplateSellable } = useDeleteTemplateSellableMutation();

  const { mutate: makeUpdateTemplateSellable } = useUpdateTemplateSellableMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onCreateTemplateSellable = (formdata: TemplateSellableFormData, cb?: () => void) => {
    makeCreateTemplateSellable(formdata, {
      onSuccess: (data, variables) => {
        message.success(`Tạo Template thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const onApprovalTemplateSellable = (reCordId: number, cb?: () => void) => {
    makeApprovalTemplateSellable(reCordId, {
      onSuccess: (data, variables) => {
        message.success(`Duyệt thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const onDeleteTemplateSellable = (reCordId: number, cb?: () => void) => {
    makeDeleteTemplateSellable(reCordId, {
      onSuccess: (data, variables) => {
        message.success(`Xoá Template thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE],
        });
        cb?.();
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const onUpdateTemplateSellable = (recordId: number, formData: TemplateSellableFormData, cb?: () => void) => {
    makeUpdateTemplateSellable(
      {
        ...formData,
        recordId: recordId,
      },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);

          queryClient.invalidateQueries({
            queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE],
          });
          cb?.();
        },
        onError: (error) => {
          message.error(error.message);
        },
      },
    );
  };

  return {
    onCreate: onCreateTemplateSellable,
    onApproval: onApprovalTemplateSellable,
    onDelete: onDeleteTemplateSellable,
    onUpdate: onUpdateTemplateSellable,
  };
};
export default useCRUDTemplateSellable;
