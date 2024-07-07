import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE_PERMISSION, GET_LOCAL_USER_ROLES } from "@/queries/var";
import { TRolePermissionPayload } from "@/models/management/role.interface";
import { useDeleteRolePermissionsMutation } from "@/mutations/managements/rolePermission";

type IRolePersFieldsErrors = Partial<Record<keyof TRolePermissionPayload, string>>;
const useDeleteRolePermissions = () => {
  const queryClient = useQueryClient();

  const { mutate: onDeleteRolePers } = useDeleteRolePermissionsMutation();

  const message = useMessage();

  const onDeleteRolePermission = (key: string, cb?: () => void) => {
    onDeleteRolePers(key, {
      onSuccess: (response) => {
        message.success("Xoá nhóm chức năng thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_ROLE_PERMISSION],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_USER_ROLES],
        });
        cb?.();
      },
      onError: (error) => {
        console.log(error);
        message.error("Xoá nhóm chức năng thất bại.");
      },
    });
  };
  return {
    onDeleteRolePermission,
  };
};
export default useDeleteRolePermissions;
