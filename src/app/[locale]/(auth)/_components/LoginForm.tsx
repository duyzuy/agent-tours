"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, FormItemProps, Input, InputProps } from "antd";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { CustomerLoginFormData } from "../modules/customerAuth.interface";
import { customerLoginSchema } from "../schema/customerAuth.schema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItemInputProps } from "antd/es/form/FormItemInput";
import FormItem from "@/components/base/FormItem";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
export interface LoginFormProps {
  onSubmit?: (data: CustomerLoginFormData) => void;
  onForgotPassword?: () => void;
  error?: string | null;
  loading?: boolean;
  children?: React.ReactNode;
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

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, loading = false, children, onForgotPassword }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const params = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
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
      help: errors?.username?.message ? er(errors?.username?.message) : "",
      size: "large",
      suffix: <LockOutlined className="site-form-item-icon" />,
    },
    {
      name: "password",
      type: EFieldType.PASSWORD,
      label: t("password.label"),
      validateStatus: errors?.password ? "error" : "",
      help: errors?.password?.message ? er(errors?.password?.message) : "",
      size: "large",
      placeholder: t("password.placeholder"),
    },
  ];

  return (
    <Form layout="vertical">
      {error ? <p className="text-red-500 text-center">{error}</p> : null}
      {FIELDS_INPUT.map(({ name, label, placeholder, size, suffix, help, validateStatus, type }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <Form.Item label={label} help={help} validateStatus={validateStatus}>
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
      ))}
      <FormItem style={{ marginBottom: 0 }}>
        <div className="text-right mb-6">
          <span className="text-gray-400 hover:text-primary-default cursor-pointer" onClick={onForgotPassword}>
            {t("forgotPassword")}
          </span>
        </div>
      </FormItem>
      <div>
        <Button type="primary" block size="large" onClick={handleSubmit((data) => onSubmit?.(data))} loading={loading}>
          {t("button.login")}
        </Button>
      </div>
      {children}
    </Form>
  );
};
export default LoginForm;
