import { Form, Input, Button } from "antd";
import Link from "next/link";
import useAdminLogin from "../hooks/useAdminLogin";

type AdminLoginFields = {
  userId: string;
  username: string;
  password: string;
};

const FORGOT_PASSWORD_LINK = "/ag/forgot-password";

const AdminLoginForm = () => {
  const { mutate: signIn, isPending } = useAdminLogin();
  const initalFormData = {
    userId: "99",
    password: "123123123",
    username: "99",
  };
  return (
    <Form
      name="adminLogin"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={signIn}
      disabled={isPending}
      layout="vertical"
      initialValues={initalFormData}
    >
      <Form.Item<AdminLoginFields>
        label="ID"
        name="userId"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập ID",
          },
        ]}
      >
        <Input placeholder="Tên tài khoản/Mã đại lý" />
      </Form.Item>
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
        <Input placeholder="Tên tài khoản/Mã đại lý" />
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
        <Input.Password placeholder="Mật khẩu" autoComplete="current_password" />
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
