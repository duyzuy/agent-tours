import { BaseResponse } from "@/models/common.interface";
import { client } from "../api";
import config from "@/configs";
import {
  IMediaFileListRs,
  IMediaFolderListRs,
  IMediaFolderPayload,
  IMediaFolderUpdatePayload,
  TQueryParamsMediaFiles,
} from "@/models/management/media.interface";

export const localMediaAPIs = {
  getFolders: async () => {
    return await client.post<IMediaFolderListRs, BaseResponse<null>>("local/Cms_Media", {
      params: {
        requestObject: {
          type: "MEDIA_FOLDER", //MEDIA_FOLDER
        },
        pageCurrent: 1,
        pageSize: 10,
      },
      isAuth: true,
    });
  },
  getFiles: async (params: TQueryParamsMediaFiles) => {
    return await client.post<IMediaFileListRs, BaseResponse<null>>("local/Cms_Media", {
      params: {
        requestObject: {
          type: "MEDIA", //MEDIA_FOLDER
          ...params,
        },
      },
      isAuth: true,
    });
  },
};

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
