import { BaseResponse } from "@/models/common.interface";
import { IMedia, IMediaFile } from "../media.interface";

export interface IDocument {
  documentCheckListId: number;
  cat: "DOCUMENT";
  bookingOrderId: number;
  bookingPaxId: number;
  sellableId: number;
  documentName: string;
  documentDescription: string;
  remark: string;
  attachedMedias:
    | {
        id: number;
        objectType: "MEDIA";
        path: string;
        slug: string;
        mediaType: IMediaFile["mediaType"];
        extension: IMediaFile["extension"];
        fullPath: string;
      }[]
    | null;
  status: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED";
}

export interface CreateDocumentPayload {
  bookingPaxId?: number;
  documentName?: string;
  documentDescription?: string;
  remark?: string;
  attachedMedias: {
    id: number;
    objectType: "MEDIA";
    path: string;
    slug: string;
    mediaType: IMediaFile["mediaType"];
    extension: IMediaFile["extension"];
    fullPath: string;
  }[];
  status?: "NEW" | "NOT_FINISHED" | "FINISHED" | "HANDOVERED";
}
export interface UpdateDocumentPayload {
  documentCheckListId?: number;
  remark?: string;
  attachedMedias: {
    id: number;
    objectType: "MEDIA";
    path: string;
    slug: string;
    mediaType: IMediaFile["mediaType"];
    extension: IMediaFile["extension"];
    fullPath: string;
  }[];
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
