import React, { useState } from "react";
import { Button, Form, Input, Radio, Tag } from "antd";
import FormItem from "@/components/base/FormItem";

const TabAccountConfig: React.FC = () => {
    return (
        <div className="tab-container px-3">
            <div className="head py-3 mb-3">
                <h4 className="text-lg font-semibold">Tài khoản</h4>
                <div className="description text-gray-500">
                    <p>
                        Để sử dụng tính năng tạo sản phẩm dành cho travel, quý
                        khách vui lòng cấu hình tài khoản để sử dụng tính năng.
                        Nếu quý khách chưa có tài khoản, vui lòng liên hệ với
                        bên cung cấp dịch vụ để nhận được tư vấn cũng như tài
                        khoản cấu hình để thực hiện.
                    </p>
                    <p>
                        Tính năng tạo tour chỉ có thể thực hiện khi tài khoản
                        được kích hoạt.
                    </p>
                </div>
            </div>
            <div className="tab-body">
                <div className=" max-w-lg">
                    <Form layout="vertical">
                        <FormItem label="Tên tài khoản" required>
                            <Input placeholder="Nhập tên tài khoản" />
                        </FormItem>
                        <FormItem label="Mật khẩu" required>
                            <Input placeholder="Nhập mật khẩu" />
                        </FormItem>
                        <Button type="primary">Xác nhận</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};
export default TabAccountConfig;
