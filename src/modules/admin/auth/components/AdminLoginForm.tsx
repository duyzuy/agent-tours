import React from "react";
import { Form, Input, Button, FormProps } from "antd";
import Link from "next/link";
import useAdminLogin from "../hooks/useAdminLogin";

type AdminLoginFields = {
  username?: string;
  password?: string;
};

const FORGOT_PASSWORD_LINK = "/admin-auth/forgot-password";

const AdminLoginForm: React.FC = () => {
  const [form] = Form.useForm<AdminLoginFields>();
  const { mutate: signIn, isPending } = useAdminLogin();

  const handleLogin: FormProps<AdminLoginFields>["onFinish"] = (data) => {
    signIn(data);
  };

  return (
    <Form<AdminLoginFields>
      name="admin-login"
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleLogin}
      disabled={isPending}
      layout="vertical"
      autoComplete="off"
      initialValues={{
        userId: "99",
        password: "123123",
        username: "99",
      }}
    >
      <Form.Item<AdminLoginFields>
        label="Tên tài khoản/Mã đại lý"
        name="username"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Tên tài khoản/Mã đại lý",
          },
        ]}
      >
        <Input placeholder="Tên tài khoản/Mã đại lý" size="large" />
      </Form.Item>
      <Form.Item<AdminLoginFields>
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu.",
          },
        ]}
      >
        <Input.Password placeholder="Mật khẩu" autoComplete="current_password" size="large" />
      </Form.Item>
      <p className="text-right py-2 mb-4">
        <Link href={FORGOT_PASSWORD_LINK} className="text-blue-600">
          Quên mật khẩu?
        </Link>
      </p>
      <Button type="primary" htmlType="submit" size="large" block loading={isPending}>
        Đăng nhập
      </Button>
    </Form>
  );
};
export default AdminLoginForm;
