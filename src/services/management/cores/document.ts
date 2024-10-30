import { DocumentListResponse, DocumentPayload, DocumentResponse } from "@/models/management/core/document.interface";
import { coreApi } from "../coreApi";

export const documentAPIs = {
  create: async (payload: DocumentPayload) => {
    return await coreApi.post<DocumentResponse>("core/PassengerDocumentCheckList_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  update: async (payload: { documentCheckListId: number } & Pick<DocumentPayload, "status">) => {
    return await coreApi.post<DocumentResponse>("core/PassengerDocumentCheckList_Update", {
      requestObject: {
        ...payload,
      },
    });
  },
  getList: async (bookingPaxId: number) => {
    return await coreApi.post<DocumentListResponse>("core/PassengerDocumentCheckList_GetByPassenger", {
      requestObject: {
        bookingPaxId,
      },
    });
  },
};
