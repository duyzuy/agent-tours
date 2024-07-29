"use server";
import { FeTemplateContentPayload, FeTemplateContentResponse } from "@/models/fe/templateContent.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";

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
