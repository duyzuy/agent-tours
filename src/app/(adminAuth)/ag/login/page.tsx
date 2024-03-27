"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Button } from "antd";
import { travelLogo } from "@/assets";
import { LINKS } from "@/constants/links.constant";
import useAuth from "@/hooks/useAgAuth";
import { useLoginPortal } from "../hooks/useAgAuth";
import useMessage from "@/hooks/useMessage";
export interface IAgLoginFormFields {
    userId: string;
    username: string;
    password: string;
}
const LoginPage = () => {
    const { mutate: onLoginPortal, isPending } = useLoginPortal();
    const message = useMessage();
    const router = useRouter();
    const { setToken } = useAuth();

    const onFinish = (data: IAgLoginFormFields) => {
        onLoginPortal(
            {
                userId: data.userId,
                username: data.username,
                password: data.password,
            },
            {
                onSuccess: (data, variables) => {
                    setToken(data.result);
                    router.push(LINKS.DashBoard);
                },
                onError(error, variables, context) {
                    console.log(error);
                    message.error(error.message);
                },
            },
        );
    };

    return (
        <div className="box w-full max-w-sm">
            <div className="head mb-6">
                <Image
                    src={travelLogo}
                    alt="travel agent"
                    className="mb-6"
                    priority
                />
                <h1 className="text-2xl font-semibold mb-3">Đăng nhập</h1>
                <p className="text-gray-600">
                    Sử dụng tài khoản đăng ký đại lý để đăng nhập.
                </p>
            </div>
            <div className="form">
                <Form
                    name="ag_login"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{
                        userId: "99",
                        password: "111111111",
                        username: "99",
                    }}
                >
                    <Form.Item<IAgLoginFormFields>
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
                    <Form.Item<IAgLoginFormFields>
                        label="Tên tài khoản/Mã đại lý"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Vui lòng nhập Tên tài khoản/Mã đại lý",
                            },
                        ]}
                    >
                        <Input placeholder="Tên tài khoản/Mã đại lý" />
                    </Form.Item>

                    <Form.Item<IAgLoginFormFields>
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu.",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Mật khẩu"
                            autoComplete="current_password"
                        />
                    </Form.Item>
                    <p className="text-right py-2 mb-4">
                        <Link
                            href={LINKS.PortalForgotPassword}
                            className="text-blue-600"
                        >
                            Quên mật khẩu?
                        </Link>
                    </p>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="bg-primary-default"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default LoginPage;
