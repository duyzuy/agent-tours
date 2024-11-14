import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
  SupplierListRs,
  SupplierPayload,
  SupplierQueryParams,
  SupplierRs,
} from "@/models/management/supplier.interface";

export const supplierAPIs = {
  getList: async (queryParams?: SupplierQueryParams) => {
    return await coreApi.post<SupplierListRs, BaseResponse<null>>("core/SourceSupplier_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      pageCurrent: queryParams?.pageCurrent,
      pageSize: queryParams?.pageSize,
    });
  },
  getDetail: async (recId?: number) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Details", {
      requestObject: {
        recId,
        includeVendor: true,
      },
    });
  },
  create: async (payload?: SupplierPayload) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  update: async (payload?: SupplierPayload) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Edit", {
      requestObject: {
        ...payload,
      },
    });
  },
  delete: async (recId?: number) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Delete", {
      requestObject: {
        recId,
      },
    });
  },
  approval: async (recId?: number) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Confirm", {
      requestObject: {
        recId,
      },
    });
  },
  deactive: async (recId?: number) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Deactive", {
      requestObject: {
        recId,
      },
    });
  },
  active: async (recId?: number) => {
    return await coreApi.post<SupplierRs, BaseResponse<null>>("core/SourceSupplier_Active", {
      requestObject: {
        recId,
      },
    });
  },
};
