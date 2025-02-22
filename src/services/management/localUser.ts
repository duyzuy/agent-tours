import { getAgToken } from "@/utils/common";
import { client } from "../api";
import {
  ELocalUserType,
  LocalUserNewPasswordPayload,
  LocalUserListResponse,
  LocalUserResponse,
  LocalUserAgentListResponse,
  LocalUserUpdatePayload,
  LocalUserCreatePayload,
  LocalUserUpdateStatusPayload,
} from "@/models/management/localUser.interface";
export const localUserAPIs = {
  getUserList: async (userTypeList?: ELocalUserType[]) => {
    return await client.post<LocalUserListResponse>("local/LocalUserList", {
      isAuth: true,
      body: {
        requestObject: {
          userTypeList,
        },
      },
    });
  },
  getAgentList: async () => {
    return await client.post<LocalUserAgentListResponse>("local/LocalUser_ListAgent", {
      isAuth: true,
    });
  },
  create: async (payload: LocalUserCreatePayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Addnew", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  update: async (payload: LocalUserUpdatePayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  updateStatus: async (payload: LocalUserUpdateStatusPayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  setNewPassword: async (payload: LocalUserNewPasswordPayload) => {
    return await client.post<LocalUserResponse>("local/LocalUser_SetnewPassword", {
      isAuth: true,
      body: {
        requestObject: { ...payload },
      },
    });
  },
};
