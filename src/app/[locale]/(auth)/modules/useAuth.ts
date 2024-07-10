import { useCustomerRegisterMutation, useCustomerResetPasswordMutation } from "@/mutations/auth";
import {
  CustomerForgotPasswordFormData,
  CustomerLoginFormData,
  CustomerRegisterFormData,
} from "./customerAuth.interface";

import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { useLocale } from "next-intl";
import { LangCode } from "@/models/management/cms/language.interface";
import { useRouter } from "@/utils/navigation";
import { isUndefined } from "lodash";
import { ICustomerForgotPassword } from "@/models/customerAuth.interface";

/**
 * Customer forgot password
 */

export const useResetPassowrd = () => {
  const { mutate: makeReset, isPending, isIdle, data } = useCustomerResetPasswordMutation();
  const message = useMessage();
  const [error, setError] = useState<string>();

  const resetPassword = (data: CustomerForgotPasswordFormData) => {
    makeReset(data, {
      onSuccess(data, variables, context) {
        message.success("Success");

        setError(undefined);
      },
      onError(error, variables, context) {
        message.error(error.message);
        setError(error.errorCode);
      },
      onSettled(data, error, variables, context) {
        console.log("settled");
      },
    });
  };
  return { resetPassword, isPending, isIdle, error, data: data?.result };
};

/**
 * Customer signUp / registration
 */
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
      },
      onError(error, variables, context) {
        message.error(error.message);
        setError(error.message);
      },
      onSettled(data, error, variables, context) {
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

/**
 *
 * Customer login via next-Auth
 *
 */
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
