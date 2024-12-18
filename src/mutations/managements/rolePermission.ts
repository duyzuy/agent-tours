import { roleAndPermissionAPIs } from "@/services/management/roles";
import { RolePayload } from "@/models/management/role.interface";
import { RolePermissionPayload } from "@/models/management/rolePermission.interface";
import { useCustomMutation } from "../useCustomMutation";
import { PermissionPayload } from "@/models/management/permission.interface";

export const useCreateRolePermissionsMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RolePermissionPayload) => roleAndPermissionAPIs.createRolePermissions(payload),
  });
};

export const useUpdateRolePermissionsMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RolePermissionPayload) => roleAndPermissionAPIs.updateRolePermissions(payload),
  });
};

export const useDeleteRolePermissionsMutation = () => {
  return useCustomMutation({
    mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRolePermissions(roleKey),
  });
};

export const useCreateRoleMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RolePayload) => roleAndPermissionAPIs.createRole(payload),
  });
};

export const useUpdateRoleMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RolePayload) => roleAndPermissionAPIs.updateRoleByRoleKey(payload),
  });
};

export const useDeleteRoleMutation = () => {
  return useCustomMutation({
    mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRole(roleKey),
  });
};

export const useCreatePermissionMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: PermissionPayload) => roleAndPermissionAPIs.createPermission(payload),
  });
};

export const useUpdatePermissionMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: PermissionPayload) => roleAndPermissionAPIs.updatePermission(payload),
  });
};

export const useDeletePermissionMutation = () => {
  return useCustomMutation({
    mutationFn: (permissionKey: string) => roleAndPermissionAPIs.deletePermission(permissionKey),
  });
};
