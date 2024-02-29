import { BaseResponse } from "@/models/management/common.interface";
import {
    LocalSearchPayload,
    LocalSearchListRs,
    LocalSearchQueryParams,
} from "@/models/management/localSearchDestination.interface";
import { client } from "@/services/api";

export const localSearchAPIs = {
    create: async (payload: LocalSearchPayload) => {
        return await client.post<LocalSearchListRs, BaseResponse<null>>(
            "local/LocalMisc_SearchConfig_Addnew",
            {
                params: {
                    requestObject: {
                        ...payload,
                    },
                },
                isAuth: true,
            },
        );
    },
    getList: async (queryParams?: LocalSearchQueryParams) => {
        return await client.post<LocalSearchListRs, BaseResponse<null>>(
            "local/LocalMisc_SearchConfig_Get",
            {
                params: {
                    requestObject: {
                        ...queryParams,
                    },
                },
                isAuth: true,
            },
        );
    },
};
