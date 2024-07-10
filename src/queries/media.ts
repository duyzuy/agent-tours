import { useQuery } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS, GET_MEDIA_FILES } from "./var";
import { getAgToken } from "@/utils/common";
import { localMediaAPIs } from "@/services/management/localMedia.service";
import { TQueryParamsMediaFiles, TQueryParamsMediaFolders } from "@/models/management/media.interface";

export const useGetMediaFolders = (params: TQueryParamsMediaFolders) => {
  const token = getAgToken() || "";
  return useQuery({
    queryKey: [GET_MEDIA_FOLDERS, params.pageCurrent, params.pageSize],
    queryFn: () => localMediaAPIs.getFolders(params),
    enabled: Boolean(token),
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

export const useGetMediaFiles = (params: TQueryParamsMediaFiles) => {
  const token = getAgToken() || "";

  return useQuery({
    queryKey: [GET_MEDIA_FILES, params.mediaInFolderRecid],
    queryFn: () => localMediaAPIs.getFiles(params),
    enabled: Boolean(token),
    select: (data) => {
      return data.result;
    },
  });
};
