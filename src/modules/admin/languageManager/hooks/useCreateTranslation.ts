import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { TRANSLATION_QUERY } from "@/constants/query-var.constant";
import { translationAPIs } from "@/services/management/cms/transtation";

export const useCreateTranslation = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: translationAPIs.create,
    onSuccess: (data, variables) => {
      message.success(`Tạo thành công`);

      queryClient.invalidateQueries({
        queryKey: [TRANSLATION_QUERY.GET_TRANSLATION_LIST],
      });
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};
