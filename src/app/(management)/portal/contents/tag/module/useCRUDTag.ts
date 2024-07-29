import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import {
  useCreateTagMutation,
  useUpdateTagMutation,
  useUpdateStatusMutation,
  useDeleteTagMutation,
} from "@/mutations/managements/tag";
import { queryCMS } from "@/queries/var";
import { TagFormData } from "./tag.interface";

import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { TagListResponse } from "@/models/management/tag.interface";

const useCRUDTag = () => {
  const { mutate: makeCreate } = useCreateTagMutation();
  const { mutate: makeUpdate } = useUpdateTagMutation();
  const { mutate: makeUpdateStatus } = useUpdateStatusMutation();
  const { mutate: makeDelete } = useDeleteTagMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: TagFormData, cb?: () => void) => {
    makeCreate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Tạo thẻ thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_TAG_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_TAG_DETAIL],
          });
          router.push(`/portal/contents/tag/${data.result.originId}`);
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };

  const onUpdate = (formData: TagFormData, cb?: () => void) => {
    makeUpdate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_TAG_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_TAG_DETAIL],
          });
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };

  const onUpdateStatus = (payload: { id: number; status: PageContentStatus }, cb?: () => void) => {
    makeUpdateStatus(payload, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TAG_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TAG_DETAIL],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onDelete = (id: number, cb?: () => void) => {
    makeDelete(id, {
      onSuccess: (data, variables) => {
        message.success(`Xoá thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_TAG_LIST],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [queryCMS.GET_TAG_DETAIL],
        // });

        queryClient.setQueryData(
          [queryCMS.GET_TAG_DETAIL, { originId: data.result.originId }],
          (oldData: TagListResponse) => {
            console.log(oldData);
            let newResult = [...oldData.result];
            const indexItem = newResult.findIndex((item) => item.id === data.result.id);
            newResult.splice(indexItem, 1);

            return {
              ...oldData,
              result: newResult,
            };
          },
        );

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
    onUpdateStatus,
    onDelete,
    // onUnPublish,
  };
};
export default useCRUDTag;
