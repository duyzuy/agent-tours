import { getAgToken } from "@/utils/common";
import { client } from "../api";
import {
  ELocalUserType,
  ILocalUserChangePasswordPayLoad,
  ILocalUserList,
  ILocalUserPayload,
  UserAgentListResponse,
} from "@/models/management/localUser.interface";
export const localUserAPIs = {
  getUserList: async (userTypeList?: ELocalUserType[]) => {
    return await client.post<ILocalUserList>("local/LocalUserList", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          userTypeList,
        },
      },
    });
  },
  getAgentList: async () => {
    return await client.post<UserAgentListResponse>("local/LocalUser_ListAgent", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
    });
  },
  createLocalUser: async <T>(payload: ILocalUserPayload) => {
    return await client.post<T, any>("local/LocalUser_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
  updateLocalUser: async <T>(recId: number, payload: ILocalUserPayload) => {
    return await client.post<T, any>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { recId, ...payload },
      },
    });
  },
  updateStatusLocalUser: async <T>(recId: number, payload: ILocalUserPayload["status"]) => {
    return await client.post<T, any>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { recId, status: payload },
      },
    });
  },
  changePassword: async <T>(payload: ILocalUserChangePasswordPayLoad) => {
    return await client.post<T, any>("local/LocalUser_SetnewPassword", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
};
