"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { useModalSelector } from "@/store/modal/hooks";
import LoginForm from "./LoginForm";
import RegistrationForm, { RegistrationFormProps } from "./RegistrationForm";
import useAuthModal from "../hooks/useAuthModal";
import { useRouter, usePathname } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

interface AuthModalProps {
  open?: boolean;
}
const AuthModal: React.FC<AuthModalProps> = ({}) => {
  const { authModal } = useModalSelector();
  const { hideAuthModal } = useAuthModal();
  const router = useRouter();
  const [modalAction, setModalAction] = useState<"signIn" | "signUp">("signIn");

  const pathname = usePathname();
  const t = useTranslations("String");

  const onSignUpSuccess: RegistrationFormProps["onSubmitSuccess"] = () => {
    setModalAction("signIn");
  };

  const onSignInSuccess = useCallback(() => {
    router.refresh();
    hideAuthModal();
  }, []);
  useEffect(() => {
    if (authModal.open) {
      hideAuthModal();
    }
  }, [pathname]);
  return (
    <Modal
      centered
      open={authModal.open}
      onCancel={hideAuthModal}
      footer={null}
      width={480}
      destroyOnClose
      className="!rounded-xl overflow-hidden"
    >
      <div className="p-4">
        <div className="modal-auth__main mb-6">
          <div className="mb-6">
            <h3 className="text-2xl font-[500] mb-3">{modalAction === "signIn" ? t("login") : t("register")}</h3>
            <p>{t("modalAuth.slogan")} </p>
          </div>
          {modalAction === "signIn" ? (
            <LoginForm
              onSubmitSuccess={onSignInSuccess}
              onForgotPassword={() => router.push(`/${CLIENT_LINKS.CustomerForgotPassword}`)}
              footer={
                <div className="text-center text-xs">
                  <span className="text-primary-default cursor-pointer" onClick={() => setModalAction("signUp")}>
                    {t("noAccount")}
                  </span>
                </div>
              }
            />
          ) : null}
          {modalAction === "signUp" ? (
            <RegistrationForm
              onSubmitSuccess={onSignUpSuccess}
              footer={
                <div className="text-center text-xs">
                  <span className="text-primary-default cursor-pointer" onClick={() => setModalAction("signIn")}>
                    {t("hasAccount")}
                  </span>
                </div>
              }
            />
          ) : null}
        </div>
        <div className="modal-auth__bottom border-t pt-6">
          <p className="text-xs text-gray-500 text-center">{t("modalAuth.privacy")}</p>
        </div>
      </div>
    </Modal>
  );
};
export default memo(AuthModal);
