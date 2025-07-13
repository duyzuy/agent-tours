"use client";

import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { Link } from "@/utils/navigation";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import RegistrationForm, { RegistrationFormProps } from "@/modules/fe/auth/components/RegistrationForm";

const CustomerRegisterPage = () => {
  const t = useTranslations("String");
  return (
    <AuthLayout title={t("register")}>
      <RegistrationForm
        footer={
          <div className="content-form text-center text-xs">
            <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
              <span className="text-primary-default">{t("hasAccount")}</span>
            </Link>
          </div>
        }
      />
    </AuthLayout>
  );
};
export default CustomerRegisterPage;
