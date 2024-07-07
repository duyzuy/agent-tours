import useMessage from "@/hooks/useMessage";

import {
  useCreateVisaTempalateKeyMutation,
  useUpdateVisaTemplateKeyMutation,
} from "@/mutations/managements/visaTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { VisaTemplateKeyFormData } from "./visaTemplate.interface";

import { useRouter } from "next/navigation";

const useCRUDVisaTemplateKey = () => {
  const { mutate: makeCreateVisaTemplateKey } = useCreateVisaTempalateKeyMutation();
  const { mutate: makeUpdateVisaTemplateKey } = useUpdateVisaTemplateKeyMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const createTemplateKey = (formData: VisaTemplateKeyFormData, cb?: () => void) => {
    makeCreateVisaTemplateKey(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_SHORT_LIST],
        });
        // router.push(`./portal/cms-template/${variables.code}`);
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const updateTemplate = (formData: VisaTemplateKeyFormData, cb?: () => void) => {
    makeUpdateVisaTemplateKey(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_SHORT_LIST],
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
    createTemplateKey,
    updateTemplate,
  };
};
export default useCRUDVisaTemplateKey;
