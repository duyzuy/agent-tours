import { useCreateLocalSearchMutation, useUpdateLocalSearchMutation } from "@/mutations/managements/destination";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { LocalSearchFormData } from "@/models/management/localSearchDestination.interface";
import { Status } from "@/models/common.interface";

const useCRUDLocalSearch = () => {
  const { mutate: makeCreateLocalSearch } = useCreateLocalSearchMutation();
  const { mutate: makeUpdateLocalSearch } = useUpdateLocalSearchMutation();

  const message = useMessage();
  const queryClient = useQueryClient();

  const onCreate = (payload: LocalSearchFormData, cb?: () => void) => {
    makeCreateLocalSearch(payload, {
      onSuccess: (data, variables) => {
        message.success(`Tạo  thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_LOCAL_SEACH_DESTINATION],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdate = (id: number, payload: LocalSearchFormData, cb?: () => void) => {
    makeUpdateLocalSearch(
      { id, ...payload },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_LOCAL_SEACH_DESTINATION],
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

  const onDelete = (id: number, cb?: () => void) => {
    makeUpdateLocalSearch(
      { id, status: Status.XX },
      {
        onSuccess: (data, variables) => {
          message.success(`Xoá thành công`);
          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_LOCAL_SEACH_DESTINATION],
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

  return {
    onCreate,
    onUpdate,
    onDelete,
  };
};
export default useCRUDLocalSearch;
