import { useQuery } from "@tanstack/react-query";
import {
    GET_LOCAL_ROLE_GROUPS,
    GET_LOCAL_ROLE,
    GET_LOCAL_ROLE_PERMISSION,
    GET_LOCAL_PERMISSION,
} from "./var";
import { roleAndPermissionAPIs } from "@/services/management/roles.service";
import { IRolesPermissionsRs } from "@/models/management/role.interface";
import { getAgToken } from "@/utils/common";

export const useGetPermissions = () => {
    const token = getAgToken() || "";
    return useQuery<IRolesPermissionsRs, any>({
        queryKey: [GET_LOCAL_PERMISSION],
        queryFn: () => roleAndPermissionAPIs.getPermissions(token),
        enabled: Boolean(token),
    });
};

export const useGetRoles = () => {
    const token = getAgToken() || "";
    return useQuery<IRolesPermissionsRs, any>({
        queryKey: [GET_LOCAL_ROLE],
        queryFn: () => roleAndPermissionAPIs.getRoles(token),
        enabled: Boolean(token),
    });
};
export const useGetRolePermission = () => {
    const token = getAgToken() || "";
    return useQuery<IRolesPermissionsRs, any>({
        queryKey: [GET_LOCAL_ROLE_PERMISSION],
        queryFn: () => roleAndPermissionAPIs.getRolePermission(token),
        enabled: Boolean(token),
    });
};

// export const useGetAllRoleGroups = () => {
//     const token = getAgToken() || "";
//     return useQuery<IRolesPermissionsRs, any>({
//         queryKey: [GET_LOCAL_ROLE_GROUPS],
//         queryFn: () => roleAndPermissionAPIs.getRoleGroups(token),
//         enabled: Boolean(token),
//     });
// };
