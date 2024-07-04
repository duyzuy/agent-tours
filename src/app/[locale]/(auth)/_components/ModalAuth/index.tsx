"use client";
import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useModalManagerSelector } from "@/app/[locale]/hooks/useModalManager";
import useAuthModal from "../../hooks";
import { TabsProps, Tabs } from "antd";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import { useSignUp } from "../../modules/useAuth";
import { signIn } from "next-auth/react";
import { CustomerLoginFormData } from "../../modules/customerAuth.interface";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "@/components/frontend/partials/Logo";

const ModalAuth: React.FC = () => {
  const authModal = useModalManagerSelector((state) => state.authModal);
  const router = useRouter();
  const t = useTranslations("String");
  const { hideAuthModal } = useAuthModal();

  const { signUp } = useSignUp();

  const onSignIn = async (formData: CustomerLoginFormData) => {
    try {
      const response = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });
      if (response?.status) {
        router.refresh();
        hideAuthModal();
      }
    } catch (error) {
      message.error("Login failed!");
      console.log(error);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "signin",
      label: <span className="text-lg">{t("login")}</span>,
      children: <LoginForm onSubmit={onSignIn} />,
    },
    {
      key: "signup",
      label: <span className="text-lg">{t("register")}</span>,
      children: <RegistrationForm onSubmit={signUp} />,
    },
  ];
  return (
    <Modal centered open={authModal.open} onCancel={hideAuthModal} footer={null} width={420} destroyOnClose>
      <div className="px-4 py-2">
        <div className="modal__auth-head mb-6">
          <Logo width={60} height={60} className="mb-3" />
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
export default ModalAuth;
