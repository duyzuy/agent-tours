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
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: IPageContentPayload) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getList: async (queryParams?: PageContentQueryParams) => {
    return await client.post<IPageContentListRs>("local/Cms_page_List", {
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
  getListMinimal: async (queryParams?: PageContentMinimalQueryParams) => {
    return await client.post<IPageContentMinimalListRs>("local/Cms_page_ListMinimal", {
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
  getParentListByLang: async (queryParams?: PageContentQueryParams) => {
    return await client.post<IPageContentListRs>("local/Cms_page_ListOnlyParent", {
      isAuth: true,
      body: {
        requestObject: { ...queryParams?.requestObject },
        pageCurrent: queryParams?.pageCurrent,
        pageSize: queryParams?.pageSize,
      },
    });
  },
  getDetail: async (payload: { id: number } | { originId: number }) => {
    return await client.post<IPageContentDetailRs>("local/getCms_page_byId", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  publish: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Publish", {
      isAuth: true,
      body: {
        requestObject: {
          id,
        },
      },
    });
  },
  unPublish: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_page_Unpublish", {
      isAuth: true,
      body: {
        requestObject: {
          id,
        },
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<IPageContentDetailPerLangRs>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "cms_page",
          recId: id,
        },
      },
    });
  },
};
