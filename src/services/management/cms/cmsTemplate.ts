import { client } from "@/services/api";
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
  CMSTemplateContentItemRs,
  CMSTemplateContentMetaDataRs,
  CMSTemplateContentMinimalListRs,
  CMSTemplateContentMinimalQueryParams,
} from "@/models/management/cms/cmsTemplateContent.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const cmsTemplateAPIs = {
  create: async (payload?: CMSTemplatePayload) => {
    return await client.post<ICMSTemplateContent>("local/cms_template_Addnew_ByKey", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  createContent: async (payload?: CMSTemplateContentPayload) => {
    return await client.post<ICMSTemplate>("local/cms_template_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getList: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateListRs>("local/cms_templateKey_List", {
      isAuth: true,
      body: {
        requestObject: {
          ...queryParams?.requestObject,
        },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  getMinimalContentList: async (queryParams?: CMSTemplateContentMinimalQueryParams) => {
    return await client.post<CMSTemplateContentMinimalListRs>("local/cms_template_ListMinimal", {
      isAuth: true,
      body: {
        requestObject: {
          ...queryParams?.requestObject,
        },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
        orderBy: queryParams?.orderBy,
      },
    });
  },
  getMinimalList: async (queryParams?: CMSTemplateQueryParams) => {
    return await client.post<CMSTemplateMinimalListRs>("local/cms_templateKey_ListMinimal", {
      isAuth: true,
      body: {
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
      isAuth: true,
      body: {
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
      isAuth: true,
      body: {
        requestObject: {
          ...queryParams?.requestObject,
        },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  updateTemplateContent: async (payload?: CMSTemplateContentPayload) => {
    return await client.post<CMSTemplateContentItemRs>("local/cms_template_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  updateStatusTemplateContent: async (payload?: { id: number; status: PageContentStatus }) => {
    return await client.post<CMSTemplateContentItemRs>("local/cms_template_UpdateStatus", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  updateTemplate: async (payload?: CMSTemplatePayload) => {
    return await client.post<CMSTemplateRs>("local/cms_template_EditKey", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  createTemplateContentIncludeAndNote: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_includedandnote_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updateTemplateContentIncludeAndNote: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_includedandnote_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  createTemplateContentItinerary: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_itinerary_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  updateTemplateContentItinerary: async (payload?: CMSTemplateContentMetaDataPayload) => {
    return await client.post<CMSTemplateContentMetaDataRs>("local/cms_template_itinerary_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  deleteTemplateContent: async (recId?: number) => {
    return await client.post<CMSTemplateContentRs>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          recId,
          type: "DETAILS",
          cat: "cms_template",
        },
      },
    });
  },
};
