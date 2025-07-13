"use client";
import React, { PropsWithChildren } from "react";
import { Button, Form, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerForgotPasswordFormData } from "../customerAuth.interface";
import { customerForgotPasswordSchema } from "../customerAuth.schema";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import { useResetPassword } from "../hooks/useResetPassword";
import { CustomerForgotPasswordResponse } from "@/models/customerAuth.interface";

export interface ForgotPasswordFormProps extends PropsWithChildren {
  footer: React.ReactNode;
  className?: string;
  onSuccess?: (data: CustomerForgotPasswordResponse) => void;
  onError?: () => void;
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ className = "", onSuccess, onError, footer }) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const initData = new CustomerForgotPasswordFormData("", "");

  const { handleSubmit, control, reset } = useForm<CustomerForgotPasswordFormData>({
    resolver: yupResolver(customerForgotPasswordSchema),
    defaultValues: initData,
  });

  const { mutate: resetPassword, isPending: isLoading } = useResetPassword();

  const onResetPassword: SubmitHandler<CustomerForgotPasswordFormData> = (formData) => {
    resetPassword(formData, {
      onSuccess(data) {
        onSuccess?.(data);
        reset();
      },
      onError,
    });
  };
  return (
    <>
      <div
        className={classNames("forgot-password", {
          [className]: className,
        })}
      >
        <Form layout="vertical">
          <Controller
            name="userName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={t("username.label")}
                validateStatus={error ? "error" : ""}
                help={error?.message ? er(error.message) : ""}
              >
                <Input {...field} placeholder={t("username.placeholder")} size="large" disabled={isLoading} />
              </FormItem>
            )}
          ></Controller>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem
                label={t("email.label")}
                validateStatus={error ? "error" : ""}
                help={error?.message ? er(error.message) : ""}
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
              onClick={handleSubmit(onResetPassword)}
              loading={isLoading}
            >
              {t("button.resetPassword")}
            </Button>
          </FormItem>
        </Form>
        <div className="forgot-password__footer">{footer}</div>
      </div>
    </>
  );
};
export default ForgotPasswordForm;
