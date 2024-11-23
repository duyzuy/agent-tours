import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import {
  VisaTemplateKeyListResponse,
  VisaTemplateKeyPayload,
  VisaTemplateQueryParams,
  VisaTemplateKeyDetailResponse,
  VisaTemplateKeyShortListResponse,
} from "@/models/management/cms/visaTemplate.interface";
import {
  VisaTemplateContentMetaBlockPayload,
  VisaTemplateContentMinimalQueryParams,
  VisaTemplateContentPayload,
  VisaTemplateContentResponse,
  VisaTemplateContentMinimalListResponse,
} from "@/models/management/cms/visaTemplateContent.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
export const visaTemplateAPIs = {
  getTemplateKeyList: async (queryParams?: VisaTemplateQueryParams) => {
    return await client.post<VisaTemplateKeyListResponse>("local/cms_visaTemplateKey_List", {
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
  getTemplateKeyMinimalList: async (queryParams?: VisaTemplateQueryParams) => {
    return await client.post<VisaTemplateKeyShortListResponse>("local/cms_visaTemplateKey_ListMinimal", {
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
  getTemplateContentMinimalList: async (queryParams?: VisaTemplateContentMinimalQueryParams) => {
    return await client.post<VisaTemplateContentMinimalListResponse>("local/cms_visaTemplate_ListMinimal", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...queryParams?.requestObject,
        },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
        orderBy: queryParams?.orderBy,
      },
    });
  },
  getTemplateKeyDetail: async (queryParams?: VisaTemplateQueryParams) => {
    return await client.post<VisaTemplateKeyDetailResponse>("local/cms_visaTemplate_Details", {
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

  createTemplateKey: async (payload?: VisaTemplateKeyPayload) => {
    return await client.post<VisaTemplateKeyListResponse>("local/cms_visaTemplate_Addnew_ByKey", {
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
  updateTemplate: async (payload?: VisaTemplateKeyPayload) => {
    return await client.post<VisaTemplateKeyListResponse>("local/cms_visaTemplate_EditKey", {
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

  updateTemplateContent: async (payload?: VisaTemplateContentPayload) => {
    return await client.post<VisaTemplateContentResponse>("local/cms_visaTemplate_Edit", {
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
    return await client.post<VisaTemplateContentResponse>("local/cms_visaTemplate_UpdateStatus", {
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
    return await client.post<VisaTemplateContentResponse>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          recId,
          type: "DETAILS",
          cat: "cms_visatemplate",
        },
      },
    });
  },

  createTemplateContentBlock: async (payload?: VisaTemplateContentMetaBlockPayload) => {
    return await client.post<VisaTemplateContentResponse>("local/cms_visatemplate_visacontent_Addnew", {
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

  updateTemplateContentBlock: async (payload?: VisaTemplateContentMetaBlockPayload) => {
    return await client.post<VisaTemplateContentResponse>("local/cms_visatemplate_visacontent_Edit", {
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
