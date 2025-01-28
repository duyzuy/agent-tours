import { BaseResponse } from "@/models/common.interface";
import { client } from "../api";
import config from "@/configs";
import {
  IMediaFileListRs,
  IMediaFolderListRs,
  CreateMediaFolderPayload,
  UpdateMediaFolderPayload,
  MediaFolderQueryParams,
  MediaFilesQueryParams,
} from "@/models/management/media.interface";
import { getAgToken } from "@/utils/common";

export const localMediaAPIs = {
  getFolders: async (queryParams: MediaFolderQueryParams) => {
    return await client.post<IMediaFolderListRs>("local/Cms_Media", {
      params: {
        requestObject: {
          ...queryParams.requestObject,
          objectType: "MEDIA_FOLDER", //MEDIA_FOLDER
        },
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
        orderBy: queryParams.orderBy,
      },
      isAuth: true,
    });
  },
  getFiles: async (queryParams: MediaFilesQueryParams) => {
    return await client.post<IMediaFileListRs>("local/Cms_Media", {
      params: {
        requestObject: {
          ...queryParams.requestObject,
          objectType: "MEDIA",
        },
        pageCurrent: queryParams.pageCurrent,
        pageSize: queryParams.pageSize,
        orderBy: queryParams.orderBy,
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
  createFolderFromLocal: async (payload: CreateMediaFolderPayload) => {
    const token = getAgToken();

    const response = await fetch(`${config.LOCAL_API_URL}/mediaFolder`, {
      headers: {
        Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFolderListRs["result"][number]);
  },

  updateFolderFromLocal: async (payload?: UpdateMediaFolderPayload) => {
    const token = getAgToken();
    const response = await fetch(`${config.LOCAL_API_URL}/mediaFolder/${payload?.id}`, {
      headers: {
        Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
      },
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFolderListRs["result"][number]);
  },

  uploadMediaFilesFromLocal: async (payload: FormData) => {
    const token = getAgToken();
    const response = await fetch(`${config.LOCAL_API_URL}/mediaUpload`, {
      headers: {
        Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
      },
      method: "POST",
      body: payload,
    });
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data as BaseResponse<null>);
    }
    return Promise.resolve(data as IMediaFileListRs["result"][number]);
  },
};
