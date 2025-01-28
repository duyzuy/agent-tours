import { useTMutation } from "@/lib/reactQueryHooks";
import { mediaApis } from "@/services/management/localMedia";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { MEDIA_QUERY } from "@/constants/query-var.constant";
export const useCreateMediaFolder = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: mediaApis.createFolderFromLocal,
    onSuccess: (data, variables) => {
      message.success(`Tạo thư mục ${variables.folderName} thành công`);

      queryClient.invalidateQueries({
        queryKey: [MEDIA_QUERY.GET_MEDIA_FOLDERS],
      });
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};
