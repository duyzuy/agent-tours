import { useTQuery } from "@/lib/reactQueryHooks";
import { ROLES_PERS } from "@/constants/query-var.constant";
import { roleAndPermissionAPIs } from "@/services/management/roles";
import { isUndefined } from "lodash";

export const useGetRoles = (options?: { enabled?: boolean }) => {
  const enabled = isUndefined(options?.enabled) ? true : options?.enabled;
  return useTQuery({
    queryKey: [ROLES_PERS.ROLES],
    queryFn: roleAndPermissionAPIs.getRoles,
    select: (data) => data.result,
    enabled: enabled,
  });
};
