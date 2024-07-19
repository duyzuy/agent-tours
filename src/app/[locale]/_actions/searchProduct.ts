"use server";
import { unstable_noStore } from "next/cache";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";

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
