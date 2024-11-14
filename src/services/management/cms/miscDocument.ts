import {
  MiscDocumentListResponse,
  MiscDocumentResponse,
  MiscDocumentPayload,
} from "@/models/management/cms/miscDocument.interface";

import { client } from "@/services/api";
import { getAgToken } from "@/utils/common";

export const miscDocumentAPIs = {
  create: async (payload: MiscDocumentPayload) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_DocumentCheckList_Addnew", {
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
  update: async (payload: MiscDocumentPayload) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_DocumentCheckList_Edit", {
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
    return await client.post<MiscDocumentListResponse>("local/LocalMisc_DocumentCheckList_List", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {},
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_Delete", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(getAgToken() || "")}`,
      },
      params: {
        requestObject: {
          cat: "localmisc_documentchecklist",
          type: "localmisc_documentchecklist",
          recId: id,
        },
      },
    });
  },
};
