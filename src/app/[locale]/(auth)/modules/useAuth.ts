import { useCustomerRegisterMutation, useCustomerLoginMutation } from "@/mutations/auth";
import { CustomerLoginFormData, CustomerRegisterFormData } from "./customerAuth.interface";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { useLocale } from "next-intl";
import { LangCode } from "@/models/management/cms/language.interface";
import { useRouter } from "@/utils/navigation";
import { isUndefined } from "lodash";

const useCustomerAuth = () => {
  const { mutate: login } = useCustomerLoginMutation();

  const onLogin = (data: CustomerLoginFormData) => {
    login(data, {
      onSuccess(data, variables, context) {
        console.log(data, variables, context);
      },
      onError(error, variables, context) {
        console.log(error, variables, context);
      },
    });
  };
};
export default useCustomerAuth;

export const useSignUp = (options?: { redirect?: boolean; callbackUrl?: string }) => {
  const { mutate: register } = useCustomerRegisterMutation();
  const { redirect = false, callbackUrl } = options || {};
  const router = useRouter();
  const message = useMessage();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const onRegister = (data: CustomerRegisterFormData) => {
    setLoading(true);
    register(data, {
      onSuccess(data, variables, context) {
        console.log(data, variables, context);
        message.success("Tạo tài khoản thành công, vui lòng thực hiện đăng nhập");
        if (redirect) {
          router.push(`/${CLIENT_LINKS.CustomerLogin}`);
        }
        setLoading(false);
      },
      onError(error, variables, context) {
        message.error(error.message);
        setError(error.message);
        setLoading(false);
      },
    });
  };
  return {
    signUp: onRegister,
    loading,
    error,
  };
};
export const useSignIn = (options?: { redirect?: boolean; callbackUrl?: string }) => {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale() as LangCode;

  const callbackUrl = options?.callbackUrl ? `/${locale}/${options.callbackUrl}` : `/${locale}`;
  const redirect = options && isUndefined(options.redirect) ? options.redirect : true;
  const onSignIn = (formData: CustomerLoginFormData) => {
    setLoading(true);
    signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: redirect,
      callbackUrl: callbackUrl,
    })
      .then((data) => {
        console.log(data);
        if (data?.status === 200) {
          setError(data?.error);
        }
      })
      .catch((errors: { error: string; ok: boolean; status: number; url: string | null }) => {
        setError(errors.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { signIn: onSignIn, error, loading };
};
