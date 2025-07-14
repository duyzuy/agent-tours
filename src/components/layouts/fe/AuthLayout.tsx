"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { useRouter } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

interface AuthLayoutProps {
  title?: string;
  children?: React.ReactNode;
  renderExtra?: React.ReactNode;
  bgUrl?: string;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  renderExtra,
  bgUrl = "/assets/images/bg-auth.png",
}) => {
  const t = useTranslations("String");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(CLIENT_LINKS.Customer);
      router.refresh();
    }
  }, [status]);
  return (
    <div className="login-page py-8 lg:py-16 bg-slate-50">
      <div className="container max-w-6xl mx-auto lg:px-8 md:px-6 px-4">
        <div className="flex flex-wrap lg:flex-row bg-white drop-shadow-sm rounded-lg overflow-hidden">
          <div className="w-full lg:w-1/2 px-8 py-8 lg:px-16 lg:py-16">
            <div className="login-form">
              <div className="slogan py-2 mb-4">
                <p className="text-primary-default font-semibold uppercase">{t("byAgentName")}</p>
                <p className="text-sm text-gray-500">{t("slogan")}</p>
              </div>
              <div className="head mb-6">
                <h1 className="text-2xl font-semibold mb-2">{title}</h1>
                <p className="text-sm text-gray-600">{t("loginPage.note1")}</p>
              </div>
              {children}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="auth__image h-42 lg:h-full w-full relative">
              <Image src={bgUrl} fill alt="bg auth" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
