"use server";
import { unstable_noStore } from "next/cache";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { serverRequest } from "@/services/serverApi";
import { ProductListResponse, TemplateProductListResponse } from "@/models/fe/productItem.interface";

export const getTemplateProductList = async ({ requestObject, pageCurrent, pageSize }: FeSearchTourQueryParams) => {
  unstable_noStore();
  const response = await serverRequest.post<TemplateProductListResponse>("localfront/SellableTemplate_Search", {
    next: { tags: ["templateProductList"] },
    cache: "no-cache",
    params: {
      requestObject,
      pageCurrent,
      pageSize,
    },
  });
  return response?.result;
};

export const getTemplateServiceList = async ({ requestObject, pageCurrent, pageSize }: FeSearchTourQueryParams) => {
  unstable_noStore();
  const response = await serverRequest.post<TemplateProductListResponse>("localfront/SellableTemplate_Search", {
    next: { tags: ["templateServiceList"] },
    cache: "no-cache",
    params: {
      requestObject,
      pageCurrent,
      pageSize,
    },
  });
  return response?.result;
};

export const getProductListByTemplateId = async (templateId: number) => {
  const response = await serverRequest.post<ProductListResponse>("localfront/Sellable_List", {
    next: { tags: ["sellableListByTemplateId", templateId.toString()] },
    cache: "no-store",
    params: {
      requestObject: {
        byTemplateId: templateId,
      },
    },
  });
  return response?.result;
};
