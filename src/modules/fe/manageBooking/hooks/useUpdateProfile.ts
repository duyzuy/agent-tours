import { customerAPIs } from "@/services/fe/customer";
import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
export const useUpdateProfileInfo = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: customerAPIs.updateProfile,
    onSuccess(data, variables, context) {
      message.success("Cập nhật thành công");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
