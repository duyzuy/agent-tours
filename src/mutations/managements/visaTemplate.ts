import { visaTemplateAPIs } from "@/services/management/cms/visaTemplate";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { VisaTemplateKeyPayload } from "@/models/management/cms/visaTemplate.interface";
import { useCustomMutation } from "../useCustomMutation";
import {
  VisaTemplateContentMetaBlockPayload,
  VisaTemplateContentPayload,
} from "@/models/management/cms/visaTemplateContent.interface";

export const useCreateVisaTempalateKeyMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VisaTemplateKeyPayload) => visaTemplateAPIs.createTemplateKey(payload),
  });
};

export const useUpdateVisaTemplateKeyMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VisaTemplateKeyPayload) => visaTemplateAPIs.updateTemplate(payload),
  });
};

export const useUpdateVisaTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VisaTemplateContentPayload) => visaTemplateAPIs.updateTemplateContent(payload),
  });
};
export const useUpdateStatusVisaTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id: number; status: PageContentStatus }) =>
      visaTemplateAPIs.updateStatusTemplateContent(payload),
  });
};
export const useDeleteVisaTemplateContentMutation = () => {
  return useCustomMutation({
    mutationFn: (recId?: number) => visaTemplateAPIs.deleteTemplateContent(recId),
  });
};

export const useCreateVisaTemplateContentBlockMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VisaTemplateContentMetaBlockPayload) => visaTemplateAPIs.createTemplateContentBlock(payload),
  });
};

export const useUpdateVisaTemplateContentBlockMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VisaTemplateContentMetaBlockPayload) => visaTemplateAPIs.updateTemplateContentBlock(payload),
  });
};

// export const useUpdateCMSTemplateMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplatePayload) =>
//             cmsTemplateAPIs.updateTemplate(payload),
//     });
// };

// export const useDeleteCMSTemplateMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplatePayload) =>
//             cmsTemplateAPIs.create(payload),
//     });
// };

// export const useDeleteCMSTemplateContentMutation = () => {
//     return useMutation({
//         mutationFn: (recId?: number) =>
//             cmsTemplateAPIs.deleteTemplateContent(recId),
//     });
// };

// export const useCreateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
//             cmsTemplateAPIs.createTemplateContentIncludeAndNote(payload),
//     });
// };

// export const useUpdateCMSTemplateMetaContentIncludeAndNodeMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
//             cmsTemplateAPIs.updateTemplateContentIncludeAndNote(payload),
//     });
// };

// export const useCreateCMSTemplateMetaContentItineraryMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
//             cmsTemplateAPIs.createTemplateContentItinerary(payload),
//     });
// };

// export const useUpdateCMSTemplateMetaContentItineraryMutation = () => {
//     return useMutation({
//         mutationFn: (payload: CMSTemplateContentMetaDataPayload) =>
//             cmsTemplateAPIs.updateTemplateContentItinerary(payload),
//     });
// };
