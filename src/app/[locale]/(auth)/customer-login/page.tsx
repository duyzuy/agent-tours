"use client";
import Image from "next/image";
import LoginForm, { LoginFormProps } from "../_components/LoginForm";
import { useTranslations } from "next-intl";
import { useSignIn } from "../modules/useAuth";
import { useSession } from "next-auth/react";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
const CustomerLogin = () => {
    const t = useTranslations("String");

    const data = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    });
    console.log(data);
    const { signIn, error, loading } = useSignIn();

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
                                    {t("login")}
                                </h1>
                                <p className="text-sm, text-gray-600 text-sm">
                                    {t("loginPage.note1")}
                                </p>
                            </div>
                            <LoginForm
                                onSubmit={signIn}
                                error={error}
                                loading={loading}
                            >
                                <p className="text-center text-xs">
                                    <Link
                                        href={`/${CLIENT_LINKS.CustomerRegister}`}
                                    >
                                        {t("noAccount")}
                                    </Link>
                                </p>
                            </LoginForm>
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
export default CustomerLogin;
