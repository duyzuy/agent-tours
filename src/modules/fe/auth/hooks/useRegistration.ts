import { authAPIs } from "@/services/fe/auth";

import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

export const useCustomerRegister = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: authAPIs.register,
    onSuccess(data, variables, context) {
      message.success("Đăng ký thành công");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
