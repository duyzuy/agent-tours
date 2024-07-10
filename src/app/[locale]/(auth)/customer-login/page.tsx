"use client";
import LoginForm from "../_components/LoginForm";
import { useTranslations } from "next-intl";
import { useSignIn } from "../modules/useAuth";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import AuthLayoutWraper from "../_components/AuthLayoutWraper";
import { useRouter } from "@/utils/navigation";
const CustomerLogin = () => {
  const t = useTranslations("String");
  const router = useRouter();
  const { signIn, error, loading } = useSignIn();

  const forgotPassword = () => {
    router.push(`/${CLIENT_LINKS.CustomerForgotPassword}`);
  };
  return (
    <AuthLayoutWraper title={t("login")}>
      <LoginForm
        onSubmit={signIn}
        error={error ? t(error) : undefined}
        loading={loading}
        onForgotPassword={forgotPassword}
      >
        <p className="text-center text-xs py-2 mt-3">
          <Link href={`/${CLIENT_LINKS.CustomerRegister}`}>
            <span className="text-primary-default">{t("noAccount")}</span>
          </Link>
        </p>
      </LoginForm>
    </AuthLayoutWraper>
  );
};
export default CustomerLogin;
