"use client";
import Image from "next/image";
import LoginForm from "../_components/LoginForm";
import { useTranslations } from "next-intl";
import { useSignIn } from "../modules/useAuth";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import AuthLayoutWraper from "../_components/AuthLayoutWraper";
const CustomerLogin = () => {
  const t = useTranslations("String");

  const { signIn, error, loading } = useSignIn();

  return (
    <AuthLayoutWraper title={t("login")}>
      <LoginForm onSubmit={signIn} error={error ? t(error) : undefined} loading={loading}>
        <p className="text-center text-xs py-2 mt-3">
          <Link href={`/${CLIENT_LINKS.CustomerRegister}`}>{t("noAccount")}</Link>
        </p>
      </LoginForm>
    </AuthLayoutWraper>
  );
};
export default CustomerLogin;
