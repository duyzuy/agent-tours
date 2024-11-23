import {
  useLocalUserProfileUpdateMutation,
  useLocalUserChangePasswordMutation,
} from "@/mutations/managements/localUser";

import { LocalUserProfileFormData } from "./userProfileInfo.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_USER_PROFILE } from "@/queries/var";

import { ChangePasswordFormData } from "./userProfileInfo.interface";

const useUpdateUserProfile = () => {
  const { mutate: makeUpdate } = useLocalUserProfileUpdateMutation();
  const { mutate: makeChangePassword } = useLocalUserChangePasswordMutation();
  const message = useMessage();
  const queryClient = useQueryClient();
  const onUpdate = (data: LocalUserProfileFormData, cb?: () => void) => {
    makeUpdate(data, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_USER_PROFILE],
        });
        message.success("Cập nhật thông tin thành công");
        cb?.();
      },
      onError(error, variables, context) {
        message.error(error.message);
      },
    });
  };
  const onChangePassword = (data: ChangePasswordFormData, cb?: () => void) => {
    makeChangePassword(data, {
      onSuccess(data, variables, context) {
        message.success("Cập nhật mật khẩu thành công");
        cb?.();
      },
      onError(error, variables, context) {
        message.error(error.message);
      },
    });
  };
  return { onUpdate, onChangePassword };
};
export default useUpdateUserProfile;
