import { BaseResponse } from "@/models/common.interface";
import {
  LocalSearchPayload,
  LocalSearchDestinationListRs,
  LocalSearchQueryParams,
  ILocalSeachDestination,
} from "@/models/management/localSearchDestination.interface";
import { client } from "@/services/api";

export const localSearchAPIs = {
  create: async (payload: LocalSearchPayload) => {
    return await client.post<BaseResponse<ILocalSeachDestination>>("local/LocalMisc_SearchConfig_Addnew", {
      params: {
        requestObject: payload,
      },
      isAuth: true,
    });
  },
  update: async (payload: LocalSearchPayload & { id: number }) => {
    return await client.post<BaseResponse<ILocalSeachDestination>>("local/LocalMisc_SearchConfig_Edit", {
      params: {
        requestObject: payload,
      },
      isAuth: true,
    });
  },
  getList: async (queryParams?: LocalSearchQueryParams) => {
    return await client.post<LocalSearchDestinationListRs>("local/LocalMisc_SearchConfig_Get", {
      params: {
        requestObject: queryParams,
      },
      isAuth: true,
    });
  },
};
