import useMessage from "@/hooks/useMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADMIN_AUTH } from "@/constants/query-var.constant";

import { localUserAPIs } from "@/services/management/localUser";
import { LocalUserNewPasswordPayload } from "@/models/management/localUser.interface";
import { adminUpdateProfile } from "@/services/management/auth";
import { ILocalUserProfilePayload } from "@/models/management/localAuth.interface";

const useUpdateAdminProfile = () => {
  const message = useMessage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ILocalUserProfilePayload) => adminUpdateProfile(payload),
    onSuccess(data, variables, context) {
      message.success("Cập nhật thông tin thành công");
      queryClient.invalidateQueries({ queryKey: [ADMIN_AUTH.GET_ADMIN_PROFILE] });
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};

const useAdminChangePassword = () => {
  const message = useMessage();
  return useMutation({
    mutationFn: (payload: LocalUserNewPasswordPayload) => localUserAPIs.setNewPassword(payload),
    onSuccess(data, variables, context) {
      message.success("Thay đổi mật khẩu thành công.");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};

export { useUpdateAdminProfile, useAdminChangePassword };
