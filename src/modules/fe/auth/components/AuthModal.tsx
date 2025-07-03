"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Modal } from "antd";
import { useTranslations } from "next-intl";
import { useModalSelector } from "@/store/modal/hooks";
import LoginForm from "./LoginForm";
import RegistrationForm, { RegistrationFormProps } from "./RegistrationForm";
import Logo from "@/components/frontend/partials/Logo";
import { usePathname } from "@/utils/navigation";
import useAuthModal from "../hooks/useAuthModal";
import { useSignUp } from "../hooks/useSignUp";
import { useSignIn } from "../hooks/useSignIn";

type TabKeys = "signIn" | "signUp";
const AuthModal: React.FC = () => {
  const { authModal } = useModalSelector();
  const [tabKey, setTabKey] = useState<TabKeys>("signIn");
  const { hideAuthModal } = useAuthModal();
  const pathname = usePathname();
  const t = useTranslations("String");
  const { mutate: signUp, isPending: isLoadingRegister } = useSignUp();

  const { signIn, error, loading } = useSignIn({
    redirect: false,
    callback: () => {
      hideAuthModal();
    },
  });

  const handleSignUp: RegistrationFormProps["onSubmit"] = (data, resetForm) => {
    signUp(data, {
      onSuccess(data, variables, context) {
        setTabKey("signIn");
        resetForm?.();
      },
    });
  };

  useEffect(() => {
    if (authModal.open) {
      hideAuthModal();
    }
  }, [pathname]);
  return (
    <Modal centered open={authModal.open} onCancel={hideAuthModal} footer={null} width={480} destroyOnClose>
      <div className="modal-auth__head mb-3">
        <Logo width={120} height={60} className="mb-3" />
        <p>{t("modalAuth.slogan")}</p>
      </div>
      <div className="modal-auth__main mb-6">
        <Tabs
          activeKey={tabKey}
          onChange={(newKey) => setTabKey(newKey as TabKeys)}
          items={[
            {
              key: "signIn",
              label: <span className="text-lg">{t("login")}</span>,
              children: <LoginForm error={error} onSubmit={signIn} loading={loading} />,
            },
            {
              key: "signUp",
              label: <span className="text-lg">{t("register")}</span>,
              children: <RegistrationForm onSubmit={handleSignUp} loading={isLoadingRegister} />,
            },
          ]}
          tabPosition="top"
        />
      </div>
      <div className="modal-auth__bottom">
        <p className="text-xs text-gray-500 text-center">{t("modalAuth.privacy")}</p>
      </div>
    </Modal>
  );
};
export default AuthModal;
