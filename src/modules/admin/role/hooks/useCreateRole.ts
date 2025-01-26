import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { useQueryClient } from "@tanstack/react-query";
import { ADMIN_AUTH, ROLES_PERS } from "@/constants/query-var.constant";

export const useCreateRole = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useTMutation({
    mutationFn: roleAndPermissionAPIs.createRole,
    onSuccess: (response, variables, context) => {
      message.success(`Tạo Role thành công.`);
      queryClient.invalidateQueries({
        queryKey: [ROLES_PERS.ROLES],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_AUTH.GET_ADMIN_ROLES],
      });
    },
    onError: (error, variables, context) => {
      message.error(error.message);
    },
  });
};
