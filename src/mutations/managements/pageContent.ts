import { mediaApis } from "@/services/management/localMedia.service";
import { useMutation } from "@tanstack/react-query";
import { getAgToken } from "@/utils/common";
import { BaseResponse } from "@/models/management/common.interface";
import { pageContentAPIs } from "@/services/management/cms/pageContent";
import {
    IPageContentPayload,
    IPageContentDetailRs,
} from "@/models/management/cms/pageContent.interface";

//create folder in public/uploads folder.

export const useCreatePageContentMutation = () => {
    const token = getAgToken() || "";
    return useMutation<
        IPageContentDetailRs,
        BaseResponse<null>,
        IPageContentPayload
    >({
        mutationFn: (payload) => pageContentAPIs.create(payload),
    });
};

export const useUpdatePageContentMutation = () => {
    const token = getAgToken() || "";
    return useMutation({
        mutationFn: (payload: IPageContentPayload) =>
            pageContentAPIs.update(payload),
    });
};
