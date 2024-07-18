"use server";
import { unstable_noStore } from "next/cache";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { BaseResponse } from "@/models/common.interface";
import { ITranslationListFeRs } from "@/models/management/cms/translations.interface";
import { FeMenuListResponse } from "@/models/fe/menu.interface";

export const getPrimaryMenu = async (lang: LangCode) => {
  unstable_noStore();
  const response = await serverRequest.post<FeMenuListResponse, BaseResponse<null>>("/localfront/getCms_frontendMenu", {
    next: { tags: ["feTranslations"], revalidate: 1 },
    params: {
      requestObject: {
        lang: lang,
        menuPosition: "primary",
      },
      pageSize: 9999,
      pageCurrent: 1,
    },
  });

  return response ? response.result[0] : undefined;
};

export const getSecondaryMenu = async (lang: LangCode) => {
  unstable_noStore();
  const response = await serverRequest.post<FeMenuListResponse, BaseResponse<null>>("/localfront/getCms_frontendMenu", {
    next: { tags: ["feTranslations"], revalidate: 1 },
    params: {
      requestObject: {
        lang: lang,
        menuPosition: "secondary",
      },
      pageSize: 9999,
      pageCurrent: 1,
    },
  });

  return response ? response.result[0] : undefined;
};
