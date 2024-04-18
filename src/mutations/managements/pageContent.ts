import { useMutation } from "@tanstack/react-query";
import { getAgToken } from "@/utils/common";
import { pageContentAPIs } from "@/services/management/cms/pageContent";
import { IPageContentPayload } from "@/models/management/cms/pageContent.interface";

export const useCreatePageContentMutation = () => {
    const token = getAgToken() || "";
    return useMutation({
        mutationFn: (payload: IPageContentPayload) =>
            pageContentAPIs.create(payload),
    });
};

export const useUpdatePageContentMutation = () => {
    const token = getAgToken() || "";
    return useMutation({
        mutationFn: (payload: IPageContentPayload) =>
            pageContentAPIs.update(payload),
    });
};
