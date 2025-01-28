import { client } from "@/services/api";
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
  getDetail: async ({ id, originId }: { id?: number; originId?: number }) => {
    return await client.post<CategoryListLangResponse>("local/Cms_post_category_ById", {
      isAuth: true,
      body: {
        requestObject: {
          id,
          originId,
        },
      },
    });
  },

  create: async (payload: CategoryPayload) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: CategoryPayload) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getParentList: async (queryParams: CategoryQueryParams) => {
    return await client.post<CategoryListResponse>("local/Cms_post_category_ListOnlyParent", {
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
  updateStatus: async (payload: { id: number; status: PageContentStatus }) => {
    return await client.post<CategoryItemResponse>("local/Cms_post_category_UpdateStatus", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  delete: async (id: number) => {
    return await client.post<CategoryItemResponse>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "cms_post_category",
          recId: id,
        },
      },
    });
  },
};
