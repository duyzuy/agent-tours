import {
  MiscDepartLocationResponse,
  MiscDepartLocationsResponse,
  MiscDepartPayload,
} from "@/models/management/cms/miscDepartLocation.interface";

import { client } from "@/services/api";
import { getAgToken } from "@/utils/common";

export const miscDepartAPIs = {
  create: async (payload: MiscDepartPayload) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_DepartFrom_Addnew", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: MiscDepartPayload) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_DepartFrom_Edit", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getList: async () => {
    return await client.post<MiscDepartLocationsResponse>("local/LocalMisc_DepartFrom_List", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {},
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          cat: "localmisc_departfrom",
          type: "localmisc_departfrom",
          recId: id,
        },
      },
    });
  },
};
