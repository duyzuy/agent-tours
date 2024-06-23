import { useMutation } from "@tanstack/react-query";
import { CMSTemplatePayload } from "@/models/management/cms/cmsTemplate.interface";
import {
    CMSTemplateContentPayload,
    CMSTemplateContentMetaDataPayload,
} from "@/models/management/cms/cmsTemplateContent.interface";
import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export const useCreateCMSTemplateContentMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentPayload) =>
            cmsTemplateAPIs.createContent(payload),
    });
};

export const useUpdateCMSTemplateContentMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentPayload) =>
            cmsTemplateAPIs.updateTemplateContent(payload),
    });
};

export const useCreateCMSTemplateMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplatePayload) =>
            cmsTemplateAPIs.create(payload),
    });
};

export const useUpdateCMSTemplateMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplatePayload) =>
            cmsTemplateAPIs.updateTemplate(payload),
    });
};

export const useDeleteCMSTemplateMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplatePayload) =>
            cmsTemplateAPIs.create(payload),
    });
};

export const useUpdateStatusCMSTemplateContentMutation = () => {
    return useMutation({
        mutationFn: (payload: { id: number; status: PageContentStatus }) =>
            cmsTemplateAPIs.updateStatusTemplateContent(payload),
    });
};

export const useDeleteCMSTemplateContentMutation = () => {
    return useMutation({
        mutationFn: (recId?: number) =>
            cmsTemplateAPIs.deleteTemplateContent(recId),
    });
};

export const useCreateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
            cmsTemplateAPIs.createTemplateContentIncludeAndNote(payload),
    });
};

export const useUpdateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
            cmsTemplateAPIs.updateTemplateContentIncludeAndNote(payload),
    });
};

export const useCreateCMSTemplateMetaContentItineraryMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
            cmsTemplateAPIs.createTemplateContentItinerary(payload),
    });
};

export const useUpdateCMSTemplateMetaContentItineraryMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
            cmsTemplateAPIs.updateTemplateContentItinerary(payload),
    });
};
