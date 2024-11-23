import { BaseResponse } from "../common.interface";
import { IPermission } from "./permission.interface";
import { IRole } from "./role.interface";

export interface IRolePermissions {
  localUser_RolePermissionKey: string;
  localUser_RolePermissionValue: string;
  localUser_PermissionList: IPermission[];
  status: "OK" | "OX" | "XX";
}

export type RolePermissionPayload = {
  cat: "LOCALUSER_ROLEPERMISSION";
  rolePermissionList?: {
    localUser_RolePermissionKey?: string;
    localUser_RolePermissionValue?: string;
    localUser_PermissionList?: {
      localUser_PermissionKey: string;
    }[];
  }[];
  status?: "OK" | "OX" | "XX";
};

export interface RolesPermissionListResponse
  extends BaseResponse<{
    action: string;
    cat: "LOCALUSER_ROLE" | "LOCALUSER_ROLEPERMISSION" | "LOCALUSER_PERMISSION";
    roleList: IRole[];
    rolePermissionList: IRolePermissions[];
    permissionList: IPermission[];
  }> {}
