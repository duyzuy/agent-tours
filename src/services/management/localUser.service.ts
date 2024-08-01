import { getAgToken } from "@/utils/common";
import { client } from "../api";
import {
  ILocalUserChangePasswordPayLoad,
  ILocalUserList,
  ILocalUserPayload,
  UserAgentListResponse,
} from "@/models/management/localUser.interface";
export const localUserAPIs = {
  getUserList: async () => {
    const token = getAgToken() || "";
    return await client.post<ILocalUserList>("local/LocalUserList", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
  },
  getAgentList: async () => {
    const token = getAgToken() || "";
    return await client.post<UserAgentListResponse>("local/LocalUser_ListAgent", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
  },
  createLocalUser: async <T>(payload: ILocalUserPayload) => {
    const token = getAgToken() || "";
    return await client.post<T, any>("local/LocalUser_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
  updateLocalUser: async <T>(recId: number, payload: ILocalUserPayload) => {
    const token = getAgToken() || "";
    return await client.post<T, any>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      params: {
        requestObject: { recId, ...payload },
      },
    });
  },
  updateStatusLocalUser: async <T>(recId: number, payload: ILocalUserPayload["status"]) => {
    const token = getAgToken() || "";
    return await client.post<T, any>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      params: {
        requestObject: { recId, status: payload },
      },
    });
  },
  changePassword: async <T>(payload: ILocalUserChangePasswordPayLoad) => {
    const token = getAgToken() || "";
    return await client.post<T, any>("local/LocalUser_SetnewPassword", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
};
