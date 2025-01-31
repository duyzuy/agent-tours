"use client";
import FormItem from "@/components/base/FormItem";
import { Button, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerForgotPasswordFormData } from "../customerAuth.interface";
import { customerForgotPasswordSchema } from "../customerAuth.schema";
import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";
import classNames from "classnames";

export interface ForgotPasswordFormProps {
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<CustomerForgotPasswordFormData>;
  className?: string;
  isLoading?: boolean;
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ children, onSubmit, className = "", isLoading }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const initData = new CustomerForgotPasswordFormData("", "");

  const { handleSubmit, control } = useForm<CustomerForgotPasswordFormData>({
    resolver: yupResolver(customerForgotPasswordSchema),
    defaultValues: initData,
  });

  return (
    <>
      <div
        className={classNames("forgot-password", {
          [className]: className,
        })}
      >
        <Form layout="vertical">
          <Controller
            name="username"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormItem
                label={t("username.label")}
                validateStatus={errors.username ? "error" : ""}
                help={errors.username?.message ? er(errors.username.message) : ""}
              >
                <Input {...field} placeholder={t("username.placeholder")} size="large" disabled={isLoading} />
              </FormItem>
            )}
          ></Controller>
          <Controller
            name="email"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormItem
                label={t("email.label")}
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message ? er(errors.email.message) : ""}
              >
                <Input {...field} placeholder={t("email.placeholder")} size="large" disabled={isLoading} />
              </FormItem>
            )}
          ></Controller>
          <FormItem>
            <Button
              size="large"
              type="primary"
              className="w-full"
              onClick={onSubmit && handleSubmit(onSubmit)}
              loading={isLoading}
            >
              {t("button.resetPassword")}
            </Button>
          </FormItem>
        </Form>
      </div>
      <>{children}</>
    </>
  );
};
export default ForgotPasswordForm;
