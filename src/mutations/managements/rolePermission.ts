// import { roleAndPermissionAPIs } from "@/services/management/roles";
// import { RolePayload } from "@/models/management/role.interface";
// import { RolePermissionPayload } from "@/models/management/rolePermission.interface";
// import { useCustomMutation } from "../useCustomMutation";

// export const useCreateRolePermissionsMutation = () => {
//   return useCustomMutation({
//     mutationFn: (payload: RolePermissionPayload) => roleAndPermissionAPIs.createRolePermissions(payload),
//   });
// };

// export const useUpdateRolePermissionsMutation = () => {
//   return useCustomMutation({
//     mutationFn: (payload: RolePermissionPayload) => roleAndPermissionAPIs.updateRolePermissions(payload),
//   });
// };

// export const useDeleteRolePermissionsMutation = () => {
//   return useCustomMutation({
//     mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRolePermissions(roleKey),
//   });
// };

// export const useCreateRoleMutation = () => {
//   return useCustomMutation({
//     mutationFn: (payload: RolePayload) => roleAndPermissionAPIs.createRole(payload),
//   });
// };

// export const useUpdateRoleMutation = () => {
//   return useCustomMutation({
//     mutationFn: (payload: RolePayload) => roleAndPermissionAPIs.updateRoleByRoleKey(payload),
//   });
// };

// export const useDeleteRoleMutation = () => {
//   return useCustomMutation({
//     mutationFn: (roleKey: string) => roleAndPermissionAPIs.deleteRole(roleKey),
//   });
// };
