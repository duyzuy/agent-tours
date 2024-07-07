"use server";
import { serverRequest } from "@/services/serverApi";
import { LangCode } from "@/models/management/cms/language.interface";
import { VisaDetailsByLangResponse } from "@/models/fe/visa.interface";
import { BaseResponse } from "@/models/common.interface";

export const getVisaDetail = async (payload?: { lang?: LangCode; slug?: string }) => {
  return await serverRequest.post<VisaDetailsByLangResponse, BaseResponse<null>>(
    "localfront/getCms_visatemplateDetails",
    {
      next: { tags: ["visaContent"], revalidate: 1 },
      params: {
        requestObject: {
          lang: payload?.lang,
          slug: payload?.slug,
        },
      },
    },
  );
};
