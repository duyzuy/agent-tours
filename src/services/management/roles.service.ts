import { client } from "../api";
import {
    TRolePermissionPayload,
    IRolesPermissionsRs,
    TRolePayload,
} from "@/models/management/role.interface";
import { BaseResponse } from "@/models/common.interface";
export const roleAndPermissionAPIs = {
    getPermissions: async (token: string) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Getbycat",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: "LOCALUSER_PERMISSION",
                },
            },
        );
    },

    getRolePermission: async (token: string) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Getbycat",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: "LOCALUSER_ROLEPERMISSION",
                },
            },
        );
    },
    getRoles: async (token: string) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Getbycat",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: "LOCALUSER_ROLE",
                },
            },
        );
    },

    createRolePermissions: async (
        token: string,
        payload: TRolePermissionPayload,
    ) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Addnew",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLEPERMISSION",
                        rolePermissionList: [
                            {
                                localUser_RolePermissionValue:
                                    payload.localUser_RolePermissionValue,
                                localUser_PermissionList:
                                    payload.localUser_PermissionList,
                            },
                        ],
                    },
                },
            },
        );
    },

    updateRolePermissions: async (
        token: string,
        localUser_RolePermissionKey: string,
        payload: TRolePermissionPayload,
    ) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Edit",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLEPERMISSION",
                        rolePermissionList: [
                            {
                                localUser_RolePermissionKey,
                                ...payload,
                            },
                        ],
                    },
                },
            },
        );
    },

    deleteRolePermissions: async (token: string, key: string) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Delete",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLEPERMISSION",
                        rolePermissionList: [
                            {
                                localUser_RolePermissionKey: key,
                            },
                        ],
                    },
                },
            },
        );
    },

    createRole: async (token: string, payload: TRolePayload) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Addnew",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLE",
                        roleList: [
                            {
                                ...payload,
                            },
                        ],
                    },
                },
            },
        );
    },
    updateRoleByRoleKey: async (
        token: string,
        localUser_RoleKey: string,
        payload: TRolePayload,
    ) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Edit",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLE",
                        roleList: [
                            {
                                localUser_RoleKey: localUser_RoleKey,
                                ...payload,
                            },
                        ],
                    },
                },
            },
        );
    },
    deleteRole: async (token: string, roleKey: string) => {
        return await client.post<IRolesPermissionsRs, BaseResponse<null>>(
            "local/LocalUser_RoleAndPermission_Delete",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
                params: {
                    requestObject: {
                        cat: "LOCALUSER_ROLE",
                        roleList: [
                            {
                                localUser_RoleKey: roleKey,
                            },
                        ],
                    },
                },
            },
        );
    },
};
// {
//     "requestObject": {
//         "cat": "LOCALUSER_ROLE", //LOCALUSER_ROLE, LOCALUSER_ROLEPERMISSION, LOCALUSER_PERMISSION
//         //truyền object tương ứng theo cat
//         "roleList": [ //LOCALUSER_ROLEPERMISSION
//             {
//                 "localUser_RoleValue": "Full editor",
//                 "localUser_RolePermissionList": [
//                     {
//                         "localUser_RolePermissionKey": "EDITOR_MENU_NODELETEEE"
//                     },
//                     {
//                         "localUser_RolePermissionKey": "EDITOR3999249"
//                     }
//                 ]
//             }
//         ]

//     }
// }
