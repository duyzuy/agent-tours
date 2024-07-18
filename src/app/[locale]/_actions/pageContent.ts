"use server";
import { unstable_noStore } from "next/cache";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { IPageContentDetailPerLangRs } from "@/models/management/cms/pageContent.interface";
import { BaseResponse } from "@/models/common.interface";

export const getPageContentDetail = async (payload?: { lang: LangCode; slug: string }) => {
  unstable_noStore();
  const response = await serverRequest.post<IPageContentDetailPerLangRs, BaseResponse<null>>(
    "localfront/getCms_page_details",
    {
      next: { tags: ["pageContent"] },
      params: {
        requestObject: {
          lang: payload?.lang,
          slug: payload?.slug,
        },
      },
    },
  );
  return response?.result;
};
