import { useTMutation } from "@/lib/reactQueryHooks";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { ROLES_PERS } from "@/constants/query-var.constant";

export const useCreatePermission = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: roleAndPermissionAPIs.createPermission,
    onSuccess(data, variables, context) {
      message.success(`Tạo thành công.`);
      queryClient.invalidateQueries({
        queryKey: [ROLES_PERS.PERMISSIONS],
      });
    },
    onError: (error, variables, context) => {
      message.error(error.message);
    },
  });
};
