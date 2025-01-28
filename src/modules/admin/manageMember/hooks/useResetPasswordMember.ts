import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { membersAPIs } from "@/services/management/members";

export const useResetPasswordMember = () => {
  const message = useMessage();
  return useTMutation({
    mutationFn: membersAPIs.resetPassword,
    onSuccess: (data, variables) => {
      message.success(`Gửi yêu cầu lấy lại mật khẩu thành công`);
    },
    onError: (error, variables) => {
      message.error(error.message);
    },
  });
};
