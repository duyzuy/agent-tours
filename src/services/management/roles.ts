import { client } from "../api";
import { RolePayload } from "@/models/management/role.interface";
import { RolePermissionPayload, RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { PermissionPayload } from "@/models/management/permission.interface";

export const roleAndPermissionAPIs = {
  getPermissions: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      isAuth: true,
      body: {
        requestObject: "LOCALUSER_PERMISSION",
      },
    });
  },

  getRolePermission: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      isAuth: true,
      body: {
        requestObject: "LOCALUSER_ROLEPERMISSION",
      },
    });
  },
  getRoles: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      isAuth: true,
      body: {
        requestObject: "LOCALUSER_ROLE",
      },
    });
  },

  createRolePermissions: async (payload: RolePermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Addnew", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },

  updateRolePermissions: async (payload?: RolePermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },

  deleteRolePermissions: async (key: string) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "LOCALUSER_ROLEPERMISSION",
          rolePermissionList: [
            {
              localUser_RolePermissionKey: key,
            },
          ],
        },
      },
    });
  },

  createRole: async (payload: RolePayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Addnew", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  updateRoleByRoleKey: async (payload: RolePayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  deleteRole: async (roleKey: string) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "LOCALUSER_ROLE",
          roleList: [
            {
              localUser_RoleKey: roleKey,
            },
          ],
        },
      },
    });
  },

  createPermission: async (payload: PermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updatePermission: async (payload: PermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  deletePermission: async (permissionKey: string) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "LOCALUSER_PERMISSION",
          permissionList: [
            {
              localUser_PermissionKey: permissionKey,
            },
          ],
        },
      },
    });
  },
};
