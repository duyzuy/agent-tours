import useMessage from "@/hooks/useMessage";

import {
  useCreatePageContentMutation,
  useUpdatePageContentMutation,
  useUnPublishPageContentMutation,
  usePublishPageContentMutation,
  useDeletePageContentMutation,
} from "@/mutations/managements/pageContent";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { PageContentFormData } from "./pageContent.interface";

import { useRouter } from "next/navigation";
import { IPageContentDetailRs } from "@/models/management/cms/pageContent.interface";

const useCRUDPageContent = () => {
  const { mutate: makeCreate } = useCreatePageContentMutation();
  const { mutate: makeUpdate } = useUpdatePageContentMutation();
  const { mutate: makeUnPublish } = useUnPublishPageContentMutation();
  const { mutate: makePublish } = usePublishPageContentMutation();

  const { mutate: makeDelete } = useDeletePageContentMutation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: PageContentFormData, cb?: () => void) => {
    makeCreate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Tạo trang thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_PAGE_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_PAGE_DETAIL],
          });
          router.push(`/portal/contents/page/${data.result.originId}`);
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };

  const onUpdate = (formData: PageContentFormData, cb?: () => void) => {
    makeUpdate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_PAGE_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_PAGE_DETAIL],
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

  const onPublish = (id: number, cb?: () => void) => {
    makePublish(id, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_PAGE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_PAGE_DETAIL],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUnPublish = (id: number, cb?: () => void) => {
    makeUnPublish(id, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_PAGE_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_PAGE_DETAIL],
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
          queryKey: [queryCMS.GET_PAGE_LIST],
        });

        queryClient.setQueryData(
          [queryCMS.GET_PAGE_DETAIL, { originId: data.result.originId }],
          (oldData: IPageContentDetailRs) => {
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
    onPublish,
    onUnPublish,
    onDelete,
  };
};
export default useCRUDPageContent;
