"use client";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { customerRegisterSchema } from "../schema/customerAuth.schema";
import { CustomerRegisterFormData } from "../modules/customerAuth.interface";
import { removeVietnameseTones } from "@/utils/helper";
import { useForm, Controller } from "react-hook-form";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
import { yupResolver } from "@hookform/resolvers/yup";
import FormItem from "@/components/base/FormItem";
import { Link } from "@/utils/navigation";

enum EFieldType {
  TEXT = "TEXT",
  PASSWORD = "PASSWORD",
}
type TFieldInputs = {
  name: keyof CustomerRegisterFormData;
  label: string;
  help: FormItemInputProps["help"];
  validateStatus: FormItemProps["validateStatus"];
  size: InputProps["size"];
  suffix?: InputProps["suffix"];
  placeholder: InputProps["placeholder"];
  type: EFieldType;
};

interface RegistrationFormProps {
  onSubmit?: (data: CustomerRegisterFormData) => void;
  loading?: boolean;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, loading = false }) => {
  const t = useTranslations("String");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(customerRegisterSchema) });

  const FIELDS_INPUT: TFieldInputs[] = [
    {
      name: "username",
      type: EFieldType.TEXT,
      label: t("username.label"),
      placeholder: t("username.placeholder"),
      validateStatus: errors?.username ? "error" : "",
      help: errors?.username?.message ? t(errors?.username?.message) : "",
      size: "large",
      suffix: <UserOutlined className="site-form-item-icon" />,
    },
    {
      name: "email",
      type: EFieldType.TEXT,
      label: t("email.label"),
      placeholder: t("email.placeholder"),
      validateStatus: errors?.email ? "error" : "",
      help: errors?.email?.message ? t(errors?.email?.message) : "",
      size: "large",
      suffix: <MailOutlined className="site-form-item-icon" />,
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
    {
      name: "passwordConfirm",
      type: EFieldType.PASSWORD,
      label: t("passwordConfirm.label"),
      validateStatus: errors?.passwordConfirm ? "error" : "",
      help: errors?.passwordConfirm?.message ? t(errors?.passwordConfirm?.message) : "",
      size: "large",
      placeholder: t("passwordConfirm.placeholder"),
    },
  ];

  return (
    <Form layout="vertical">
      {FIELDS_INPUT.map(({ name, label, placeholder, size, suffix, help, validateStatus, type }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <FormItem label={label} help={help} validateStatus={validateStatus}>
              {type === EFieldType.PASSWORD ? (
                <Input.Password
                  value={name === "username" ? removeVietnameseTones(value || "") : value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  placeholder={placeholder}
                  size={size}
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
                  size={size}
                  suffix={suffix}
                />
              )}
            </FormItem>
          )}
        />
      ))}
      <FormItem>
        <Button type="primary" block size="large" onClick={handleSubmit((data) => onSubmit?.(data))}>
          {t("button.register")}
        </Button>
      </FormItem>
      <div className="content-form">
        <p className="text-center text-xs">
          <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>{t("hasAccount")}</Link>
        </p>
      </div>
    </Form>
  );
};
export default RegistrationForm;
