"use server";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";

export const getProductList = async ({
    requestObject,
    pageCurrent,
    pageSize,
}: FeSearchTourQueryParams) => {
    return await serverRequest.post<ProductListResponse, BaseResponse<null>>(
        "localfront/BookingOrder_Search",
        {
            next: { tags: ["productListItem"] },
            params: {
                requestObject,
                pageCurrent,
                pageSize,
            },
        },
    );
};
