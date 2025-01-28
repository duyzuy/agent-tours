import { UploadFile } from "antd";
import { BaseResponse } from "../common.interface";
export interface IMedia {
  name: string;
  slug: string;
  type: "image" | "doc" | "folder" | "pdf";
}

export enum MediaTypes {
  IMAGE = "IMAGE",
  FILE = "FILE",
  ICON = "ICON",
}
export enum ExtensionType {
  DOCX = "docx",
  XLSX = "xlsx",
  JPEG = "jpeg",
  PNG = "png",
  JPG = "jpg",
  GIF = "gif",
  SVG = "svg",
  PDF = "pdf",
}

export interface IMediaFolder {
  cat: string;
  id: number;
  key: string;
  parent: number;
  folderName: string;
  folderSlug: string;
  children: IMediaFolder[];
}

export interface IMediaFile {
  cat: "MEDIA";
  id: number;
  key: string;
  parent: number;
  path: string;
  slug: string;
  mediaType: MediaTypes;
  extension: ExtensionType;
  fullPath: string;
  thumb: string;
}

export type MediaFilesQueryParams = {
  requestObject: { objectType: "MEDIA"; mediaType: MediaTypes[]; mediaInFolderRecid: number };
  pageCurrent: number;
  pageSize: number;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
};

export type MediaFolderQueryParams = {
  requestObject: { objectType: "MEDIA_FOLDER" };
  pageCurrent: number;
  pageSize: number;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
};

export interface CreateMediaFolderPayload {
  folderName?: string;
  folderSlug?: string;
  parentSlug?: string;
  parent?: number;
  folderPath?: string;
  key?: string;
}
export interface UpdateMediaFolderPayload {
  id?: number;
  folderName?: string;
  key?: string;
  parent?: number;
}

export interface IMediaFilePayload {
  files: UploadFile[];
  folder: Pick<IMediaFolder, "id" | "folderSlug"> & {
    nestedSlug: string[];
  };
}

export interface IMediaFolderRs extends BaseResponse<IMediaFolder> {}
export interface IMediaFolderListRs extends BaseResponse<IMediaFolder[]> {}
export interface IMediaFileListRs extends BaseResponse<IMediaFile[]> {}
