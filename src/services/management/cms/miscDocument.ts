import {
  MiscDocumentListResponse,
  MiscDocumentResponse,
  MiscDocumentPayload,
} from "@/models/management/cms/miscDocument.interface";

import { client } from "@/services/api";

export const miscDocumentAPIs = {
  create: async (payload: MiscDocumentPayload) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_DocumentCheckList_Addnew", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  update: async (payload: MiscDocumentPayload) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_DocumentCheckList_Edit", {
      isAuth: true,
      body: {
        requestObject: payload,
      },
    });
  },
  getList: async () => {
    return await client.post<MiscDocumentListResponse>("local/LocalMisc_DocumentCheckList_List", {
      isAuth: true,
      body: {
        requestObject: {},
      },
    });
  },
  delete: async (id: number) => {
    return await client.post<MiscDocumentResponse>("local/LocalMisc_Delete", {
      isAuth: true,
      body: {
        requestObject: {
          cat: "localmisc_documentchecklist",
          type: "localmisc_documentchecklist",
          recId: id,
        },
      },
    });
  },
};
