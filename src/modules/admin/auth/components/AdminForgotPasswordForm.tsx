import { Form, Input, Button } from "antd";
import Link from "next/link";
const ADMIN_LOGIN_LINK = "/ag/login";
const AdminForgotPasswordForm = () => {
  return (
    <Form
      name="adminForgotPassword"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      // onFinish={onFinish}
      layout="vertical"
      size="large"
      datatype=""
    >
      <Form.Item<{ username: string }>
        label="Tên tài khoản"
        name="username"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tên tài khoản.",
          },
        ]}
      >
        <Input placeholder="Tên tài khoản" />
      </Form.Item>
      <p className="text-right py-2 mb-4">
        <Link href={ADMIN_LOGIN_LINK} className="text-blue-600">
          Quay lại đăng nhập.
        </Link>
      </p>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button type="primary" htmlType="submit" block className="bg-primary-light">
          Lấy lại mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AdminForgotPasswordForm;
