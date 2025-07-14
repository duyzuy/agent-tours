"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import { useTranslations } from "next-intl";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
import FormItem from "@/components/base/FormItem";
import { CustomerLoginFormData } from "../customerAuth.interface";
import { customerLoginSchema } from "../customerAuth.schema";
import { PASSWORD_MIN_LENGTH } from "../customerAuth.schema";
import { useSignIn } from "../hooks/useSignIn";
import { PropsWithChildren } from "react";
import { useTransition } from "react";

export interface LoginFormProps extends PropsWithChildren {
  onSubmitSuccess?: () => void;
  onForgotPassword?: () => void;
  footer?: React.ReactNode;
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
  suffix?: InputProps["suffix"];
  placeholder: InputProps["placeholder"];
  type: EFieldType;
};

const LoginForm: React.FC<LoginFormProps> = ({ footer, onForgotPassword, onSubmitSuccess }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");

  const [isStartTransition, startTransition] = useTransition();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CustomerLoginFormData>({
    resolver: yupResolver(customerLoginSchema),
  });

  const { signIn, error, loading } = useSignIn({
    redirect: false,
    onSuccess: () =>
      startTransition(() => {
        onSubmitSuccess?.();
      }),
  });

  const FIELDS_INPUT: TFieldInputs[] = [
    {
      name: "username",
      type: EFieldType.TEXT,
      label: t("username.label"),
      placeholder: t("username.placeholder"),
      validateStatus: errors?.username ? "error" : undefined,
      help: errors?.username?.message ? er(errors?.username?.message) : undefined,
      suffix: <LockOutlined className="site-form-item-icon" />,
    },
    {
      name: "password",
      type: EFieldType.PASSWORD,
      label: t("password.label"),
      validateStatus: errors?.password ? "error" : undefined,
      help: errors?.password?.message ? er(errors?.password?.message, { length: PASSWORD_MIN_LENGTH }) : undefined,
      placeholder: t("password.placeholder"),
    },
  ];

  return (
    <Form layout="vertical">
      {error ? <p className="text-red-500 text-center">{error}</p> : null}
      {FIELDS_INPUT.map(({ name, label, placeholder, suffix, help, validateStatus, type }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label={label} help={help} validateStatus={validateStatus}>
              {type === EFieldType.PASSWORD ? (
                <Input.Password
                  {...field}
                  name={name}
                  placeholder={placeholder}
                  size="large"
                  disabled={loading}
                  suffix={suffix}
                />
              ) : (
                <Input
                  {...field}
                  name={name}
                  disabled={loading}
                  placeholder={placeholder}
                  size="large"
                  suffix={suffix}
                />
              )}
            </FormItem>
          )}
        />
      ))}
      <div className="text-right mb-6">
        <span className="text-gray-600 hover:text-blue-600 cursor-pointer !text-xs" onClick={onForgotPassword}>
          {t("forgotPassword")}
        </span>
      </div>
      <FormItem>
        <Button type="primary" block size="large" onClick={handleSubmit(signIn)} loading={loading || isStartTransition}>
          {t("button.login")}
        </Button>
      </FormItem>
      <div className="signin-form__footer">{footer}</div>
    </Form>
  );
};
export default LoginForm;
