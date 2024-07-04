import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import {
  CustomerInformationResponse,
  ICusTomerRegisterPayload,
  ICustomerLoginPayload,
} from "@/models/customerAuth.interface";
export const authAPIs = {
  login: async (payload?: ICustomerLoginPayload) => {
    return await client.post<any>("localfront/Login", {
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  register: async (payload?: ICusTomerRegisterPayload) => {
    return await client.post<CustomerInformationResponse>("localfront/Register", {
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
};
