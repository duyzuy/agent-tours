import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { LangCode } from "@/models/management/cms/language.interface";

import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import {
  PostListResponse,
  PostContentPayload,
  PostQueryParams,
  PostItemResponse,
  PostDetailsResponse,
} from "@/models/management/post.interface";

export const postAPIs = {
  getListMinimal: async (queryParams?: PostQueryParams) => {
    return await client.post<PostListResponse>("local/Cms_post_ListMinimal", {
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

  create: async (payload: PostContentPayload) => {
    return await client.post<PostItemResponse>("local/Cms_post_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  getDetail: async ({ id, originId }: { id?: number; originId?: number }) => {
    return await client.post<PostDetailsResponse>("local/Cms_post_ById", {
      isAuth: true,
      body: {
        requestObject: {
          id,
          originId,
        },
      },
    });
  },

  update: async (payload: PostContentPayload) => {
    return await client.post<PostItemResponse>("local/Cms_post_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  updateStatus: async (payload: { id: number; status: PageContentStatus }) => {
    return await client.post<PostItemResponse>("local/Cms_post_UpdateStatus", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  delete: async (id: number) => {
    return await client.post<PostItemResponse>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "cms_post",
          recId: id,
        },
      },
    });
  },
};
