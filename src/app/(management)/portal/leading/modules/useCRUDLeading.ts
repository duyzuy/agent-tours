import {
  useCreateOneLeadingMutation,
  useCreateMultipleLeadingMutation,
  useUpdateLeadingMutation,
} from "@/mutations/managements/leading";

import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { useRouter } from "next/navigation";
import { LeadingFormData } from "./leading.interface";
import { LeadingPayload } from "@/models/management/leading.interface";

const useCRUDLeading = () => {
  const { mutate: createOne, isPending: isPendingCreateOne } = useCreateOneLeadingMutation();
  const { mutate: makeCreateMultiple, isPending: isPendingCreateMultiple } = useCreateMultipleLeadingMutation();
  const { mutate: makeUpdate, isPending: isPendingUpdate } = useUpdateLeadingMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: LeadingFormData, cb?: () => void) => {
    createOne(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_LEADING_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };
  const onUpdate = (formData: LeadingFormData, cb?: () => void) => {
    makeUpdate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_LEADING_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onCreateMultiple = (data?: LeadingPayload[], cb?: () => void) => {
    makeCreateMultiple(data, {
      onSuccess: (data, variables) => {
        message.success(`Import thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_LEADING_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  return {
    onCreate,
    onUpdate,
    onCreateMultiple,
    loading: isPendingCreateOne || isPendingUpdate || isPendingCreateMultiple,
  };
};
export default useCRUDLeading;
