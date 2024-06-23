import {
    useCustomerRegisterMutation,
    useCustomerGetProfileMutation,
    useCustomerLoginMutation,
} from "@/mutations/auth";
import {
    CustomerLoginFormData,
    CustomerRegisterFormData,
} from "./customerAuth.interface";
import { useRouter } from "next/navigation";
import { useLanguageSelector } from "../../hooks/useLanguage";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { signIn } from "next-auth/react";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";

const useCustomerAuth = () => {
    const { mutate: login } = useCustomerLoginMutation();
    const { mutate: getProfile } = useCustomerGetProfileMutation();

    const onLogin = (data: CustomerLoginFormData) => {
        login(data, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
            },
            onError(error, variables, context) {
                console.log(error, variables, context);
            },
        });
    };
};
export default useCustomerAuth;

export const useSignUp = () => {
    const { mutate: register } = useCustomerRegisterMutation();

    const router = useRouter();
    const message = useMessage();
    const language = useLanguageSelector((state) => state.locale);
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const onRegister = (data: CustomerRegisterFormData) => {
        setLoading(true);
        register(data, {
            onSuccess(data, variables, context) {
                console.log(data, variables, context);
                message.success(
                    "Tạo tài khoản thành công, vui lòng thực hiện đăng nhập",
                );
                router.push(`/${language?.code}/${CLIENT_LINKS.CustomerLogin}`);
                setLoading(false);
            },
            onError(error, variables, context) {
                message.error(error.message);
                setError(error.message);
                setLoading(false);
            },
        });
    };
    return {
        signUp: onRegister,
        loading,
        error,
    };
};
export const useSignIn = () => {
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const onSignIn = (formData: CustomerLoginFormData) => {
        setLoading(true);
        signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: true,
            callbackUrl: "/customer",
        })
            .then((data) => {
                console.log(data);
                if (data?.status !== 200) {
                    setError(data?.error);
                }
            })
            .catch(
                (errors: {
                    error: string;
                    ok: boolean;
                    status: number;
                    url: string | null;
                }) => {
                    setError(errors.error);
                },
            )
            .finally(() => {
                setLoading(false);
            });
    };

    return { signIn: onSignIn, error, loading };
};
