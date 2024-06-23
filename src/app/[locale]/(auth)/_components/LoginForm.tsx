"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { CustomerLoginFormData } from "../modules/customerAuth.interface";
import { customerLoginSchema } from "../schema/customerAuth.schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
export interface LoginFormProps {
    onSubmit?: (data: CustomerLoginFormData) => void;
    error?: string | null;
    loading?: boolean;
}
enum EFieldType {
    TEXT = "TEXT",
    PASSWORD = "PASSWORD",
}
type TFieldInputs = {
    name: keyof CustomerLoginFormData;
    label: string;
    help: FormItemInputProps["help"];
    validateStatus: FormItemProps["validateStatus"];
    size: InputProps["size"];
    suffix?: InputProps["suffix"];
    placeholder: InputProps["placeholder"];
    type: EFieldType;
};

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    error,
    loading = false,
}) => {
    const t = useTranslations("String");
    const params = useParams();

    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<CustomerLoginFormData>({
        resolver: yupResolver(customerLoginSchema),
    });

    const FIELDS_INPUT: TFieldInputs[] = [
        {
            name: "username",
            type: EFieldType.TEXT,
            label: t("username.label"),
            placeholder: t("username.placeholder"),
            validateStatus: errors?.username ? "error" : "",
            help: errors?.username?.message ? t(errors?.username?.message) : "",
            size: "large",
            suffix: <LockOutlined className="site-form-item-icon" />,
        },
        {
            name: "password",
            type: EFieldType.PASSWORD,
            label: t("password.label"),
            validateStatus: errors?.password ? "error" : "",
            help: errors?.password?.message ? t(errors?.password?.message) : "",
            size: "large",
            placeholder: t("password.placeholder"),
        },
    ];

    return (
        <Form layout="vertical">
            {error ? <p className="text-red-500 text-center">{error}</p> : null}
            {FIELDS_INPUT.map(
                ({
                    name,
                    label,
                    placeholder,
                    size,
                    suffix,
                    help,
                    validateStatus,
                    type,
                }) => (
                    <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label={label}
                                help={help}
                                validateStatus={validateStatus}
                            >
                                {type === EFieldType.PASSWORD ? (
                                    <Input.Password
                                        {...field}
                                        name={name}
                                        placeholder={placeholder}
                                        size={size}
                                        disabled={loading}
                                        suffix={suffix}
                                    />
                                ) : (
                                    <Input
                                        {...field}
                                        name={name}
                                        disabled={loading}
                                        placeholder={placeholder}
                                        size={size}
                                        suffix={suffix}
                                    />
                                )}
                            </Form.Item>
                        )}
                    />
                ),
            )}
            <Form.Item>
                <Link href="/">
                    <span className="text-gray-400">{t("forgotPassword")}</span>
                </Link>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleSubmit((data) => onSubmit?.(data))}
                    loading={loading}
                >
                    {t("button.login")}
                </Button>
            </Form.Item>
            <p className="text-center text-xs">
                <Link
                    href={`/${params.locale}/${CLIENT_LINKS.CustomerRegister}`}
                >
                    {t("noAccount")}
                </Link>
            </p>
        </Form>
    );
};
export default LoginForm;
