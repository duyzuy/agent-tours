import { authAPIs } from "@/services/fe/auth";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

export const useResetPassword = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: authAPIs.resetPassword,
    onSuccess(data, variables, context) {
      message.success("Gửi thành công");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
