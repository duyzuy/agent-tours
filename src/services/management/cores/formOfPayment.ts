import { BaseResponse, Status } from "@/models/common.interface";
import { coreApi } from "../coreApi";

import {
  FormOfPaymmentQueryParams,
  FormOfPaymentListRs,
  FormOfPaymentRs,
  CreateFormOfPaymentPayload,
  ApprovalFormOfPaymentPayload,
} from "@/models/management/core/formOfPayment.interface";
export const formOfPaymentAPIs = {
  create: async (payload?: CreateFormOfPaymentPayload) => {
    return await coreApi.post<FormOfPaymentRs, BaseResponse<null>>("core/BookingOrder_Fop_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  approval: async (payload?: ApprovalFormOfPaymentPayload) => {
    return await coreApi.post<FormOfPaymentRs, BaseResponse<null>>("core/FOP_Confirm", {
      requestObject: {
        ...payload,
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
