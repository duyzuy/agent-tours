"use client";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import { useTranslations } from "next-intl";
import { customerRegisterSchema } from "../customerAuth.schema";
import { CustomerRegisterFormData } from "../customerAuth.interface";
import { removeVietnameseTones } from "@/utils/helper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/base/FormItem";
import { useSignUp } from "../hooks/useSignUp";
import { PropsWithChildren } from "react";

enum EFieldType {
  TEXT = "TEXT",
  PASSWORD = "PASSWORD",
}
type TFieldInputs = {
  name: keyof CustomerRegisterFormData;
  label: string;
  help: FormItemInputProps["help"];
  validateStatus: FormItemProps["validateStatus"];
  suffix?: InputProps["suffix"];
  placeholder: InputProps["placeholder"];
  type: EFieldType;
};

export interface RegistrationFormProps extends PropsWithChildren {
  footer?: React.ReactNode;
  onSubmitSuccess?: () => void;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({ footer, onSubmitSuccess }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const { mutate: signUp, isPending: loading } = useSignUp();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CustomerRegisterFormData>({ resolver: yupResolver(customerRegisterSchema) });

  const submitForm: SubmitHandler<CustomerRegisterFormData> = (data) => {
    signUp(data, {
      onSuccess(data, variables, context) {
        reset();
        onSubmitSuccess?.();
      },
    });
  };

  const FIELDS_INPUT: TFieldInputs[] = [
    {
      name: "username",
      type: EFieldType.TEXT,
      label: t("username.label"),
      placeholder: t("username.placeholder"),
      validateStatus: errors?.username ? "error" : undefined,
      help: errors?.username?.message ? er(errors?.username?.message) : undefined,
      suffix: <UserOutlined className="site-form-item-icon" />,
    },
    {
      name: "email",
      type: EFieldType.TEXT,
      label: t("email.label"),
      placeholder: t("email.placeholder"),
      validateStatus: errors?.email ? "error" : undefined,
      help: errors?.email?.message ? er(errors?.email?.message) : undefined,
      suffix: <MailOutlined className="site-form-item-icon" />,
    },
    {
      name: "password",
      type: EFieldType.PASSWORD,
      label: t("password.label"),
      validateStatus: errors?.password ? "error" : undefined,
      help: errors?.password?.message ? er(errors?.password?.message) : undefined,
      placeholder: t("password.placeholder"),
    },
    {
      name: "passwordConfirm",
      type: EFieldType.PASSWORD,
      label: t("passwordConfirm.label"),
      validateStatus: errors?.passwordConfirm ? "error" : undefined,
      help: errors?.passwordConfirm?.message ? er(errors?.passwordConfirm?.message) : undefined,
      placeholder: t("passwordConfirm.placeholder"),
    },
  ];

  return (
    <Form layout="vertical" disabled={loading}>
      {FIELDS_INPUT.map(({ name, label, placeholder, suffix, help, validateStatus, type }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
            <FormItem label={label} help={help} validateStatus={validateStatus}>
              {type === EFieldType.PASSWORD ? (
                <Input.Password
                  value={name === "username" ? removeVietnameseTones(value || "") : value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  placeholder={placeholder}
                  size="large"
                  disabled={loading}
                  suffix={suffix}
                />
              ) : (
                <Input
                  value={name === "username" ? removeVietnameseTones(value || "") : value}
                  onChange={onChange}
                  onBlur={onBlur}
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
      <FormItem>
        <Button type="primary" block size="large" onClick={handleSubmit((data) => submitForm(data))} loading={loading}>
          {t("button.register")}
        </Button>
      </FormItem>
      <div className="footer">{footer}</div>
    </Form>
  );
};
export default RegistrationForm;
