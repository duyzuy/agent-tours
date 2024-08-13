"use server";
import { FeTemplateContentPayload, FeTemplateContentResponse } from "@/models/fe/templateContent.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { FeTravelInformationNoticeResponse } from "@/models/fe/travelNotice.interface";

export const getTemplateContentDetail = async (payload: FeTemplateContentPayload) => {
  const response = await serverRequest.post<FeTemplateContentResponse, BaseResponse<null>>(
    "localfront/getCms_templateDetails",
    {
      next: { tags: ["templateDetailContent"] },
      cache: "no-store",
      params: {
        requestObject: {
          ...payload,
        },
      },
    },
  );
  return response?.result[0];
};

export const getSellableListByTemplateIdNew = async (templateId: number) => {
  const response = await serverRequest.post<ProductListResponse, BaseResponse<null>>("localfront/BookingOrder_Search", {
    next: { tags: ["sellableListByTemplateIdNew"] },
    cache: "no-store",
    params: {
      requestObject: {
        byTemplateId: templateId,
      },
    },
  });
  return response?.result;
};

export const getTravelInformationNotice = async (templateId: number, lang: LangCode) => {
  const response = await serverRequest.post<FeTravelInformationNoticeResponse, BaseResponse<null>>(
    "localfront/SellableTemplate_MustKnow",
    {
      next: { tags: ["travelInformationNotice"] },
      cache: "no-store",
      params: {
        requestObject: {
          byTemplateId: templateId,
          cmsMustKnowLang: lang,
        },
      },
    },
  );
  return response?.result;
};
