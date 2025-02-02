import { client } from "@/services/api";
import {
  CustomerProfilePayload,
  CustomerProfileResponse,
  CustomerUpdateProfileResponse,
} from "@/models/fe/profile.interface";
import { getAccessToken } from "@/utils/common";
export const customerAPIs = {
  updateProfile: async (payload?: CustomerProfilePayload) => {
    const accessToken = getAccessToken();
    return await client.post<CustomerUpdateProfileResponse>("localfront/editProfile", {
      headers: {
        Authorization: accessToken ? `Bearer ${encodeURIComponent(accessToken)}` : "",
      },
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getProfile: async () => {
    const accessToken = getAccessToken();
    return await client.post<CustomerProfileResponse>("localfront/getProfile", {
      headers: {
        Authorization: accessToken ? `Bearer ${encodeURIComponent(accessToken)}` : "",
      },
      body: {
        requestObject: {},
      },
    });
  },
};
