import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";

import {
  LeadingListResponse,
  LeadingPayload,
  LeadingQueryParams,
  LeadingResponse,
} from "@/models/management/leading.interface";

export const leadingAPIs = {
  getList: async (queryParams?: LeadingQueryParams) => {
    return await client.post<LeadingListResponse>("local/LeadInfo_List", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...queryParams?.requestObject,
        },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  update: async (payload?: LeadingPayload) => {
    return await client.post<LeadingResponse>("local/LeadInfo_Edit", {
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
  createOne: async (payload?: LeadingPayload) => {
    return await client.post<LeadingResponse>("local/LeadInfo_Addnew", {
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
  createMultiple: async (payloadList?: LeadingPayload[]) => {
    return await client.post<LeadingResponse>("local/LeadInfo_AddnewByList", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: payloadList,
      },
    });
  },
};
