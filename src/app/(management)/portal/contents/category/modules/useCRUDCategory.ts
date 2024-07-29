import useMessage from "@/hooks/useMessage";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateStatusMutation,
  useDeleteMutation,
} from "@/mutations/managements/category";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { CategoryFormData } from "./category.interface";

import { useRouter } from "next/navigation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { CategoryListLangResponse } from "@/models/management/category.interface";

const useCRUDCategory = () => {
  const { mutate: makeCreate, isPending: isPendingCreate } = useCreateCategoryMutation();
  const { mutate: makeUpdate, isPending: isPendingUpdate } = useUpdateCategoryMutation();
  const { mutate: makeUpdateStatus } = useUpdateStatusMutation();
  const { mutate: makeDelete } = useDeleteMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: CategoryFormData, cb?: () => void) => {
    makeCreate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Tạo danh mục thành công`);
          router.push(`/portal/contents/category/${data.result.originId}`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_CATEGORY_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_CATEGORY_DETAIL],
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

  const onUpdate = (formData: CategoryFormData, cb?: () => void) => {
    makeUpdate(
      { ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_CATEGORY_LIST],
          });
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_CATEGORY_DETAIL],
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
          queryKey: [queryCMS.GET_CATEGORY_LIST],
        });
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_CATEGORY_DETAIL],
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

        queryClient.setQueryData(
          [queryCMS.GET_CATEGORY_DETAIL, { originId: data.result.originId }],
          (oldData: CategoryListLangResponse) => {
            let newResult = [...oldData.result];
            const indexItem = newResult.findIndex((item) => item.id === data.result.id);
            newResult.splice(indexItem, 1);

            return {
              ...oldData,
              result: newResult,
            };
          },
        );
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_CATEGORY_LIST],
        });

        // queryClient.invalidateQueries({
        //   queryKey: [queryCMS.GET_CATEGORY_DETAIL, { originId: data.result.originId }],
        // });
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
export default useCRUDCategory;
