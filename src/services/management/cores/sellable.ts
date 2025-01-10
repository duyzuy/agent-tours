import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";

import {
  SellableListRs,
  ISellablePayload,
  SellableApprovalPayload,
  ISellable,
  SellableQueryParams,
  SellableDetail,
  SellableCodeListResponse,
} from "@/models/management/core/sellable.interface";
import { SellablePriceConfigPayload, SellablePriceConfigRs } from "@/models/management/core/priceConfig.interface";

export const sellableAPIs = {
  create: async (payload: ISellablePayload) => {
    return await coreApi.post<BaseResponse<ISellable>, BaseResponse<null>>("core/Sellable_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  approval: async (payload: SellableApprovalPayload) => {
    return await coreApi.post<BaseResponse<ISellable>, BaseResponse<null>>("core/Sellable_Confirm", {
      requestObject: {
        ...payload,
      },
    });
  },
  getList: async (queryParams?: SellableQueryParams) => {
    return await coreApi.post<SellableListRs, BaseResponse<null>>("core/Sellable_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      pageCurrent: queryParams?.pageCurrent,
      pageSize: queryParams?.pageSize,
    });
  },
  getListCodes: async (code?: string) => {
    return await coreApi.post<SellableCodeListResponse, BaseResponse<null>>("core/GetList_SellableCode", {
      requestObject: {
        code,
      },
    });
  },
  getDetail: async (recId?: number) => {
    return await coreApi.post<BaseResponse<SellableDetail>, BaseResponse<null>>("core/Sellable_Details", {
      requestObject: {
        recId,
      },
    });
  },
  getPriceConfigs: async (sellableRecId?: number) => {
    return await coreApi.post<SellablePriceConfigRs, BaseResponse<null>>("core/Sellable_GetPricingConfigs", {
      requestObject: {
        sellableRecId,
      },
    });
  },
  updateSellablePriceConfigs: async (payload: SellablePriceConfigPayload) => {
    return await coreApi.post<SellablePriceConfigRs, BaseResponse<null>>("core/Sellable_PricingConfigs", {
      requestObject: {
        ...payload,
      },
    });
  },
};
