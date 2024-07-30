import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import {
  IPageContentPayload,
  IPageContentDetailRs,
  IPageContentListRs,
  IPageContentDetailPerLangRs,
  PageContentQueryParams,
  PageContentMinimalQueryParams,
  IPageContentMinimalListRs,
} from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
export const pageContentAPIs = {
  create: async (payload: IPageContentPayload) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Addnew", {
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
  update: async (payload: IPageContentPayload) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Edit", {
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
  getList: async (queryParams?: PageContentQueryParams) => {
    return await client.post<IPageContentListRs>("local/Cms_page_List", {
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
  getListMinimal: async (queryParams?: PageContentMinimalQueryParams) => {
    return await client.post<IPageContentMinimalListRs>("local/Cms_page_ListMinimal", {
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
  getParentListByLang: async (queryParams?: PageContentQueryParams) => {
    return await client.post<IPageContentListRs>("local/Cms_page_ListOnlyParent", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: { ...queryParams?.requestObject },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  getDetail: async (payload: { id: number } | { originId: number }) => {
    return await client.post<IPageContentDetailRs>("local/getCms_page_byId", {
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
  publish: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Publish", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          id,
        },
      },
    });
  },
  unPublish: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Unpublish", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          id,
        },
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          cat: "cms_page",
          recId: id,
        },
      },
    });
  },
};
