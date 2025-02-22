import { useTMutation } from "@/lib/reactQueryHooks";
import { GET_LOCAL_USER_LIST } from "@/queries/var";
import { localUserAPIs } from "@/services/management/localUser";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const message = useMessage();
  return useTMutation({
    mutationFn: localUserAPIs.update,
    onSuccess(data, variables, context) {
      message.success("Cập nhật thành công.");
      queryClient.invalidateQueries({
        queryKey: [GET_LOCAL_USER_LIST],
      });
    },
    onError: (error, variables, context) => {
      message.error(error.message);
    },
  });
};
export default useUpdateUser;
