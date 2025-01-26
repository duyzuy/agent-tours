import { useTQuery } from "@/lib/reactQueryHooks";
import { ROLES_PERS } from "@/constants/query-var.constant";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { isUndefined } from "lodash";

export const useGetRolePermission = (options?: { enabled?: boolean }) => {
  const enabled = isUndefined(options?.enabled) ? true : options?.enabled;
  return useTQuery({
    queryKey: [ROLES_PERS.ROLE_PERMISSIONS],
    queryFn: roleAndPermissionAPIs.getRolePermission,
    select: (data) => data.result,
    enabled: enabled,
  });
};
