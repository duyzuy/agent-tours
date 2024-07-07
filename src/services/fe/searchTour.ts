import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import { FeSearchProductFormData, FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { ProductListResponse } from "@/models/fe/productItem.interface";
import { FeDestinationSearchConfigResponse } from "@/models/fe/destination.interface";

export const searchTourAPIs = {
  getList: async (payload?: FeSearchTourQueryParams) => {
    return await client.post<ProductListResponse>("localfront/BookingOrder_Search", {
      params: {
        ...payload,
      },
    });
  },
  search: async (payload?: FeSearchProductFormData) => {
    return await client.post<ProductListResponse>("localfront/BookingOrder_Search", {
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getDestinationsSearch: async () => {
    return await client.post<FeDestinationSearchConfigResponse>("localfront/getLocalMisc_SearchConfig", {});
  },
};
