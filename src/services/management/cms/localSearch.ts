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
      body: {
        requestObject: payload,
      },
      isAuth: true,
    });
  },
  update: async (payload: LocalSearchPayload & { id: number }) => {
    return await client.post<BaseResponse<ILocalSeachDestination>>("local/LocalMisc_SearchConfig_Edit", {
      body: {
        requestObject: payload,
      },
      isAuth: true,
    });
  },
  getList: async (queryParams?: LocalSearchQueryParams) => {
    return await client.post<LocalSearchDestinationListRs>("local/LocalMisc_SearchConfig_Get", {
      body: {
        requestObject: queryParams,
      },
      isAuth: true,
    });
  },
};
