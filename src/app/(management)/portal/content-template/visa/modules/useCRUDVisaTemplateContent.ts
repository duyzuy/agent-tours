import useMessage from "@/hooks/useMessage";

import {
  useUpdateVisaTemplateContentMutation,
  useUpdateStatusVisaTemplateContentMutation,
  useDeleteVisaTemplateContentMutation,
} from "@/mutations/managements/visaTemplate";

import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { VisaTemplateContentFormData } from "./visaTemplate.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

import { useRouter } from "next/navigation";
import { VisaTemplateContentPayload } from "@/models/management/cms/visaTemplateContent.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

const useCRUDCMSTemplateContent = () => {
  const { mutate: makeUpdateTemplateContent } = useUpdateVisaTemplateContentMutation();
  const { mutate: makeUpdateStatus } = useUpdateStatusVisaTemplateContentMutation();
  const { mutate: makeDelete } = useDeleteVisaTemplateContentMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onUpdateTemplateContent = (formData: VisaTemplateContentFormData, cb?: () => void) => {
    let payload: VisaTemplateContentPayload = {
      ...formData,
      publishDate: dayjs(formData.publishDate).locale("en").format(DATE_TIME_FORMAT),
    };
    makeUpdateTemplateContent(payload, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_LIST],
        });
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

  const onUpdateStatus = (data: { id: number; status: PageContentStatus }, cb?: () => void) => {
    makeUpdateStatus(data, {
      onSuccess: (data, variables) => {
        message.success(
          variables.status === PageContentStatus.PUBLISH ? "Kích hoạt thành công." : "Huỷ kích hoạt thành công.",
        );
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_LIST],
        });
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

  const onDeleteTemplateContent = (id?: number, cb?: () => void) => {
    makeDelete(id, {
      onSuccess: (data, variables) => {
        message.success(`Xoá bài viết thành công`);
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_VISA_TEMPLATE_LIST],
        });
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

  return {
    onUpdateTemplateContent,
    onUpdateStatus,
    onDeleteTemplateContent,
  };
};
export default useCRUDCMSTemplateContent;
