import { useTMutation } from "@/lib/reactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { ADMIN_AUTH, ROLES_PERS } from "@/constants/query-var.constant";
import useMessage from "@/hooks/useMessage";

export const useCreateRolePermissions = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: roleAndPermissionAPIs.createRolePermissions,
    onSuccess: (response, variables, context) => {
      message.success(`Tạo thành công.`);
      queryClient.invalidateQueries({
        queryKey: [ROLES_PERS.ROLE_PERMISSIONS],
      });
    },
    onError: (error, variables, context) => {
      console.log({ error });
      message.error(error.message);
    },
  });
};
