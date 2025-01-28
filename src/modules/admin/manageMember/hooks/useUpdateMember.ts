import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { MEMBER_QUERY } from "@/constants/query-var.constant";
import { membersAPIs } from "@/services/management/members";

export const useUpdateMember = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: membersAPIs.update,
    onSuccess: (data, variables) => {
      message.success(`Cập nhật #${variables?.recId} thành công`);
      queryClient.invalidateQueries({
        queryKey: [MEMBER_QUERY.GET_MEMBER_LIST],
      });
    },
    onError: (error, variables) => {
      message.error(error.message);
    },
  });
};
