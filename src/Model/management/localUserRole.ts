import { BaseResponse } from "./common.interface";
import { IRolesPermissionsRs } from "./role.interface";
interface ILocalUserRoles {
    action: string;
    cat: string;
    roleList: {
        localUser_RoleKey: string;
        localUser_RoleValue: string;
        localUser_RolePermissionList: [];
    }[];
    rolePermissionList: [];
    permissionList: [];
}
export interface ILocalUserRoleRs extends BaseResponse<string[]> {}
