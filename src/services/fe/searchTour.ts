import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";

export const searchTourAPIs = {
    getList: async (payload?: FeSearchTourQueryParams) => {
        return await client.post<ProductListResponse, BaseResponse<null>>(
            "localfront/BookingOrder_Search",
            {
                params: {
                    ...payload,
                },
            },
        );
    },
};
