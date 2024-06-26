"use client";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useModalManagerSelector } from "@/app/[locale]/hooks/useModalManager";
import useAuthModal from "../../hooks";
import { TabsProps, Tabs } from "antd";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import { useSignUp } from "../../modules/useAuth";
import { signIn } from "next-auth/react";
import { CustomerLoginFormData } from "../../modules/customerAuth.interface";
import { useRouter } from "next/navigation";
const ModalAuth = () => {
    const authModal = useModalManagerSelector((state) => state.authModal);
    const router = useRouter();
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
            console.log(error);
        }
    };

    const items: TabsProps["items"] = [
        {
            key: "signin",
            label: <span className="text-lg">Đăng nhập</span>,
            children: <LoginForm onSubmit={onSignIn} />,
        },
        {
            key: "signup",
            label: <span className="text-lg">Đăng ký</span>,
            children: <RegistrationForm onSubmit={signUp} />,
        },
    ];
    return (
        <>
            <Modal
                centered
                open={authModal.open}
                onCancel={hideAuthModal}
                footer={null}
                width={420}
                destroyOnClose
            >
                <div className="px-4 py-2">
                    <div className="modal__auth-head mb-6">
                        <h3 className="font-[500] text-2xl mb-3">
                            Đăng ký/Đăng nhập
                        </h3>
                        <div>
                            <p>
                                Nhận tài khoản và khám phá niềm vui của bạn ở
                                bất cứ đâu
                            </p>
                        </div>
                    </div>
                    <div className="modal__auth-main mb-6">
                        <Tabs
                            defaultActiveKey="signin"
                            items={items}
                            tabPosition="top"
                        />
                    </div>
                    <div className="modal__auth-bottom">
                        <p className="text-xs text-gray-500 text-center">
                            Bằng cách đăng ký hoặc đăng nhập, bạn đã hiểu và
                            đồng ý với và của chúng tôi.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ModalAuth;
