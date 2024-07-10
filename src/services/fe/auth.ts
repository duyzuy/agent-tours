import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import {
  CustomerForgotPasswordResponse,
  CustomerInformationResponse,
  ICusTomerRegisterPayload,
  ICustomerForgotPasswordPayload,
  ICustomerLoginPayload,
  ICustomerSetPasswordPayload,
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
  resetPassword: async (payload?: ICustomerForgotPasswordPayload) => {
    return await client.post<CustomerForgotPasswordResponse>("localfront/resetPassword", {
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getResetPassword: async (secretKey?: string) => {
    try {
      const response = await fetch(`${process.env.API_ROOT}/localfront/resetPassword?secretKey=${secretKey}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return Promise.resolve(data as string);
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      throw new Error(message);
    }

    // return await client.get<boolean>("localfront/resetPassword", {
    //   params: {
    //     secretKey,
    //   },
    // });
  },
  setNewPassword: async (payload: ICustomerSetPasswordPayload) => {
    return await client.post<any>("localfront/setNewPassword", {
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
};
