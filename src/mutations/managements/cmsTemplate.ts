import { useMutation } from "@tanstack/react-query";
import { CMSTemplatePayload } from "@/models/management/cms/cmsTemplate.interface";
import { cmsTemplateAPIs } from "@/services/management/cms/cmsTemplate";

export const useCreateCMSTemplateMutation = () => {
    return useMutation({
        mutationFn: (payload: CMSTemplatePayload) =>
            cmsTemplateAPIs.create(payload),
    });
};
