import { useTMutation } from "@/lib/reactQueryHooks";
import { GET_LOCAL_USER_LIST } from "@/queries/var";
import { localUserAPIs } from "@/services/management/localUser";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";

const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const message = useMessage();
  return useTMutation({
    mutationFn: localUserAPIs.updateStatus,
    onSuccess(data, variables, context) {
      message.success("Cập nhật trạng thái thành công.");
      queryClient.invalidateQueries({
        queryKey: [GET_LOCAL_USER_LIST],
      });
    },
    onError: (error, variables, context) => {
      message.error(error.message);
    },
  });
};
export default useUpdateUserStatus;
