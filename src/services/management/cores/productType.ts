import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import { IProductTypeRs } from "@/models/management/core/productType.interface";
export const productTypeAPIs = {
  getAll: async () => {
    return await coreApi.post<IProductTypeRs, BaseResponse<null>>("core/MiscProductType", {
      requestObject: {},
    });
  },
};
