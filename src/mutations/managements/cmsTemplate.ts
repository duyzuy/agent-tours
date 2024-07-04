import { CMSTemplatePayload } from "@/models/management/cms/cmsTemplate.interface";
import {
  CMSTemplateContentPayload,
  CMSTemplateContentMetaDataPayload,
} from "@/models/management/cms/cmsTemplateContent.interface";
import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { useCustomMutation } from "../useCustomMutation";
export const useCreateCMSTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentPayload) => cmsTemplateAPIs.createContent(payload),
  });
};

export const useUpdateCMSTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentPayload) => cmsTemplateAPIs.updateTemplateContent(payload),
  });
};

export const useCreateCMSTemplateMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplatePayload) => cmsTemplateAPIs.create(payload),
  });
};

export const useUpdateCMSTemplateMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplatePayload) => cmsTemplateAPIs.updateTemplate(payload),
  });
};

export const useDeleteCMSTemplateMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplatePayload) => cmsTemplateAPIs.create(payload),
  });
};

export const useUpdateStatusCMSTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id: number; status: PageContentStatus }) =>
      cmsTemplateAPIs.updateStatusTemplateContent(payload),
  });
};

export const useDeleteCMSTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId?: number) => cmsTemplateAPIs.deleteTemplateContent(recId),
  });
};

export const useCreateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
      cmsTemplateAPIs.createTemplateContentIncludeAndNote(payload),
  });
};

export const useUpdateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
      cmsTemplateAPIs.updateTemplateContentIncludeAndNote(payload),
  });
};

export const useCreateCMSTemplateMetaContentItineraryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentMetaDataPayload) => cmsTemplateAPIs.createTemplateContentItinerary(payload),
  });
};

export const useUpdateCMSTemplateMetaContentItineraryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: CMSTemplateContentMetaDataPayload) => cmsTemplateAPIs.updateTemplateContentItinerary(payload),
  });
};
