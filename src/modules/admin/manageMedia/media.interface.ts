import {
  CreateMediaFolderPayload,
  UpdateMediaFolderPayload,
  MediaFilesQueryParams,
  MediaFolderQueryParams,
  MediaTypes,
} from "@/models/management/media.interface";
import { UploadFile } from "antd";

export class MediaFolderUpdateFormData implements UpdateMediaFolderPayload {
  id?: number;
  folderName?: string;
  parent?: number;
  key?: string;
  constructor(
    id: number | undefined,
    folderName: string | undefined,
    parent: number | undefined,
    key: string | undefined,
  ) {
    this.id = id;
    this.folderName = folderName;
    this.key = key;
    this.parent = parent;
  }
}

export class MediaFolderCreateFormData implements CreateMediaFolderPayload {
  folderName?: string;
  folderSlug?: string;
  parentSlug?: string;
  parent?: number;
  folderPath?: string;
  constructor(
    folderName: string | undefined,
    folderSlug: string | undefined,
    parentSlug: string | undefined,
    parent: number | undefined,
    folderPath: string | undefined,
  ) {
    this.folderName = folderName;
    this.folderSlug = folderSlug;
    this.parentSlug = parentSlug;
    this.parent = parent;
    this.folderPath = folderPath;
  }
}

export class MediaFileQueryParamsFormData implements MediaFilesQueryParams {
  requestObject: { objectType: "MEDIA"; mediaType: MediaTypes[]; mediaInFolderRecid: number };
  pageCurrent: number;
  pageSize: number;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
  constructor(
    requestObject: { mediaType: MediaTypes[]; mediaInFolderRecid: number },
    pageCurrent: number,
    pageSize: number,
    orderBy?: { sortColumn?: string; direction?: "asc" | "desc" },
  ) {
    this.requestObject = { ...requestObject, objectType: "MEDIA" };
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}
export class MediaFolderQueryParamsFormData implements MediaFolderQueryParams {
  requestObject: { objectType: "MEDIA_FOLDER" };
  pageCurrent: number;
  pageSize: number;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
  constructor(
    pageCurrent: number,
    pageSize: number,
    orderBy: { sortColumn?: string; direction?: "asc" | "desc" } | undefined,
  ) {
    this.requestObject = { objectType: "MEDIA_FOLDER" };
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}

export class MediaUploadFormData {
  folderPath: string;
  folderName?: string;
  folderId: number;
  folderSlug: string;
  fileList: UploadFile[];
  constructor(
    folderPath: string,
    folderName: string | undefined,
    folderId: number,
    fileList: UploadFile[],
    folderSlug: string,
  ) {
    this.fileList = fileList;
    this.folderId = folderId;
    this.folderName = folderName;
    this.folderPath = folderPath;
    this.folderSlug = folderSlug;
  }
}
