import { mediaApis } from "@/services/management/localMedia.service";

import { getAgToken } from "@/utils/common";
import {
  IMediaFileListRs,
  IMediaFolderListRs,
  IMediaFolderPayload,
  IMediaFolderUpdatePayload,
} from "@/models/management/media.interface";
import { BaseResponse } from "@/models/common.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateMediaFoldersMutation = () => {
  const token = getAgToken() || "";
  return useCustomMutation<IMediaFolderListRs["result"][0], IMediaFolderPayload>({
    mutationFn: (payload) => mediaApis.createFolderFromLocal(token, payload),
  });
};

export const useUpdateFolderMutation = () => {
  const token = getAgToken() || "";
  return useCustomMutation<IMediaFolderListRs["result"][0], IMediaFolderUpdatePayload>({
    mutationFn: ({ id, ...payload }) => mediaApis.updateFolderFromLocal(token, id, payload),
  });
};

export const useUploadMediaFilesMutation = () => {
  const token = getAgToken() || "";
  return useCustomMutation<IMediaFileListRs["result"][0], FormData>({
    mutationFn: (payload) => mediaApis.uploadMediaFilesFromLocal(token, payload),
  });
};
