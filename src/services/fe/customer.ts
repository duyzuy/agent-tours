import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { CustomerProfilePayload, CustomerProfileResponse } from "@/models/fe/profile.interface";
export const customerAPIs = {
  updateProfile: async ({ payload, token = "" }: { payload?: CustomerProfilePayload; token?: string }) => {
    return await client.post<CustomerProfileResponse>("localfront/editProfile", {
      headers: {
        Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
      },
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getProfile: async (token?: string) => {
    return await client.post<CustomerProfileResponse>("localfront/getProfile", {
      headers: {
        Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
      },
      body: {
        requestObject: {},
      },
    });
  },
};
