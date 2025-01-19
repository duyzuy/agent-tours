"use client";
import RegistrationForm from "../_components/RegistrationForm";
import { useTranslations } from "next-intl";
import { useSignUp } from "../modules/useAuth";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Link } from "@/utils/navigation";
import AuthLayout from "@/components/layouts/fe/AuthLayout";

const CustomerRegisterPage = () => {
  const t = useTranslations("String");

  const { signUp, error, loading } = useSignUp();
  return (
    <AuthLayout title={t("register")}>
      <RegistrationForm onSubmit={signUp} loading={loading}>
        <div className="content-form">
          <p className="text-center text-xs">
            <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
              <span className="text-primary-default">{t("hasAccount")}</span>
            </Link>
          </p>
        </div>
      </RegistrationForm>
    </AuthLayout>
  );
};
export default CustomerRegisterPage;
