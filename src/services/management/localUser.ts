import { getAgToken } from "@/utils/common";
import { client } from "../api";
import {
  ELocalUserType,
  LocalUserNewPasswordPayload,
  LocalUserListResponse,
  LocalUserResponse,
  LocalUserAgentListResponse,
  ILocalUserPayload,
} from "@/models/management/localUser.interface";
export const localUserAPIs = {
  getUserList: async (userTypeList?: ELocalUserType[]) => {
    return await client.post<LocalUserListResponse>("local/LocalUserList", {
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
    return await client.post<LocalUserAgentListResponse>("local/LocalUser_ListAgent", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
    });
  },
  create: async (payload: ILocalUserPayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
  update: async (recId: number, payload: ILocalUserPayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { recId, ...payload },
      },
    });
  },
  updateStatus: async (recId: number, payload: ILocalUserPayload["status"]) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { recId, status: payload },
      },
    });
  },
  setNewPassword: async (payload: LocalUserNewPasswordPayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_SetnewPassword", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { ...payload },
      },
    });
  },
};
