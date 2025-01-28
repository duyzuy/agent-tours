import {
  MiscDepartLocationResponse,
  MiscDepartLocationsResponse,
  MiscDepartPayload,
} from "@/models/management/cms/miscDepartLocation.interface";
import { client } from "@/services/api";

export const miscDepartAPIs = {
  create: async (payload: MiscDepartPayload) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_DepartFrom_Addnew", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  update: async (payload: MiscDepartPayload) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_DepartFrom_Edit", {
      isAuth: true,
      body: {
        requestObject: {
          ...payload,
        },
      },
    });
  },
  getList: async () => {
    return await client.post<MiscDepartLocationsResponse>("local/LocalMisc_DepartFrom_List", {
      isAuth: true,
      body: {
        requestObject: {},
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<MiscDepartLocationResponse>("local/LocalMisc_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "localmisc_departfrom",
          type: "localmisc_departfrom",
          recId: id,
        },
      },
    });
  },
};
