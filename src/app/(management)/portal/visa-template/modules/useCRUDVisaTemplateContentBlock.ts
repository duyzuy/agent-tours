import useMessage from "@/hooks/useMessage";
import {
  useUpdateVisaTemplateContentBlockMutation,
  useCreateVisaTemplateContentBlockMutation,
} from "@/mutations/managements/visaTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { VisaTemplateContentMetaDataForm } from "./visaTemplate.interface";

import { useRouter } from "next/navigation";

const useCRUDVisaTemplateContentBlock = () => {
  const { mutate: makeCreateBlockContent } = useCreateVisaTemplateContentBlockMutation();

  const { mutate: makeUpdateBlockContent } = useUpdateVisaTemplateContentBlockMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const createVisaTemplateBlockContent = (formData: VisaTemplateContentMetaDataForm, cb?: () => void) => {
    makeCreateBlockContent(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thành công`);
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_DETAIL],
        });

        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const updateVisaTemplateBlockContent = (formData: VisaTemplateContentMetaDataForm, cb?: () => void) => {
    makeUpdateBlockContent(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật công`);
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_DETAIL, data.result.code],
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
    createVisaTemplateBlockContent,
    updateVisaTemplateBlockContent,
  };
};
export default useCRUDVisaTemplateContentBlock;
