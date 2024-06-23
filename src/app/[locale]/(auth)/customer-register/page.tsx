"use client";
import Image from "next/image";
import RegistrationForm from "../_components/RegistrationForm";
import { useTranslations } from "next-intl";
import { useSignUp } from "../modules/useAuth";

const CustomerRegisterPage = () => {
    const t = useTranslations("String");

    const { signUp, error, loading } = useSignUp();
    return (
        <div className="login-page py-16 bg-slate-50">
            <div className="container mx-auto bg-white drop-shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-wrap lg:flex-row">
                    <div className="w-full lg:w-1/2 px-16 py-16">
                        <div className="login-form">
                            <div className="slogan py-2 mb-4">
                                <p className="text-main-400 font-semibold uppercase">
                                    {t("byAgentName")}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {t("slogan")}
                                </p>
                            </div>
                            <div className="head mb-6">
                                <h1 className="text-2xl font-semibold mb-2">
                                    {t("register")}
                                </h1>
                                <p className="text-sm, text-gray-600 text-sm">
                                    {t("loginPage.note1")}
                                </p>
                            </div>
                            <RegistrationForm
                                onSubmit={signUp}
                                loading={loading}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="auth__image h-42 lg:h-full w-full relative">
                            <Image
                                fill
                                src="/assets/images/bg-customer-auth.png"
                                alt="bg auth"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CustomerRegisterPage;
