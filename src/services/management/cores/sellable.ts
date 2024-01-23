import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";

import {
    SellableListRs,
    ISellablePayload,
    SellableConfirmPayload,
    ISellable,
    SellableQueryParams,
} from "@/models/management/core/sellable.interface";

export const sellableAPIs = {
    create: async (payload: ISellablePayload) => {
        return await coreApi.post<BaseResponse<ISellable>, BaseResponse<null>>(
            "core/Sellable_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    approval: async (payload: SellableConfirmPayload) => {
        return await coreApi.post<BaseResponse<ISellable>, BaseResponse<null>>(
            "core/Sellable_Confirm",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    getList: async (params: SellableQueryParams) => {
        return await coreApi.post<SellableListRs, BaseResponse<null>>(
            "core/Sellable_List",
            {
                requestObject: {
                    ...params,
                },
                localUsername: "99",
            },
        );
    },
};
