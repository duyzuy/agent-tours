import { BaseResponse } from "@/models/common.interface";
import { client } from "../api";
import config from "@/configs";
import {
  IMediaFileListRs,
  IMediaFolderListRs,
  IMediaFolderPayload,
  IMediaFolderUpdatePayload,
  TQueryParamsMediaFiles,
  TQueryParamsMediaFolders,
} from "@/models/management/media.interface";

export const localMediaAPIs = {
  getFolders: async (queryParams: TQueryParamsMediaFolders) => {
    return await client.post<IMediaFolderListRs>("local/Cms_Media", {
      params: {
        requestObject: {
          ...queryParams.requestObject,
          objectType: "MEDIA_FOLDER", //MEDIA_FOLDER
        },
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
      },
      isAuth: true,
    });
  },
  getFiles: async (queryParams: TQueryParamsMediaFiles) => {
    return await client.post<IMediaFileListRs>("local/Cms_Media", {
      params: {
        requestObject: {
          ...queryParams.requestObject,
          objectType: "MEDIA",
        },
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
      },
      isAuth: true,
    });
  },
};

/**
 *
 * APIS excutive on this local
 *
 */
export const mediaApis = {
  createFolderFromLocal: async (token: string, payload: IMediaFolderPayload) => {
    const response = await fetch(`${config.LOCAL_API_URL}/mediaFolder`, {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFolderListRs["result"][0]);
  },

  updateFolderFromLocal: async (token: string, id?: number, payload?: IMediaFolderUpdatePayload) => {
    const response = await fetch(`${config.LOCAL_API_URL}/mediaFolder/${id}`, {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFolderListRs["result"][0]);
  },

  uploadMediaFilesFromLocal: async (token: string, payload: FormData) => {
    const response = await fetch(`${config.LOCAL_API_URL}/mediaUpload`, {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
      method: "POST",
      body: payload,
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFileListRs["result"][0]);
  },
};
