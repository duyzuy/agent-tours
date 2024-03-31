import { mediaApis } from "@/services/management/localMedia.service";
import { useMutation } from "@tanstack/react-query";
import { getAgToken } from "@/utils/common";
import {
    IMediaFileListRs,
    IMediaFolderListRs,
    IMediaFolderPayload,
    IMediaFolderUpdatePayload,
} from "@/models/management/media.interface";
import { BaseResponse } from "@/models/management/common.interface";

//create folder in public/uploads folder.

export const useCreateMediaFoldersMutation = () => {
    const token = getAgToken() || "";
    return useMutation<
        IMediaFolderListRs["result"][0],
        BaseResponse<null>,
        IMediaFolderPayload
    >({
        mutationFn: (payload) =>
            mediaApis.createFolderFromLocal(token, payload),
    });
};

export const useUpdateFolderMutation = () => {
    const token = getAgToken() || "";
    return useMutation<
        IMediaFolderListRs["result"][0],
        BaseResponse<null>,
        IMediaFolderUpdatePayload
    >({
        mutationFn: ({ id, ...payload }) =>
            mediaApis.updateFolderFromLocal(token, id, payload),
    });
};

export const useUploadMediaFilesMutation = () => {
    const token = getAgToken() || "";
    return useMutation<
        IMediaFileListRs["result"][0],
        BaseResponse<null>,
        FormData
    >({
        mutationFn: (payload) =>
            mediaApis.uploadMediaFilesFromLocal(token, payload),
    });
};
