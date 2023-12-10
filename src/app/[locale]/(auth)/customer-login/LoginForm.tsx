"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";
const LoginForm = () => {
    return (
        <Form layout="vertical">
            <Form.Item label="Email / Số điện thoại">
                <Input
                    name="account"
                    placeholder="Nhập email hoặc số điện thoại"
                    size="large"
                    suffix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>
            <Form.Item label="Mật khẩu">
                <Input.Password
                    name="password"
                    placeholder="Nhập mật khẩu"
                    size="large"
                />
            </Form.Item>
            <Form.Item>
                <Link href="/">Quên mật khẩu?</Link>
            </Form.Item>
            <Form.Item>
                <Button type="primary" block size="large">
                    ĐĂNG NHẬP
                </Button>
            </Form.Item>
        </Form>
    );
};
export default LoginForm;
