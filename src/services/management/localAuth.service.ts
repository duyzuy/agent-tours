import { getAgToken } from "@/utils/common";
import { client } from "../api";
import { ILocalUserProfileRs, ILocalUserProfilePayload } from "@/models/management/localAuth.interface";

export const localAuthAPIs = {
  getRoles: async <T>(token: string) => {
    return await client.post<T, any>("local/CurrentUser_getRoles", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
  },
  getProfile: async (token: string) => {
    return await client.post<ILocalUserProfileRs, any>("local/getLocalProfile", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
  },
  update: async (payload: ILocalUserProfilePayload) => {
    return await client.post<ILocalUserProfileRs, any>("local/CurrentUser_updateInfo", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
};
