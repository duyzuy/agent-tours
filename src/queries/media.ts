import { useQuery } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS, GET_MEDIA_FILES } from "./var";
import { localMediaAPIs } from "@/services/management/localMedia";
import { TQueryParamsMediaFiles, TQueryParamsMediaFolders } from "@/models/management/media.interface";

export const useGetMediaFolders = (params: TQueryParamsMediaFolders) => {
  return useQuery({
    queryKey: [GET_MEDIA_FOLDERS, { pageCurrent: params.pageCurrent, pageSize: params.pageSize }],
    queryFn: () => localMediaAPIs.getFolders(params),
    select: (data) => {
      return {
        list: data.result,
        pageCurrent: data.pageCurrent,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
      };
    },
  });
};

export const useGetMediaFiles = (qeryParams: TQueryParamsMediaFiles) => {
  return useQuery({
    queryKey: [
      GET_MEDIA_FILES,
      {
        folderId: qeryParams.requestObject.mediaInFolderRecid,
        mediaType: qeryParams.requestObject.mediaType,
        pageCurrent: qeryParams.pageCurrent,
        pageSize: qeryParams.pageSize,
      },
    ],
    queryFn: () => localMediaAPIs.getFiles(qeryParams),

    select: (data) => {
      return {
        list: data.result,
        pageCurrent: data.pageCurrent,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
      };
    },
  });
};
