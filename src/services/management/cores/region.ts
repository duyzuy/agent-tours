import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import { IStateProvinceListRs } from "@/models/management/region.interface";
export const regionAPIs = {
  getCountryList: async () => {
    return await coreApi.post<IStateProvinceListRs, BaseResponse<null>>("core/CountryListGetall", {
      requestObject: { type: "REGIONLIST" },
    });
  },
};
