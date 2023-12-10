import Logo from "@/components/frontend/partials/Logo";
import { Form, Input } from "antd";
import Image from "next/image";
import LoginForm from "./LoginForm";

const CustomerLogin = () => {
    return (
        <div className="login-page py-16 bg-slate-50">
            <div className="container mx-auto bg-white drop-shadow-lg rounded-lg overflow-hidden">
                <div className="flex">
                    <div className="w-1/2 px-16 py-16">
                        <div className="login-form">
                            <div className="slogan py-2 mb-4">
                                <p className="text-main-400 font-semibold uppercase">
                                    by An Thái Travel
                                </p>
                                <p className="text-sm text-gray-600">
                                    Everything you need for a rewarding travel
                                    career.
                                </p>
                            </div>
                            <div className="head mb-6">
                                <h1 className="text-2xl font-semibold mb-2">
                                    Đăng nhập
                                </h1>
                                <p className="text-sm, text-gray-600 text-sm">
                                    Vui lòng hoàn thành biểu mẫu bên dưới
                                </p>
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="authimage h-full w-full relative">
                            <Image
                                fill
                                src="/assets/images/bg-customer-auth.png"
                                alt="bg auth"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CustomerLogin;
