"use client";

import { useTranslations } from "next-intl";
import { useSignUp } from "@/modules/fe/auth";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Link } from "@/utils/navigation";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import RegistrationForm, { RegistrationFormProps } from "@/modules/fe/auth/components/RegistrationForm";

const CustomerRegisterPage = () => {
  const t = useTranslations("String");

  const { mutate: signUp, isPending: loading } = useSignUp();
  const handleSubmit: RegistrationFormProps["onSubmit"] = (data, resetForm) => {
    signUp(data, {
      onSuccess(data, variables, context) {
        resetForm?.();
      },
    });
  };
  return (
    <AuthLayout title={t("register")}>
      <RegistrationForm onSubmit={handleSubmit} loading={loading}>
        <div className="content-form text-center text-xs">
          <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
            <span className="text-primary-default">{t("hasAccount")}</span>
          </Link>
        </div>
      </RegistrationForm>
    </AuthLayout>
  );
};
export default CustomerRegisterPage;
