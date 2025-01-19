"use client";
import FormItem from "@/components/base/FormItem";
import { Button, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerCreatePasswordFormData } from "../modules/customerAuth.interface";
import { customerCreatePasswordSchema, PASSWORD_MIN_LENGTH } from "../modules/customerAuth.schema";
import { useTranslations } from "next-intl";
import { SubmitHandler } from "react-hook-form";
import classNames from "classnames";

export interface CreatePasswordFormProps {
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<CustomerCreatePasswordFormData>;
  className?: string;
  isLoading?: boolean;
  userId?: number;
}
const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({
  children,
  onSubmit,
  className = "",
  isLoading,
  userId,
}) => {
  const t = useTranslations("String");
  const er = useTranslations("Error");
  const initData = new CustomerCreatePasswordFormData(userId || 0, "", "");

  const { handleSubmit, control } = useForm<CustomerCreatePasswordFormData>({
    resolver: yupResolver(customerCreatePasswordSchema),
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
            name="password"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormItem
                label={t("password.label")}
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message ? er(errors.password.message, { length: PASSWORD_MIN_LENGTH }) : ""}
              >
                <Input.Password {...field} placeholder={t("password.placeholder")} size="large" disabled={isLoading} />
              </FormItem>
            )}
          ></Controller>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field, formState: { errors } }) => (
              <FormItem
                label={t("passwordConfirm.label")}
                validateStatus={errors.passwordConfirm ? "error" : ""}
                help={errors.passwordConfirm?.message ? er(errors.passwordConfirm.message) : ""}
              >
                <Input.Password
                  {...field}
                  placeholder={t("passwordConfirm.placeholder")}
                  size="large"
                  disabled={isLoading}
                />
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
              {t("button.confirm")}
            </Button>
          </FormItem>
        </Form>
      </div>
      <>{children}</>
    </>
  );
};
export default CreatePasswordForm;
