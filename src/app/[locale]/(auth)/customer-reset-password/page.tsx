"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import { useSearchParams } from "next/navigation";
import { useGetResetPasswordQuery } from "@/queries/fe/auth";
import { isUndefined } from "lodash";
import useBroadcastChannel from "@/hooks/fe/useBroadcastChanel";
import { BroadcastMessageResetPassword } from "../customer-forgot-password/page";
import { useRouter } from "@/utils/navigation";
import useMessage from "@/hooks/useMessage";

import { useSetNewPassword } from "@/modules/fe/auth/hooks/useSetNewPassword";
import CreatePasswordForm, { CreatePasswordFormProps } from "@/modules/fe/auth/components/CreatePasswordForm";
const CustomerResetPasswordPage = () => {
  const t = useTranslations("String");
  const params = useSearchParams();
  const router = useRouter();
  const { mutate: setNewPassword, isPending } = useSetNewPassword();
  const message = useMessage();
  const secretKey = params.get("secretKey") || "";
  const userId = params.get("userId") || "";

  const enabled = !isUndefined(secretKey) && !isUndefined(userId);

  const { data, isLoading } = useGetResetPasswordQuery({ enable: enabled, secretKey: secretKey });

  const { postMessage } = useBroadcastChannel<BroadcastMessageResetPassword>("channelResetPassword", (message) => {
    console.log(message);
  });

  const createNewPassword: CreatePasswordFormProps["onSubmit"] = (data) => {
    setNewPassword(data, {
      onSuccess(data, variables, context) {
        postMessage({ message: "reset password success", status: "success" });
        router.push(`/${CLIENT_LINKS.CustomerLogin}`);
        message.success("Cập nhật mật khẩu thành công.");
      },
      onError(error, variables, context) {
        console.log(error);
        postMessage({ message: "reset password failed", status: "failed" });
        message.error("Cập nhật mật khẩu thất bại.");
      },
    });
  };

  useEffect(() => {
    if (!isLoading && !isUndefined(data) && data === "false") {
      router.push(`/${CLIENT_LINKS.CustomerForgotPassword}`);
    }
  }, [data, isLoading]);
  return (
    <AuthLayout title={t("pageTitle.resetPassword")}>
      <CreatePasswordForm onSubmit={createNewPassword} userId={Number(userId)} isLoading={isPending} />
    </AuthLayout>
  );
};
export default CustomerResetPasswordPage;
