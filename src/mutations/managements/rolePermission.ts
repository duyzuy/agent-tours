import { roleAndPermissionAPIs } from "@/services/management/roles.service";
import { getAgToken } from "@/utils/common";
import { TRolePermissionPayload, IRolesPermissionsRs, TRolePayload } from "@/models/management/role.interface";
import { useCustomMutation } from "../useCustomMutation";

export const useCreateRolePermissionsMutation = () => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (payload: TRolePermissionPayload) => roleAndPermissionAPIs.createRolePermissions(token, payload),
  });
};

export const useUpdateRolePermissionsMutation = (localUser_RolePermissionKey: string) => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (payload: TRolePermissionPayload) =>
      roleAndPermissionAPIs.updateRolePermissions(token, localUser_RolePermissionKey, payload),
  });
};

export const useDeleteRolePermissionsMutation = () => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRolePermissions(token, roleKey),
  });
};

export const useCreateRoleMutation = () => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (payload: TRolePayload) => roleAndPermissionAPIs.createRole(token, payload),
  });
};

export const useUpdateRoleMutation = (localUser_RoleKey: string) => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (payload: TRolePayload) => roleAndPermissionAPIs.updateRoleByRoleKey(token, localUser_RoleKey, payload),
  });
};

export const useDeleteRoleMutation = () => {
  const token = getAgToken() || "";

  return useCustomMutation({
    mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRole(token, roleKey),
  });
};
