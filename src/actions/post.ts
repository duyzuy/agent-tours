"use server";
import { unstable_noStore } from "next/cache";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { FePostDetailResponse, FePostListResponse, PostsQueryParamsData } from "@/models/fe/post";
import { LangCode } from "@/models/management/cms/language.interface";

export const getPostListByCategorySlug = async (queryParams: PostsQueryParamsData) => {
  unstable_noStore();
  const { requestObject, pageCurrent, pageSize } = queryParams;
  const response = await serverRequest.post<FePostListResponse, BaseResponse<null>>("localfront/getCms_post_List", {
    next: { tags: ["postList", requestObject.lang] },
    params: {
      requestObject: {
        ...queryParams.requestObject,
      },
      pageCurrent: queryParams.pageCurrent,
      pageSize: queryParams.pageSize,
      orderBy: queryParams.orderBy,
    },
  });
  return response?.result;
};

export const getPostDetail = async (lang: LangCode, slug: string) => {
  unstable_noStore();
  const response = await serverRequest.post<FePostDetailResponse, BaseResponse<null>>(
    "localfront/getCms_post_Details",
    {
      next: { tags: ["postDetail", lang, slug] },
      params: {
        requestObject: {
          lang,
          slug,
        },
      },
    },
  );
  return response?.result;
};
