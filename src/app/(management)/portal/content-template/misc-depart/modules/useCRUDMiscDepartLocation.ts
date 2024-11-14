import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { useRouter } from "next/navigation";
import { MiscDepartLocationFormData } from "./miscDepart.interface";
import {
  useCreateMiscDepartLocationMutation,
  useUpdateMiscDepartLocationMutation,
  useDeleteMiscDepartLocationMutation,
} from "@/mutations/managements/departLocation";

const useCRUDMiscDepartLocation = () => {
  const { mutate: makeCreate } = useCreateMiscDepartLocationMutation();
  const { mutate: makeUpdate } = useUpdateMiscDepartLocationMutation();
  const { mutate: makeDelete } = useDeleteMiscDepartLocationMutation();

  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreate = (formData: MiscDepartLocationFormData, cb?: () => void) => {
    makeCreate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MISC_DEPART_LOCATION_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        message.error(error.message);
      },
    });
  };
  const onUpdate = (formData: MiscDepartLocationFormData, cb?: () => void) => {
    makeUpdate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_MISC_DEPART_LOCATION_LIST],
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
          queryKey: [queryCMS.GET_MISC_DEPART_LOCATION_LIST],
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
export default useCRUDMiscDepartLocation;
