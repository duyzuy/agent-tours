import { useTMutation } from "@/lib/reactQueryHooks";
import { mediaApis } from "@/services/management/localMedia";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { MEDIA_QUERY } from "@/constants/query-var.constant";

export const useUploadMediaFiles = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useTMutation({
    mutationFn: mediaApis.uploadMediaFilesFromLocal,
    onSuccess(data, variables, context) {
      message.success("Upload files thành công.");
      queryClient.invalidateQueries({
        queryKey: [MEDIA_QUERY.GET_MEDIA_FILES],
      });
    },
    onError(error, variables, context) {
      message.error("Upload file thất bại.");
    },
  });
};
