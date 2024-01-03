import { BaseResponse } from "@/models/management/common.interface";
import { coreApi } from "../coreApi";
import { ICountryListRs } from "@/models/management/country.interface";
export const regionAPIs = {
    getCountryList: async () => {
        return await coreApi.post<ICountryListRs, BaseResponse<null>>(
            "core/CountryListGetall",
            {
                requestObject: { type: "REGIONLIST" },
                localUsername: "99",
            },
        );
    },
};
