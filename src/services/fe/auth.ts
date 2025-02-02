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
      body: {
        requestObject: payload,
      },
    });
  },
  register: async (payload?: ICusTomerRegisterPayload) => {
    return await client.post<CustomerInformationResponse>("localfront/Register", {
      body: {
        requestObject: payload,
      },
    });
  },
  resetPassword: async (payload?: ICustomerForgotPasswordPayload) => {
    return await client.post<CustomerForgotPasswordResponse>("localfront/resetPassword", {
      body: {
        requestObject: payload,
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
  },
  setNewPassword: async (payload: ICustomerSetPasswordPayload) => {
    return await client.post<any>("localfront/setNewPassword", {
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
};
