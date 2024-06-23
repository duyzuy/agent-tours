import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
    ITemplateSellableUpdatePayload,
    TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";

export const templateSellableAPIs = {
    create: async (payload: ITemplateSellablePayload) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_Addnew",
            {
                requestObject: {
                    ...payload,
                },
            },
        );
    },
    getTemplateList: async (queryParams?: TemplateSellableQueryParams) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_List",
            {
                requestObject: {
                    ...queryParams?.requestObject,
                },
                pageCurrent: queryParams?.pageCurrent,
                pageSize: queryParams?.pageSize,
            },
        );
    },
    getOneTemplate: async (recId: number) => {
        return await coreApi.post<ITemplateSaleableListRs, BaseResponse<null>>(
            "core/SellableTemplate_List",
            {
                requestObject: {
                    recId,
                },
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
            },
        );
    },
};
