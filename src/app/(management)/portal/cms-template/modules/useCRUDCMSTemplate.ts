import useMessage from "@/hooks/useMessage";
import { useCreateCMSTemplateMutation, useUpdateCMSTemplateMutation } from "@/mutations/managements/cmsTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { CMSTemplateContentFormData, CMSTemplateFormData } from "./cmsTemplate.interface";

import { useRouter } from "next/navigation";

const useCRUDCMSTemplate = () => {
  const { mutate: makeCreateTemplate } = useCreateCMSTemplateMutation();
  const { mutate: makeUpdateTemplate } = useUpdateCMSTemplateMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onCreateTemplate = (formData: CMSTemplateFormData, cb?: () => void) => {
    makeCreateTemplate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_CMS_TEMPLATE_SHORT_LIST],
        });
        router.push(`./portal/cms-template/${variables.code}`);
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdateTemplate = (formData: CMSTemplateFormData, cb?: () => void) => {
    makeUpdateTemplate(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_CMS_TEMPLATE_SHORT_LIST],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  return {
    onCreateTemplate,
    onUpdateTemplate,
  };
};
export default useCRUDCMSTemplate;
