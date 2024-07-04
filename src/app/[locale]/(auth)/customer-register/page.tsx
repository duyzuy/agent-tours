"use client";
import RegistrationForm from "../_components/RegistrationForm";
import { useTranslations } from "next-intl";
import { useSignUp } from "../modules/useAuth";
import AuthLayoutWraper from "../_components/AuthLayoutWraper";

const CustomerRegisterPage = () => {
  const t = useTranslations("String");

  const { signUp, error, loading } = useSignUp();
  return (
    <AuthLayoutWraper title={t("register")}>
      <RegistrationForm onSubmit={signUp} loading={loading} />
    </AuthLayoutWraper>
  );
};
export default CustomerRegisterPage;
