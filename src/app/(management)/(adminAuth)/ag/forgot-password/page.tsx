"use client";
import { Button } from "antd";
import { Form, Input } from "antd";
import { travelLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

import { LINKS } from "@/constants/links.constant";

const PageForgotPassword = () => {
  const onFinish = () => {};
  return (
    <div className="box w-full max-w-sm">
      <div className="head mb-6">
        <Image src={travelLogo} alt="travel agent" className="mb-6" priority />
        <h1 className="text-2xl font-semibold mb-3">Quên mật khẩu?</h1>
        <p className="text-gray-600">Nhập tên tài khoản để lấy lại thông tin đăng nhập</p>
      </div>

      <div className="form">
        <Form
          name="ag_login"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
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
            <Link href={LINKS.PortalLogin} className="text-blue-600">
              Quay lại đăng nhập.
            </Link>
          </p>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" block className="bg-primary-light">
              Lấy lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default PageForgotPassword;
