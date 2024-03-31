import { UploadFile } from "antd";
import { BaseResponse } from "./common.interface";
export interface IMedia {
    name: string;
    slug: string;
    type: "image" | "doc" | "folder" | "pdf";
}

export interface IMediaFolderPayload {
    folderName?: string;
    folderSlug?: string;
    parentSlug?: string;
    parent?: number;
    folderPath?: string;
}
export interface IMediaFolderUpdatePayload {
    id?: number;
    folderName?: string;
    oldFolderName?: string;
    parent?: number;
}
export interface IMediaFolder {
    cat: "MEDIA_FOLDER";
    id: number;
    key: string;
    parent: number;
    folderName: string;
    folderSlug: string;
    children: IMediaFolder[];
}

export interface IMediaFile {
    id: number;
    cat: "MEDIA";
    key: string;
    parent: number;
    path: string;
    slug: string;
    type: string;
    fileType: string;
    fullPath: string;
}
export type TQueryParamsMediaFiles = {
    mediaInFolderRecid: number;
    pageCurrent: number;
    pageSize: number;
};

export interface IMediaFilePayload {
    files: UploadFile[];
    folder: Pick<IMediaFolder, "id" | "folderSlug"> & {
        nestedSlug: string[];
    };
}
export class QueryParamsMediaFiles implements TQueryParamsMediaFiles {
    mediaInFolderRecid: number;
    pageCurrent: number;
    pageSize: number;

    constructor(
        mediaInFolderRecid: number,
        pageCurrent: number,
        pageSize: number,
    ) {
        this.mediaInFolderRecid = mediaInFolderRecid;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}
export interface IMediaFolderRs extends BaseResponse<IMediaFolder> {}
export interface IMediaFolderListRs extends BaseResponse<IMediaFolder[]> {}
export interface IMediaFileListRs extends BaseResponse<IMediaFile[]> {}
