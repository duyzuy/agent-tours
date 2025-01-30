"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useModalManagerSelector } from "@/store";
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
import { usePathname } from "@/utils/navigation";
import useMessage from "@/hooks/useMessage";
const ModalAuth: React.FC = () => {
  const authModal = useModalManagerSelector((state) => state.authModal);
  const message = useMessage();
  const [error, setError] = useState<string | undefined | null>();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("String");
  const { hideAuthModal } = useAuthModal();
  const pathname = usePathname();
  const { signUp, loading: isLoadingRegister } = useSignUp();

  const onSignIn = async (formData: CustomerLoginFormData) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (response?.status === 200) {
        router.refresh();
        message.success("Đăng nhập thành công.");
        setError(undefined);
        hideAuthModal();
      } else {
        setError(response?.error);
      }
    } catch (error) {
      message.error("Login failed!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "signin",
      label: <span className="text-lg">{t("login")}</span>,
      children: <LoginForm error={error} onSubmit={onSignIn} loading={isLoading} />,
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
