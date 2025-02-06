import { client } from "../api";
import {
  MemberListResponse,
  MemberQueryParams,
  MemberResponse,
  UpdateMemberPayload,
} from "@/models/management/member.interface";
export const membersAPIs = {
  getList: async (queryParams?: MemberQueryParams) => {
    return await client.post<MemberListResponse>("local/B2cUser_List", {
      isAuth: true,
      body: {
        requestObject: queryParams?.requestObject,
        orderBy: queryParams?.orderBy,
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  update: async (payload: UpdateMemberPayload) => {
    return await client.post<MemberResponse>("local/B2cUser_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  resetPassword: async (recId?: number) => {
    return await client.post<MemberResponse>("local/B2cUser_ResetPassword", {
      isAuth: true,
      body: {
        requestObject: {
          recId,
        },
      },
    });
  },
};
