import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
  DisCountQueryParams,
  IDiscountPolicyPayload,
  IDiscountPolicyListRs,
  IDiscountPolicyRs,
} from "@/models/management/core/discountPolicy.interface";

export const discountAPIs = {
  create: async (payload?: IDiscountPolicyPayload) => {
    return await coreApi.post<IDiscountPolicyRs, BaseResponse<null>>("core/Dc_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  getList: async (queryParams?: DisCountQueryParams) => {
    return await coreApi.post<IDiscountPolicyListRs, BaseResponse<null>>("core/Dc_List", {
      requestObject: { ...queryParams?.requestObject },
      pageCurrent: queryParams?.pageCurrent,
      pageSize: queryParams?.pageSize,
    });
  },
  confirm: async (payload?: { recId: number } | { code: string }) => {
    return await coreApi.post<IDiscountPolicyRs, BaseResponse<null>>("core/Dc_Confirm", {
      requestObject: { ...payload },
    });
  },
  deActive: async (payload?: { recId: number } | { code: string }) => {
    return await coreApi.post<IDiscountPolicyRs, BaseResponse<null>>("core/Dc_Deactive", {
      requestObject: { ...payload },
    });
  },
  checkAvailability: async (payload?: { code?: string; sellableId?: number }) => {
    return await coreApi.post<IDiscountPolicyRs, BaseResponse<null>>("core/Dc_CheckAvailability", {
      requestObject: { ...payload },
    });
  },
};
