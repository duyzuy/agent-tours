import { authAPIs } from "@/services/fe/auth";
import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import { LangCode } from "@/models/management/cms/language.interface";
import { useState } from "react";
import { useRouter } from "@/utils/navigation";
import { CustomerLoginFormData } from "@/app/[locale]/(auth)/modules/customerAuth.interface";

// export const useCustomerLogin = () => {
//   const message = useMessage();
//   return useTMutation({
//     mutationFn: authAPIs.login,
//     onSuccess(data, variables, context) {
//       message.success("Đăng nhập thành công.");
//     },
//   });
// };

/**
 * Customer login via next-Auth
 */

export const useSignIn = (options?: { redirect?: boolean; callbackUrl?: string }) => {
  const { redirect = false, callbackUrl } = options || {};
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const locale = useLocale() as LangCode;

  const router = useRouter();

  const onSignIn = (formData: CustomerLoginFormData) => {
    setLoading(true);
    signIn(
      "credentials",
      {
        username: formData.username,
        password: formData.password,
        redirect: redirect,
        callbackUrl: callbackUrl ? `/${locale}/${callbackUrl}` : `/${locale}`,
      },
      { prompt: "login" },
    )
      .then((data) => {
        console.log(data);
        if (data?.status === 200) {
          router.push("/");
          router.refresh();
        } else {
          setError(data?.error);
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
