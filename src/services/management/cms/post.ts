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

  create: async (payload: PostContentPayload) => {
    return await client.post<PostItemResponse>("local/Cms_post_Addnew", {
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

  getDetail: async ({ id, originId }: { id?: number; originId?: number }) => {
    return await client.post<PostDetailsResponse>("local/Cms_post_ById", {
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

  update: async (payload: PostContentPayload) => {
    return await client.post<PostItemResponse>("local/Cms_post_Edit", {
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

  updateStatus: async (payload: { id: number; status: PageContentStatus }) => {
    return await client.post<PostItemResponse>("local/Cms_post_UpdateStatus", {
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
    return await client.post<PostItemResponse>("local/Cms_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          cat: "cms_post",
          recId: id,
        },
      },
    });
  },
};
