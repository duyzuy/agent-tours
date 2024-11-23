import { IRolePermissions } from "./rolePermission.interface";

export interface IRole {
  localUser_RoleKey: string;
  localUser_RoleValue: string;
  localUser_RolePermissionList: IRolePermissions[];
  status: "OK" | "OX" | "XX";
}

export type RolePayload = {
  cat: "LOCALUSER_ROLE";
  roleList?: {
    localUser_RoleKey?: string;
    localUser_RoleValue?: string;
    localUser_RolePermissionList?: {
      localUser_RolePermissionKey: string;
    }[];
  }[];
  status?: "OK" | "OX" | "XX";
};
