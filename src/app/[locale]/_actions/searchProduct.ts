"use server";
import { unstable_noStore } from "next/cache";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse, TemplateProductListResponse } from "@/models/fe/productItem.interface";

export const getProductList = async ({ requestObject, pageCurrent, pageSize }: FeSearchTourQueryParams) => {
  unstable_noStore();
  const response = await serverRequest.post<ProductListResponse, BaseResponse<null>>("localfront/BookingOrder_Search", {
    next: { tags: ["productListItemByDestination"], revalidate: 1 },
    params: {
      requestObject,
      pageCurrent,
      pageSize,
    },
  });
  return response?.result;
};

export const getTemplateProductList = async ({ requestObject, pageCurrent, pageSize }: FeSearchTourQueryParams) => {
  unstable_noStore();
  const response = await serverRequest.post<TemplateProductListResponse, BaseResponse<null>>(
    "localfront/SellableTemplate_Search",
    {
      next: { tags: ["templateProductList"], revalidate: 1 },
      cache: "no-cache",
      params: {
        requestObject,
        pageCurrent,
        pageSize,
      },
    },
  );
  return response?.result;
};

export const getProductListByTemplateCMSIdentity = async (templateCMSIdentity: string, pageSize: number) => {
  unstable_noStore();
  const response = await serverRequest.post<ProductListResponse, BaseResponse<null>>("localfront/BookingOrder_Search", {
    next: { tags: ["productListByTemplateCMSIdentity", templateCMSIdentity, pageSize.toString()] },
    cache: "no-store",
    params: {
      requestObject: {
        byTemplateCmsIdentity: templateCMSIdentity,
      },
      pageCurrent: 1,
      pageSize,
    },
  });
  return response?.result;
};

export const getProductListByTemplateId = async (templateId: number) => {
  const response = await serverRequest.post<ProductListResponse, BaseResponse<null>>("localfront/BookingOrder_Search", {
    next: { tags: ["productListByTemplateId"] },
    cache: "no-store",
    params: {
      requestObject: {
        byTemplateId: templateId,
      },
    },
  });
  return response?.result;
};
