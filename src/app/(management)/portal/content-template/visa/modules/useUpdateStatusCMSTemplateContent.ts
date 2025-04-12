import useMessage from "@/hooks/useMessage";
import { useUpdateStatusCMSTemplateContentMutation } from "@/mutations/managements/cmsTemplate";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { useRouter } from "next/navigation";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

const useUpdateStatusCMSTemplateContent = () => {
  const { mutate: makeUpdateStatus } = useUpdateStatusCMSTemplateContentMutation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const message = useMessage();

  const onUpdateStatus = (data: { id: number; status: PageContentStatus }, cb?: () => void) => {
    makeUpdateStatus(data, {
      onSuccess: (data, variables) => {
        message.success(
          variables.status === PageContentStatus.PUBLISH ? "Kích hoạt thành công." : "Huỷ kích hoạt thành công.",
        );
        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_CMS_TEMPLATE_LIST],
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
    onUpdateStatus,
  };
};
export default useUpdateStatusCMSTemplateContent;
