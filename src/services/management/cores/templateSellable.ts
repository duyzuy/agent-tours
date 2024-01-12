import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
    ITemplateSellableQueryParams,
    ITemplateSellableUpdatePayload,
} from "@/models/management/core/templateSellable.interface";

export const templateSellableAPIs = {
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
    edit: async (recId: number, payload: ITemplateSellableUpdatePayload) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_Edit",
            {
                requestObject: {
                    recId,
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    delete: async (recId: number) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_Delete",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
    confirm: async (recId: number) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_Confirm",
            {
                requestObject: {
                    recId,
                },
                localUsername: "99",
            },
        );
    },
};
