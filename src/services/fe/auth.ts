import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";
import {
    CustomerInformationResponse,
    ICusTomerRegisterPayload,
    ICustomerLoginPayload,
} from "@/models/customerAuth.interface";
export const authAPIs = {
    login: async (payload?: ICustomerLoginPayload) => {
        return await client.post<any, BaseResponse<null>>("localfront/Login", {
            // headers: {
            //     Authorization: `Bearer ${encodeURIComponent(
            //         getAgToken() || "",
            //     )}`,
            // },
            params: {
                requestObject: {
                    ...payload,
                },
            },
        });
    },
    register: async (payload?: ICusTomerRegisterPayload) => {
        return await client.post<
            CustomerInformationResponse,
            BaseResponse<null>
        >("localfront/Register", {
            params: {
                requestObject: {
                    ...payload,
                },
            },
        });
    },
    getProfile: async (payload?: ICusTomerRegisterPayload) => {
        return await client.post<any, BaseResponse<null>>(
            "localfront/getProfile",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                // params: {
                //     requestObject: {
                //         ...payload,
                //     },
                // },
            },
        );
    },
};
