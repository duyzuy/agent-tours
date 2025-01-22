import { AdminLoginPayload, AdminLoginResponse } from "@/modules/admin/auth/auth.type";
import { client } from "../api";
import { ILocalUserProfilePayload, ILocalUserProfileRs } from "@/models/management/localAuth.interface";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { ErrorResponse } from "@/models/common.interface";

export const getAdminProfile = async () => {
  return await client.post<ILocalUserProfileRs, ErrorResponse>("local/getLocalProfile", { isAuth: true });
};

export const adminSignIn = async (payload: AdminLoginPayload) => {
  return await client.post<AdminLoginResponse>("local/getLocalToken", {
    params: {
      requestObject: {
        localUser: payload,
      },
    },
  });
};

export const adminGetRoles = async () => {
  return await client.post<RolesPermissionListResponse>("local/CurrentUser_getRoles", {
    isAuth: true,
  });
};

export const adminUpdateProfile = async (payload: ILocalUserProfilePayload) => {
  return await client.post<ILocalUserProfileRs>("local/CurrentUser_updateInfo", {
    isAuth: true,
    params: {
      requestObject: payload,
    },
  });
};
