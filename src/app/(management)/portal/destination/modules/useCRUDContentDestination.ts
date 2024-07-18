import {
  useCreateDestinationCMSContentMutation,
  useUpdateDestinationCMSContentMutation,
} from "@/mutations/managements/destination";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import { DestinationContentFormData } from "./destinationContent.interface";

const useCRUDContentDestination = () => {
  const { mutate: makeCreateCMSDestinationContent } = useCreateDestinationCMSContentMutation();
  const { mutate: makeUpdateCMSContent } = useUpdateDestinationCMSContentMutation();

  const message = useMessage();

  const queryClient = useQueryClient();
  const onCreateCMSDestinationContent = (formData: DestinationContentFormData, cb?: () => void) => {
    makeCreateCMSDestinationContent(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo bài viết thành công`);

        queryClient.invalidateQueries({
          queryKey: [queryCMS.GET_DESTINATION_CMS_DETAIL, formData.codeKey],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdateCMSDestinationContent = (id: number, formData: DestinationContentFormData, cb?: () => void) => {
    makeUpdateCMSContent(
      { id: id, ...formData },
      {
        onSuccess: (data, variables) => {
          message.success(`Cập nhật thành công`);

          queryClient.invalidateQueries({
            queryKey: [queryCMS.GET_DESTINATION_CMS_DETAIL, formData.codeKey],
          });
          cb?.();
        },
        onError: (error, variables) => {
          console.log({ error, variables });
          message.error(error.message);
        },
      },
    );
  };

  return {
    // errors,
    onCreateCMSContent: onCreateCMSDestinationContent,
    onUpdateCMSContent: onUpdateCMSDestinationContent,
  };
};
export default useCRUDContentDestination;
