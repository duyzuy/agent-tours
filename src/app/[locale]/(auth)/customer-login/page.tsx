"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { useRouter } from "@/utils/navigation";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import LoginForm from "@/modules/fe/auth/components/LoginForm";
import { useSession } from "next-auth/react";

const CustomerLogin = () => {
  const t = useTranslations("String");
  const router = useRouter();

  return (
    <AuthLayout title={t("login")}>
      <LoginForm
        onForgotPassword={() => router.push(`/${CLIENT_LINKS.CustomerForgotPassword}`)}
        onSubmitSuccess={() => {
          router.push(CLIENT_LINKS.Customer);
          router.refresh();
        }}
        footer={
          <p className="text-center text-xs py-2 mt-3">
            <Link href={`/${CLIENT_LINKS.CustomerRegister}`}>
              <span className="text-primary-default">{t("noAccount")}</span>
            </Link>
          </p>
        }
      />
    </AuthLayout>
  );
};
export default CustomerLogin;
