"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import AuthLayoutWraper from "../_components/AuthLayoutWraper";
import { useSearchParams } from "next/navigation";
import { useGetResetPasswordQuery } from "@/queries/fe/auth";
import { isEmpty, isUndefined } from "lodash";
import CreatePasswordForm, { CreatePasswordFormProps } from "../_components/CreatePasswordForm";
import useBroadcastChannel from "@/hooks/fe/useBroadcastChanel";
import { BroadcastMessageResetPassword } from "../customer-forgot-password/page";
import { useCustomerSetNewPasswordMutation } from "@/mutations/auth";
import { useRouter } from "@/utils/navigation";
import useMessage from "@/hooks/useMessage";
const CustomerResetPasswordPage = () => {
  const t = useTranslations("String");
  const params = useSearchParams();
  const router = useRouter();
  const { mutate: setNewPassword, isPending, isIdle } = useCustomerSetNewPasswordMutation();
  const message = useMessage();
  const secretKey = params.get("secretKey") || "";
  const userId = params.get("userId") || "";

  const enabled = !isUndefined(secretKey) && !isUndefined(userId);

  const { data, isLoading } = useGetResetPasswordQuery({ enable: enabled, secretKey: secretKey });

  const { postMessage } = useBroadcastChannel<BroadcastMessageResetPassword>("channelResetPassword", (message) => {
    console.log(message);
  });

  // const onFinishReset = () => {
  //   postMessage({ message: "reset password success", status: "success" });
  // };
  const createNewPassword: CreatePasswordFormProps["onSubmit"] = (data) => {
    console.log(data);
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
    <AuthLayoutWraper title={t("pageTitle.resetPassword")}>
      {/* <Button onClick={onFinishReset}>finish</Button> */}
      <CreatePasswordForm onSubmit={createNewPassword} userId={Number(userId)} isLoading={isPending} />
    </AuthLayoutWraper>
  );
};
export default CustomerResetPasswordPage;
