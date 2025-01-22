"use client";
import { originalLogo } from "@/assets";
import Image from "next/image";

import { LINKS } from "@/constants/links.constant";
import AdminForgotPasswordForm from "@/modules/admin/auth/components/AdminForgotPasswordForm";

const PageForgotPassword = () => {
  return (
    <div className="box w-full max-w-sm">
      <div className="head mb-6">
        <Image src={originalLogo} alt="travel agent" className="mb-6" priority />
        <h1 className="text-2xl font-semibold mb-3">Quên mật khẩu?</h1>
        <p className="text-gray-600">Nhập tên tài khoản để lấy lại thông tin đăng nhập</p>
      </div>
      <AdminForgotPasswordForm />
    </div>
  );
};
export default PageForgotPassword;
