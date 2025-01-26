import { RolePermissionFormData } from "./rolePer.interface";
import { RolePermissionPayload } from "@/models/management/rolePermission.interface";

export const getPermissionList = (permissionList: RolePermissionFormData["localUser_PermissionList"]) => {
  return permissionList?.reduce<
    Exclude<
      Required<Required<RolePermissionPayload>["rolePermissionList"]>[number]["localUser_PermissionList"],
      undefined
    >
  >((acc, per) => {
    if (per.localUser_PermissionKey) {
      acc = [...acc, { localUser_PermissionKey: per.localUser_PermissionKey }];
    }
    return acc;
  }, []);
};
