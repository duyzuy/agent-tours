import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";

import {
    SellableListRs,
    ISellablePayload,
    SellableConfirmPayload,
    ISellable,
    SellableQueryParams,
    SellableDetail,
} from "@/models/management/core/sellable.interface";
import {
    SellablePriceConfigPayload,
    SellablePriceConfigRs,
} from "@/models/management/core/priceConfig.interface";

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
    getDetail: async (recId?: number) => {
        return await coreApi.post<
            BaseResponse<SellableDetail>,
            BaseResponse<null>
        >("core/Sellable_Details", {
            requestObject: {
                recId,
            },
            localUsername: "99",
        });
    },
    getPriceConfigs: async (sellableRecId?: number) => {
        return await coreApi.post<SellablePriceConfigRs, BaseResponse<null>>(
            "core/Sellable_GetPricingConfigs",
            {
                requestObject: {
                    sellableRecId,
                },
                localUsername: "99",
            },
        );
    },
    updateSellablePriceConfigs: async (payload: SellablePriceConfigPayload) => {
        return await coreApi.post<SellablePriceConfigRs, BaseResponse<null>>(
            "core/Sellable_PricingConfigs",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
};
