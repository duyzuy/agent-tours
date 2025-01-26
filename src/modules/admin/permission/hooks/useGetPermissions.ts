import { ROLES_PERS } from "@/constants/query-var.constant";
import { useTQuery } from "@/lib/reactQueryHooks";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { isUndefined } from "lodash";

export const useGetPermissions = (options?: { enabled?: boolean }) => {
  const enabled = isUndefined(options?.enabled) ? true : options?.enabled;
  return useTQuery({
    queryKey: [ROLES_PERS.PERMISSIONS],
    queryFn: roleAndPermissionAPIs.getPermissions,
    select: (data) => data.result,
    enabled: enabled,
  });
};
