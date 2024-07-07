import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import {
  CMSTemplateListRs,
  CMSTemplateRs,
  CMSTemplatePayload,
  CMSTemplateQueryParams,
  ICMSTemplate,
  CMSTemplateContentRs,
  CMSTemplateMinimalListRs,
} from "@/models/management/cms/cmsTemplate.interface";
import {
  CMSTemplateContentPayload,
  CMSTemplateContentListRs,
  ICMSTemplateContent,
  CMSTemplateContentMetaDataPayload,
  ICMSTemplateContentMetaData,
  CMSTemplateContentMetaDataRs,
} from "@/models/management/cms/cmsTemplateContent.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
export const cmsTemplateAPIs = {
  create: async (payload?: CMSTemplatePayload) => {
    return await client.post<ICMSTemplateContent>("local/cms_template_Addnew_ByKey", {
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
  createContent: async (payload?: CMSTemplateContentPayload) => {
    return await client.post<ICMSTemplate>("local/cms_template_Addnew", {
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
  getList: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateListRs>("local/cms_templateKey_List", {
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
  getMinimalList: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateMinimalListRs>("local/cms_templateKey_ListMinimal", {
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
  getDetailsTemplateKey: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateContentListRs>("local/cms_template_Details", {
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
  getListContent: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateContentListRs>("local/cms_template_List", {
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
  updateTemplateContent: async (payload?: CMSTemplateContentPayload) => {
    return await client.post<CMSTemplateContentListRs>("local/cms_template_Edit", {
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

  updateStatusTemplateContent: async (payload?: { id: number; status: PageContentStatus }) => {
    return await client.post<CMSTemplateContentListRs>("local/cms_template_UpdateStatus", {
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

  updateTemplate: async (payload?: CMSTemplatePayload) => {
    return await client.post<CMSTemplateRs>("local/cms_template_EditKey", {
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
  createTemplateContentIncludeAndNote: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_includedandnote_Addnew", {
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
  updateTemplateContentIncludeAndNote: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_includedandnote_Edit", {
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
  createTemplateContentItinerary: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_itinerary_Addnew", {
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
  updateTemplateContentItinerary: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_itinerary_Edit", {
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
  deleteTemplateContent: async (recId?: number) => {
    return await client.post<CMSTemplateContentRs>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          recId,
          type: "DETAILS",
          cat: "cms_template",
        },
      },
    });
  },
};
