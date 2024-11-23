import { BaseResponse, Status } from "@/models/common.interface";
import { coreApi } from "../coreApi";

import {
  FormOfPaymmentQueryParams,
  FormOfPaymentListRs,
  FormOfPaymentRs,
  FormOfPaymentPayload,
} from "@/models/management/core/formOfPayment.interface";
export const formOfPaymentAPIs = {
  createFormOfPayment: async (payload?: FormOfPaymentPayload) => {
    return await coreApi.post<FormOfPaymentRs, BaseResponse<null>>("core/BookingOrder_Fop_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  approvalFOP: async (recId?: number) => {
    return await coreApi.post<FormOfPaymentRs, BaseResponse<null>>("core/FOP_Confirm", {
      requestObject: {
        recId,
      },
    });
  },
  delete: async (recId?: number) => {
    return await coreApi.post<FormOfPaymentRs, BaseResponse<null>>("core/FOP_Delete", {
      requestObject: {
        recId,
      },
    });
  },
  getList: async (queryParams?: FormOfPaymmentQueryParams) => {
    return await coreApi.post<FormOfPaymentListRs, BaseResponse<null>>("core/FOP_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      pageCurrent: queryParams?.pageCurrent,
      pageSize: queryParams?.pageSize,
    });
  },
};
