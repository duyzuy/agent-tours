import { authAPIs } from "@/services/fe/auth";
import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

export const useSetNewPassword = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: authAPIs.setNewPassword,
    onSuccess(data, variables, context) {
      message.success("Lấy lại mật khẩu thành công.");
    },
  });
};
