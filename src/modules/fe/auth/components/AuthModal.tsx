"use client";
import React, { useEffect } from "react";
import { TabsProps, Tabs, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useModalSelector } from "@/store/modal/hooks";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Logo from "@/components/frontend/partials/Logo";
import { usePathname } from "@/utils/navigation";
import useAuthModal from "../hooks/useAuthModal";
import { useSignUp } from "../hooks/useSignUp";
import { useSignIn } from "../hooks/useSignIn";

const AuthModal: React.FC = () => {
  const { authModal } = useModalSelector();

  const t = useTranslations("String");
  const { hideAuthModal } = useAuthModal();
  const pathname = usePathname();
  const { mutate: signUp, isPending: isLoadingRegister } = useSignUp();

  const { signIn, error, loading } = useSignIn({
    redirect: false,
    callback: () => {
      hideAuthModal();
    },
  });

  const items: TabsProps["items"] = [
    {
      key: "signin",
      label: <span className="text-lg">{t("login")}</span>,
      children: <LoginForm error={error} onSubmit={signIn} loading={loading} />,
    },
    {
      key: "signup",
      label: <span className="text-lg">{t("register")}</span>,
      children: <RegistrationForm onSubmit={signUp} loading={isLoadingRegister} />,
    },
  ];
  useEffect(() => {
    if (authModal.open) {
      hideAuthModal();
    }
  }, [pathname]);
  return (
    <Modal centered open={authModal.open} onCancel={hideAuthModal} footer={null} width={420} destroyOnClose>
      <div className="px-4 py-2">
        <div className="modal__auth-head mb-3">
          <Logo width={120} height={60} className="mb-3" />
          <p>{t("modalAuth.slogan")}</p>
        </div>
        <div className="modal__auth-main mb-6">
          <Tabs defaultActiveKey="signin" items={items} tabPosition="top" />
        </div>
        <div className="modal__auth-bottom">
          <p className="text-xs text-gray-500 text-center">{t("modalAuth.privacy")}</p>
        </div>
      </div>
    </Modal>
  );
};
export default AuthModal;
