import { useMutation } from "@tanstack/react-query";
import { pageContentAPIs } from "@/services/management/cms/pageContent";
import { IPageContentPayload } from "@/models/management/cms/pageContent.interface";

export const useCreatePageContentMutation = () => {
    return useMutation({
        mutationFn: (payload: IPageContentPayload) =>
            pageContentAPIs.create(payload),
    });
};

export const useUpdatePageContentMutation = () => {
    return useMutation({
        mutationFn: (payload: IPageContentPayload) =>
            pageContentAPIs.update(payload),
    });
};

export const usePublishPageContentMutation = () => {
    return useMutation({
        mutationFn: (id: number) => pageContentAPIs.publish(id),
    });
};

export const useUnPublishPageContentMutation = () => {
    return useMutation({
        mutationFn: (id: number) => pageContentAPIs.unPublish(id),
    });
};
