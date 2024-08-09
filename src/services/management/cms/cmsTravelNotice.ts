import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import {
  TravelInformationNoticeResponse,
  TravelInformationNoticeListResponse,
  TravelInformationNoticePayload,
  TravelInformationNoticeQueryParams,
} from "@/models/management/cms/cmsStateProvinceNotice";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const cmsTravelNoticeAPIs = {
  create: async (payload?: TravelInformationNoticePayload) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_travelinfo_mustknow_Addnew", {
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
  getDetail: async (originId?: number) => {
    return await client.post<TravelInformationNoticeListResponse>("local/Cms_travelinfo_mustknow_ById", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          originId,
        },
      },
    });
  },

  update: async (payload?: TravelInformationNoticePayload) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_travelinfo_mustknow_Edit", {
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
  updateStatus: async (payload?: { id?: number; status?: PageContentStatus }) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_travelinfo_mustknow_UpdateStatus", {
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
  getList: async (queryParams?: TravelInformationNoticeQueryParams) => {
    return await client.post<TravelInformationNoticeListResponse>("local/Cms_travelinfo_mustknow_ListMinimal", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: queryParams?.requestObject,
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          recId: id,
          cat: "cms_travelinfo_mustknow",
        },
      },
    });
  },
};
