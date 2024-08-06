import useMessage from "@/hooks/useMessage";

import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdateStatusMutation,
} from "@/mutations/managements/post";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { PostContentFormData } from "./postModule.interface";

import { useRouter } from "next/navigation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { PostContentPayload, PostListResponse } from "@/models/management/post.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

const useCRUDPost = () => {
  const { mutate: makeCreate, isPending: isPendingCreate } = useCreatePostMutation();
  const { mutate: makeUpdate, isPending: isPendingUpdate } = useUpdatePostMutation();
  const { mutate: makeUpdateStatus } = useUpdateStatusMutation();
  const { mutate: makeDelete } = useDeletePostMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: PostContentFormData, cb?: () => void) => {
    const payload: PostContentPayload = {
      ...formData,
      publishDate: dayjs(formData.publishDate).locale("en").format(DATE_TIME_FORMAT),
    };

    makeCreate(payload, {
      onSuccess: (data, variables) => {
        message.success(`Tạo bài viết thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_DETAIL],
        });
        router.push(`/portal/contents/post/${data.result.originId}`);
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdate = (formData: PostContentFormData, cb?: () => void) => {
    const payload: PostContentPayload = {
      ...formData,
      publishDate: dayjs(formData.publishDate).locale("en").format(DATE_TIME_FORMAT),
    };
    makeUpdate(payload, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_DETAIL],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdateStatus = (payload: { id: number; status: PageContentStatus }, cb?: () => void) => {
    makeUpdateStatus(payload, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật trạng thái thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_POST_CONTENT_DETAIL],
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
          queryKey: [queryCMS.GET_POST_CONTENT_LIST],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [queryCMS.GET_POST_CONTENT_DETAIL, { originId: data.result.originId }],
        // });
        queryClient.setQueryData(
          [queryCMS.GET_POST_CONTENT_DETAIL, { originId: data.result.originId }],
          (oldData: PostListResponse) => {
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
    isPendingCreate,
    isPendingUpdate,
  };
};
export default useCRUDPost;
