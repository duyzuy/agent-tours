import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import {
    ITemplateSaleableListRs,
    ITemplateSellablePayload,
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
};
