import { signIn } from "next-auth/react";

import { LangCode } from "@/models/management/cms/language.interface";
import { useState } from "react";
import { useRouter } from "@/utils/navigation";
import { CustomerLoginFormData } from "../customerAuth.interface";
import useMessage from "@/hooks/useMessage";
import { useLocale } from "next-intl";

/**
 * Customer login via next-Auth
 */

export const useSignIn = (options?: { redirect?: boolean; callbackUrl?: string; callback?: () => void }) => {
  const { redirect = false, callbackUrl, callback } = options || {};
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale() as LangCode;
  const message = useMessage();
  const router = useRouter();

  const onSignIn = async (formData: CustomerLoginFormData) => {
    setLoading(true);
    await signIn(
      "credentials",
      {
        username: formData.username,
        password: formData.password,
        redirect: false,
      },
      { prompt: "login" },
    )
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          router.refresh();
          callback?.();
          if (redirect && redirect === true) {
            router.push(callbackUrl ? `/${callbackUrl}` : `/`);
          }
          message.success("Đăng nhập thành công.");
        } else {
          setError(response?.error);
          message.error(response?.error);
        }
      })
      .catch((errors: { error: string; ok: boolean; status: number; url: string | null }) => {
        console.log(errors);
        setError(errors.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { signIn: onSignIn, error, loading };
};
