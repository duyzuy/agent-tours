import useMessage from "@/hooks/useMessage";

import { useTMutation } from "@/lib/reactQueryHooks";
import { localUserAPIs } from "@/services/management/localUser";

const useChangePasswordLocalUser = () => {
  const message = useMessage();

  return useTMutation({
    mutationFn: localUserAPIs.setNewPassword,
    onSuccess(data, variables, context) {
      message.success("Cập nhật mật khẩu thành công.");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
export default useChangePasswordLocalUser;
