"use server";
import { FeTemplateContentPayload, FeTemplateContentResponse } from "@/models/fe/templateContent.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";

export const getTemplateContentDetail = async (payload: FeTemplateContentPayload) => {
  const response = await serverRequest.post<FeTemplateContentResponse, BaseResponse<null>>(
    "localfront/getCms_templateDetails",
    {
      next: { tags: ["templateContent"] },

      params: {
        requestObject: {
          ...payload,
        },
      },
    },
  );
  return response?.result[0];
};

export const getSellableListByTemplateId = async (templateId: number) => {
  return await serverRequest.post<ProductListResponse, BaseResponse<null>>(
    "localfront/BookingOrder_SearchByTemplateId",
    {
      next: { tags: ["sellableListByTemplateId"] },

      params: {
        requestObject: {
          byTemplateId: templateId,
        },
      },
    },
  );
};

export const getSellableListByTemplateCode = async (templateCode: string) => {
  const response = await serverRequest.post<ProductListResponse, BaseResponse<null>>(
    "localfront/BookingOrder_SearchByTemplateId",
    {
      next: { tags: ["sellableListByTemplateCode"] },

      params: {
        requestObject: {
          byTemplateCmsIdentity: templateCode,
        },
      },
    },
  );
  return response?.result;
};
