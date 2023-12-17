import { useQuery } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS, GET_MEDIA_FILES } from "./var";
import { getAgToken } from "@/utils/common";
import { localMediaAPIs } from "@/services/management/localMedia.service";
import { TQueryParamsMediaFiles } from "@/models/management/media.interface";

export const useGetMediaFolders = () => {
    const token = getAgToken() || "";

    return useQuery({
        queryKey: [GET_MEDIA_FOLDERS],
        queryFn: () => localMediaAPIs.getFolders(),
        enabled: Boolean(token),
        select: (data) => {
            return data.result;
        },
    });
};

export const useGetMediaFiles = (params: TQueryParamsMediaFiles) => {
    const token = getAgToken() || "";

    return useQuery({
        queryKey: [GET_MEDIA_FILES, params],
        queryFn: () => localMediaAPIs.getFiles(params),
        enabled: Boolean(token),
        select: (data) => {
            return data.result;
        },
    });
};
