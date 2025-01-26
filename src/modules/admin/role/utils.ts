import { RolePayload } from "@/models/management/role.interface";
import { RoleFormData } from "./role.interface";

export const getRolePermissionList = (rolePermissionList: RoleFormData["localUser_RolePermissionList"]) => {
  return rolePermissionList?.reduce<
    Exclude<Required<RolePayload>["roleList"][number]["localUser_RolePermissionList"], undefined>
  >((acc, rolePers) => {
    if (rolePers.localUser_RolePermissionKey) {
      acc = [...acc, { localUser_RolePermissionKey: rolePers.localUser_RolePermissionKey }];
    }
    return acc;
  }, []);
};
