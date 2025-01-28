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
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getDetail: async (originId?: number) => {
    return await client.post<TravelInformationNoticeListResponse>("local/Cms_travelinfo_mustknow_ById", {
      isAuth: true,
      body: {
        requestObject: {
          originId,
        },
      },
    });
  },

  update: async (payload?: TravelInformationNoticePayload) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_travelinfo_mustknow_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updateStatus: async (payload?: { id?: number; status?: PageContentStatus }) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_travelinfo_mustknow_UpdateStatus", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getList: async (queryParams?: TravelInformationNoticeQueryParams) => {
    return await client.post<TravelInformationNoticeListResponse>("local/Cms_travelinfo_mustknow_ListMinimal", {
      isAuth: true,
      body: {
        requestObject: queryParams?.requestObject,
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<TravelInformationNoticeResponse>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          recId: id,
          cat: "cms_travelinfo_mustknow",
        },
      },
    });
  },
};
