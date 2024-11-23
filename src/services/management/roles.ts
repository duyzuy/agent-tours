import { getAgToken } from "@/utils/common";
import { client } from "../api";
import { RolePayload } from "@/models/management/role.interface";
import { RolePermissionPayload, RolesPermissionListResponse } from "@/models/management/rolePermission.interface";

export const roleAndPermissionAPIs = {
  getPermissions: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: "LOCALUSER_PERMISSION",
      },
    });
  },

  getRolePermission: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: "LOCALUSER_ROLEPERMISSION",
      },
    });
  },
  getRoles: async () => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Getbycat", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: "LOCALUSER_ROLE",
      },
    });
  },

  createRolePermissions: async (payload: RolePermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          // cat: "LOCALUSER_ROLEPERMISSION",
          // rolePermissionList: [
          //   {
          //     localUser_RolePermissionValue: payload.localUser_RolePermissionValue,
          //     localUser_PermissionList: payload.localUser_PermissionList,
          //   },
          // ],
          ...payload,
        },
      },
    });
  },

  updateRolePermissions: async (payload?: RolePermissionPayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          // cat: "LOCALUSER_ROLEPERMISSION",
          // rolePermissionList: [
          //   {
          //     // localUser_RolePermissionKey,
          //     ...payload,
          //   },
          // ],
          ...payload,
        },
      },
    });
  },

  deleteRolePermissions: async (key: string) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
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
    });
  },

  createRole: async (payload: RolePayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          // cat: "LOCALUSER_ROLE",
          // roleList: [
          //   {
          //     ...payload,
          //   },
          // ],
          ...payload,
        },
      },
    });
  },
  updateRoleByRoleKey: async (payload: RolePayload) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          // cat: "LOCALUSER_ROLE",
          // roleList: [
          //   {
          //     localUser_RoleKey: localUser_RoleKey,
          //     ...payload,
          //   },
          // ],
          ...payload,
        },
      },
    });
  },
  deleteRole: async (roleKey: string) => {
    return await client.post<RolesPermissionListResponse>("local/LocalUser_RoleAndPermission_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
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
    });
  },
};
