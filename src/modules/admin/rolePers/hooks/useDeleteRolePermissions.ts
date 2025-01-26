import { useTMutation } from "@/lib/reactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { ADMIN_AUTH, ROLES_PERS } from "@/constants/query-var.constant";
import useMessage from "@/hooks/useMessage";

export const useDeleteRolePermissions = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: roleAndPermissionAPIs.deleteRolePermissions,

    onSuccess: (response, variables, context) => {
      message.success(`Xoá thành công.`);
      queryClient.invalidateQueries({
        queryKey: [ROLES_PERS.ROLE_PERMISSIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_AUTH.GET_ADMIN_ROLES],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_AUTH.GET_ADMIN_PERMISSIONS],
      });
    },
    onError: (error, variables, context) => {
      console.log({ error });
      message.error(error.message);
    },
  });
};
