"use server";
import { unstable_noStore } from "next/cache";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { BaseResponse } from "@/models/common.interface";
import { FeCategoryResponse } from "@/models/fe/category";

export const getCategoryDetail = async (payload: { lang: LangCode; slug: string }) => {
  unstable_noStore();
  const response = await serverRequest.post<FeCategoryResponse, BaseResponse<null>>(
    "localfront/getCms_post_category_Details",
    {
      next: { tags: ["categpryDetail", payload.lang, payload.slug] },
      params: {
        requestObject: {
          lang: payload.lang,
          slug: payload.slug,
        },
      },
    },
  );
  return response?.result;
};
