import useMessage from "@/hooks/useMessage";
import { useLocalUserChangePasswordMutation } from "@/mutations/managements/localUser";
import { LocalUserChangePasswordFormData } from "./localUser.interface";
import { MutateOptions } from "@tanstack/react-query";
import { LocalUserResponse } from "@/models/management/localUser.interface";
import { BaseResponse } from "@/models/common.interface";

export type TLocalUserChangePasswordErrorsField = Partial<Record<keyof LocalUserChangePasswordFormData, string>>;
const useChangePasswordLocalUser = () => {
  const { mutate: makeChangePassword, isPending } = useLocalUserChangePasswordMutation();

  const message = useMessage();

  const onUpdatePassword = (
    formData: LocalUserChangePasswordFormData,
    options: MutateOptions<LocalUserResponse, BaseResponse<null>, LocalUserChangePasswordFormData, unknown>,
  ) => {
    makeChangePassword(formData, {
      onSuccess: (data, variabbles, context) => {
        message.success("Đổi mật khẩu thành công.");
        options?.onSuccess?.(data, variabbles, context);
      },
      onError: (error, variabbles, context) => {
        console.log({ error });
        message.error(error.message);
        options?.onError?.(error, variabbles, context);
      },
    });
  };

  return {
    onUpdatePassword,
    isPending,
  };
};
export default useChangePasswordLocalUser;
