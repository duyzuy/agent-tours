import { ICustomerSetPasswordPayload } from "@/models/customerAuth.interface";
import { authAPIs } from "@/services/fe/auth";
import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";

export const useSetNewPassword = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: (payload: ICustomerSetPasswordPayload) => authAPIs.setNewPassword(payload),
    onSuccess(data, variables, context) {
      message.success("Lấy lại mật khẩu thành công.");
    },
  });
};
