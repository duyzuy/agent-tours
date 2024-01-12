import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
    ITemplateSellableQueryParams,
    ITemplateSellableUpdatePayload,
} from "@/models/management/core/templateSellable.interface";

export const sellableAPIs = {
    create: async (payload: ITemplateSellablePayload) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    getTemplateList: async (queryParams: ITemplateSellableQueryParams) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_List",
            {
                requestObject: {
                    ...queryParams,
                },
                localUsername: "99",
            },
        );
    },
};
