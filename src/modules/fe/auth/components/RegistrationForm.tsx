"use client";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import { useTranslations } from "next-intl";
import { customerRegisterSchema } from "../customerAuth.schema";
import { CustomerRegisterFormData } from "../customerAuth.interface";
import { removeVietnameseTones } from "@/utils/helper";
import { useForm, Controller } from "react-hook-form";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/base/FormItem";

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

export interface RegistrationFormProps {
  onSubmit?: (data: CustomerRegisterFormData, resetForm?: () => void) => void;
  loading?: boolean;
  children?: React.ReactNode;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, loading = false, children }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(customerRegisterSchema) });

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
        <Button
          type="primary"
          block
          size="large"
          onClick={handleSubmit((data) => onSubmit?.(data, reset))}
          loading={loading}
        >
          {t("button.register")}
        </Button>
      </FormItem>
      {children}
    </Form>
  );
};
export default RegistrationForm;
