"use client";
import RegistrationForm from "../_components/RegistrationForm";
import { useTranslations } from "next-intl";
import { useSignUp } from "../modules/useAuth";
import AuthLayoutWraper from "../_components/AuthLayoutWraper";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Link } from "@/utils/navigation";

const CustomerRegisterPage = () => {
  const t = useTranslations("String");

  const { signUp, error, loading } = useSignUp();
  return (
    <AuthLayoutWraper title={t("register")}>
      <RegistrationForm onSubmit={signUp} loading={loading}>
        <div className="content-form">
          <p className="text-center text-xs">
            <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
              <span className="text-primary-default">{t("hasAccount")}</span>
            </Link>
          </p>
        </div>
      </RegistrationForm>
    </AuthLayoutWraper>
  );
};
export default CustomerRegisterPage;
