import { BaseResponse, Status } from "@/models/common.interface";
import { coreApi } from "../coreApi";

import {
    IFormOfPaymentListRs,
    IFormOfPaymentPayload,
} from "@/models/management/core/formOfPayment.interface";
export const formOfPaymentAPIs = {
    createFormOfPayment: async (payload?: IFormOfPaymentPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_Fop_Addnew",
            {
                requestObject: {
                    ...payload,
                },
            },
        );
    },
    approvalFOP: async (recId?: number) => {
        return await coreApi.post<any, BaseResponse<null>>("core/FOP_Confirm", {
            requestObject: {
                recId,
            },
        });
    },
    delete: async (recId?: number) => {
        return await coreApi.post<any, BaseResponse<null>>("core/FOP_Delete", {
            requestObject: {
                recId,
            },
        });
    },
    getList: async (queryParams?: { status: Status }) => {
        return await coreApi.post<IFormOfPaymentListRs, BaseResponse<null>>(
            "core/FOP_List",
            {
                requestObject: {
                    ...queryParams,
                },
            },
        );
    },
};
