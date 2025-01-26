import { useQuery } from "@tanstack/react-query";
import { GET_LOCAL_ROLE, GET_LOCAL_ROLE_PERMISSION, GET_LOCAL_PERMISSION } from "./var";
import { roleAndPermissionAPIs } from "@/services/management/roles";

import { getAgToken } from "@/utils/common";
import { isUndefined } from "lodash";

// export const useGetRoles = (options?: { enabled?: boolean }) => {
//   return useQuery({
//     queryKey: [GET_LOCAL_ROLE],
//     queryFn: () => roleAndPermissionAPIs.getRoles(),
//     select: (data) => {
//       return data.result;
//     },
//     enabled: isUndefined(options) || isUndefined(options?.enabled) ? true : options.enabled,
//   });
// };
// export const useGetRolePermission = (options?: { enabled?: boolean }) => {
//   return useQuery({
//     queryKey: [GET_LOCAL_ROLE_PERMISSION],
//     queryFn: () => roleAndPermissionAPIs.getRolePermission(),
//     select: (data) => {
//       return data.result;
//     },
//     enabled: isUndefined(options) || isUndefined(options?.enabled) ? true : options.enabled,
//   });
// };
