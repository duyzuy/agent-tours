import { BaseResponse } from "./common.interface";
type TStatus = "OK" | "OX" | "XX";
interface IPermission {
    groupKey: string;
    groupName: string;
    localUser_PermissionKey: string;
    localUser_PermissionValue: string;
    status: TStatus;
}
interface IRole {
    localUser_RoleKey: string;
    localUser_RoleValue: string;
    localUser_RolePermissionList: IRolePermissions[];
    status: TStatus;
}
interface IRolePermissions {
    localUser_RolePermissionKey: string;
    localUser_RolePermissionValue: string;
    localUser_PermissionList: IPermission[];
    status: TStatus;
}
interface IRolesPermissions {
    action: string;
    cat: string;
    roleList: IRole[];
    rolePermissionList: IRolePermissions[];
    permissionList: IPermission[];
}

export type TRolePermissionPayload = {
    localUser_RolePermissionValue: string;
    localUser_PermissionList: {
        localUser_PermissionKey: string;
    }[];
    status: TStatus;
};

export type TRolePayload = {
    localUser_RoleValue: string;
    localUser_RolePermissionList: {
        localUser_RolePermissionKey: string;
    }[];
    status: TStatus;
};

export interface IRolesPermissionsRs extends BaseResponse<IRolesPermissions> {}
