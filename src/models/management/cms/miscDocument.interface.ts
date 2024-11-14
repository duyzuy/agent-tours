import { BaseResponse, Status } from "@/models/common.interface";

export interface IMiscDocument {
  cat: "localmisc_documentchecklist";
  id: number;
  name: string;
  descriptions: string;
  link: string;
  status: Status;
}

export interface MiscDocumentPayload {
  id?: number;
  name?: string;
  descriptions?: string;
  link?: string;
  status?: Status;
}
export interface MiscDocumentListResponse extends BaseResponse<IMiscDocument[]> {}
export interface MiscDocumentResponse extends BaseResponse<IMiscDocument> {}
