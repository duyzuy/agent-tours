"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";
import { useState } from "react";
import Counter from "./Counter";
import { Button } from "antd";
import useBroadcastChannel from "@/hooks/fe/useBroadcastChanel";
import AuthLayout from "@/components/layouts/fe/AuthLayout";
import ForgotPasswordForm from "@/modules/fe/auth/components/ForgotPasswordForm";

import { CustomerForgotPasswordResponse } from "@/models/customerAuth.interface";

export type BroadcastMessageResetPassword = {
  message: string;
  status: "success" | "failed";
};
const CustomerForgotPasswordPage = () => {
  const [forgotPasswordData, setForgotPasswordData] = useState<CustomerForgotPasswordResponse>();
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const t = useTranslations("String");

  useBroadcastChannel<BroadcastMessageResetPassword>("channelResetPassword", (message) => {
    if (message.status === "success") {
      setResetPasswordSuccess(true);
    }
  });

  return (
    <AuthLayout title={t("forgotPassword")}>
      {resetPasswordSuccess ? (
        <div className="text-center border rounded-md py-4 px-3 text-emerald-500">
          <p className="font-[500] text-lg">Lấy lại mật khẩu thành công.</p>
          <p>
            <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>
              <span className="text-primary-default">{t("returnLogin")}</span>
            </Link>
          </p>
        </div>
      ) : (
        <>
          {forgotPasswordData ? (
            <ResetPasswordProcess
              description={
                <div className="content mb-3">
                  <p className="text-emerald-500 font-bold text-xl mb-3">Gửi yêu cầu thành công</p>
                  <p>
                    Yêu cầu đã được gửi tới email <strong>{forgotPasswordData.result.email}</strong>
                  </p>
                  <p>Vui lòng kiểm tra email và và làm theo hướng dẫn để lấy lại mật khẩu.</p>
                </div>
              }
              counterTime={forgotPasswordData.result.expiredAfter}
            />
          ) : (
            <ForgotPasswordForm
              onSuccess={setForgotPasswordData}
              footer={
                <p className="text-center text-xs py-2 mt-3">
                  <Link href={`/${CLIENT_LINKS.CustomerLogin}`}>{t("returnLogin")}</Link>
                </p>
              }
            />
          )}
        </>
      )}
    </AuthLayout>
  );
};
export default CustomerForgotPasswordPage;

const ResetPasswordProcess = ({
  counterTime,

  description,
}: {
  counterTime?: number;

  description: React.ReactNode;
}) => {
  const router = useRouter();
  const [isExpired, setExpired] = useState(false);
  return (
    <div className="forgot-password">
      <div className="text-center">
        <div className="forgot-password__description">{description}</div>
        {isExpired ? (
          <div className="forgot-password__exprired">
            <div className="text-red-600 mb-3">
              <p>Thời gian hiệu lực lấy lại mật khẩu đã hết hạn.</p>
              <p>Vui lòng thao tác lại!</p>
            </div>
            <Button size="small" type="primary" ghost onClick={() => router.refresh()}>
              Thực hiện lại
            </Button>
          </div>
        ) : (
          <div className="forgot-password__count-down">
            <p className="text-center mb-3">Còn lại</p>
            <Counter durationTime={counterTime} onFinish={() => setExpired(true)} />
          </div>
        )}
      </div>
    </div>
  );
};
