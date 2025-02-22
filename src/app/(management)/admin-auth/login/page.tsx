"use client";
import Image from "next/image";
import { Button } from "antd";
import { originalLogo } from "@/assets";
import AdminLoginForm from "@/modules/admin/auth/components/AdminLoginForm";
import useAdminLogin from "@/modules/admin/auth/hooks/useAdminLogin";

const AdminLoginPage = () => {
  const { mutate: onLogin, isPending } = useAdminLogin();

  const staffLogin = () => {
    onLogin({
      username: "nguyenhoanglong",
      password: "123123123",
    });
  };
  const agentStaffLogin = () => {
    onLogin({
      username: "duonghaianh",
      password: "123123123",
    });
  };
  const agentLogin = () => {
    onLogin({
      username: "agent01",
      password: "123123123",
    });
  };
  return (
    <div className="box w-full max-w-sm">
      <div className="head mb-6">
        <Image src={originalLogo} alt="travel agent" width={240} className="mb-6" priority />
        <h1 className="text-2xl font-semibold mb-3">Đăng nhập</h1>
        <p className="text-gray-600">Sử dụng tài khoản đăng ký đại lý để đăng nhập.</p>
      </div>
      <AdminLoginForm />
      <div className="text-lg text-center font-bold my-4">hoặc</div>
      <Button
        type="text"
        size="large"
        block
        className="!border-orange-600 !text-orange-600 mb-3"
        onClick={agentLogin}
        loading={isPending}
      >
        Đăng nhập bằng Agent
      </Button>
      <Button
        type="text"
        size="large"
        block
        className="!border-blue-600 !text-blue-600 mb-3"
        onClick={agentStaffLogin}
        loading={isPending}
      >
        Đăng nhập bằng Agent Staff
      </Button>
      <Button
        type="text"
        size="large"
        block
        className="!border-emerald-600 !text-emerald-600"
        onClick={staffLogin}
        loading={isPending}
      >
        Đăng nhập bằng staff
      </Button>
    </div>
  );
};
export default AdminLoginPage;
