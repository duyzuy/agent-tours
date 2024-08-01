import { getAgToken } from "@/utils/common";
import { client } from "@/services/api";
import { BaseResponse } from "@/models/common.interface";

export const settingAPIs = {
  getEmailSetting: async () => {
    return await client.post<BaseResponse<{ type: "GOOGLE_APPPASSWORD"; email: string; appPassword: string }>>(
      "local/LocalMisc_GoogleEmailAppPassword_Get",
      {
        headers: {
          Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
        },
        params: {
          requestObject: {},
        },
      },
    );
  },
  updateEmailSetting: async (payload: { email: string; appPassword: string }) => {
    return await client.post<BaseResponse<{ type: "GOOGLE_APPPASSWORD"; email: string; appPassword: string }>>(
      "local/LocalMisc_GoogleEmailAppPassword_Edit",
      {
        headers: {
          Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
        },
        params: {
          requestObject: { ...payload },
        },
      },
    );
  },
};
