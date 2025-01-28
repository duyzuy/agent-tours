import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { TagItemResponse, TagListResponse, TagPayload, TagQueryParams } from "@/models/management/tag.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const tagAPIs = {
  create: async (payload: TagPayload) => {
    return await client.post<TagItemResponse>("local/Cms_post_tag_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: TagPayload) => {
    return await client.post<TagItemResponse>("local/Cms_post_tag_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  getList: async (queryParams?: TagQueryParams) => {
    return await client.post<TagListResponse>("local/Cms_post_tag_ListMinimal", {
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
    return await client.post<TagListResponse>("local/Cms_post_tag_ById", {
      isAuth: true,
      body: {
        requestObject: {
          id,
          originId,
        },
      },
    });
  },
  updateStatus: async (payload: { id: number; status: PageContentStatus }) => {
    return await client.post<TagItemResponse>("local/Cms_post_tag_UpdateStatus", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },

  delete: async (id: number) => {
    return await client.post<TagItemResponse>("local/Cms_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "cms_post_tag",
          recId: id,
        },
      },
    });
  },
};
