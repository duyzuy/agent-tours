import { client } from "@/services/api";
import { FeSearchProductFormData, FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { ProductListResponse, TemplateProductListResponse } from "@/models/fe/productItem.interface";
import { FeDestinationSearchConfigResponse } from "@/models/fe/destination.interface";

export const searchTourAPIs = {
  getList: async (payload?: FeSearchTourQueryParams) => {
    return await client.post<ProductListResponse>("localfront/BookingOrder_Search", {
      body: {
        ...payload,
      },
    });
  },
  search: async (payload?: FeSearchProductFormData) => {
    return await client.post<ProductListResponse>("localfront/BookingOrder_Search", {
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  searchTemplate: async (payload?: FeSearchProductFormData) => {
    return await client.post<TemplateProductListResponse>("localfront/SellableTemplate_Search", {
      body: {
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
