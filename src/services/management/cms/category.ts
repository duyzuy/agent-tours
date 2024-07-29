import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";

import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import {
  CategoryListResponse,
  CategoryPayload,
  CategoryQueryParams,
  CategoryItemResponse,
  CategoryListLangResponse,
} from "@/models/management/category.interface";

export const categoryAPIs = {
  getListMinimal: async (queryParams?: CategoryQueryParams) => {
    return await client.post<CategoryListResponse>("local/Cms_post_category_ListMinimal", {
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
  getDetail: async ({ id, originId }: { id?: number; originId?: number }) => {
    return await client.post<CategoryListLangResponse>("local/Cms_post_category_ById", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          id,
          originId,
        },
      },
    });
  },

  create: async (payload: CategoryPayload) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_Addnew", {
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
  update: async (payload: CategoryPayload) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_Edit", {
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
  getParentList: async (queryParams: CategoryQueryParams) => {
    return await client.post<CategoryListResponse>("local/Cms_post_category_ListOnlyParent", {
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
  updateStatus: async (payload: { id: number; status: PageContentStatus }) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_UpdateStatus", {
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

  delete: async (id: number) => {
    return await client.post<CategoryItemResponse>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          cat: "cms_post_category",
          recId: id,
        },
      },
    });
  },
};
