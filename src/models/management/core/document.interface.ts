import { BaseResponse } from "@/models/common.interface";

export interface IDocument {
  documentCheckListId: number;
  cat: "DOCUMENT";
  bookingOrderId: number;
  bookingPaxId: number;
  sellableId: number;
  documentName: string;
  documentDescription: string;
  remark: string;
  status: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED";
}

export interface DocumentPayload {
  bookingPaxId?: number;
  documentName?: string;
  documentDescription?: string;
  status?: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED";
}
export class DocumentFormData {
  bookingPaxId?: number;
  documentName?: string;
  documentDescription?: string;
  status?: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED";
  constructor(
    bookingPaxId: number | undefined,
    documentName: string | undefined,
    documentDescription: string | undefined,
    status: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED" | undefined,
  ) {
    this.bookingPaxId = bookingPaxId;
    this.documentName = documentName;
    this.documentDescription = documentDescription;
    this.status = status;
  }
}
export interface DocumentListResponse extends BaseResponse<IDocument[]> {}
export interface DocumentResponse extends BaseResponse<IDocument> {}
