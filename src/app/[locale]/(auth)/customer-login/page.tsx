"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { useRouter } from "@/utils/navigation";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import LoginForm from "@/modules/fe/auth/components/LoginForm";
import { useSignIn } from "@/modules/fe/auth";

const CustomerLogin = () => {
  const t = useTranslations("String");
  const router = useRouter();
  const { signIn, error, loading } = useSignIn({ redirect: true });

  return (
    <AuthLayout title={t("login")}>
      <LoginForm
        onSubmit={signIn}
        error={error ? t(error) : undefined}
        loading={loading}
        onForgotPassword={() => router.push(`/${CLIENT_LINKS.CustomerForgotPassword}`)}
      >
        <p className="text-center text-xs py-2 mt-3">
          <Link href={`/${CLIENT_LINKS.CustomerRegister}`}>
            <span className="text-primary-default">{t("noAccount")}</span>
          </Link>
        </p>
      </LoginForm>
    </AuthLayout>
  );
};
export default CustomerLogin;
