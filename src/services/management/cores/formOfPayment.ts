import { BaseResponse, Status } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { IFormOfPaymentPayload } from "@/app/portal/manage-booking/[orderId]/modules/formOfPayment.interface";
import { IFormOfPaymentListRs } from "@/models/management/core/formOfPayment.interface";
export const formOfPaymentAPIs = {
    createFormOfPayment: async (payload?: IFormOfPaymentPayload) => {
        return await coreApi.post<any, BaseResponse<null>>(
            "core/BookingOrder_Fop_Addnew",
            {
                requestObject: {
                    ...payload,
                },
                localUsername: "99",
            },
        );
    },
    approvalFOP: async (recId?: number) => {
        return await coreApi.post<any, BaseResponse<null>>("core/FOP_Confirm", {
            requestObject: {
                recId,
            },
            localUsername: "99",
        });
    },
    delete: async (recId?: number) => {
        return await coreApi.post<any, BaseResponse<null>>("core/FOP_Delete", {
            requestObject: {
                recId,
            },
            localUsername: "99",
        });
    },
    getList: async (queryParams?: { status: Status }) => {
        return await coreApi.post<IFormOfPaymentListRs, BaseResponse<null>>(
            "core/FOP_List",
            {
                requestObject: {
                    ...queryParams,
                },
                localUsername: "99",
            },
        );
    },
};
