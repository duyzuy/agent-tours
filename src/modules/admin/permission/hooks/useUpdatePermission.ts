import { useTMutation } from "@/lib/reactQueryHooks";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { ROLES_PERS, ADMIN_AUTH } from "@/constants/query-var.constant";

export const useUpdatePermission = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: roleAndPermissionAPIs.updatePermission,
    onSuccess(data, variables, context) {
      message.success(`Cập nhật thành công.`);
      queryClient.invalidateQueries({
        queryKey: [ROLES_PERS.PERMISSIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_AUTH.GET_ADMIN_ROLES],
      });
    },
    onError: (error, variables, context) => {
      console.log({ error });
      message.error(error.message);
    },
  });
};
