import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { TLocalUserChangePasswordErrorsField } from "../hooks/useChangePasswordLocalUser";
import FormItem from "@/components/base/FormItem";
import {
    ILocalUserChangePasswordFormData,
    ILocalUserList,
} from "@/Model/Management/localUser.interface";
import styled from "styled-components";
interface Props {
    isOpen: boolean;
    onConfirm: (payload: ILocalUserChangePasswordFormData) => void;
    onCancel: () => void;
    localUser: ILocalUserList["result"][0];
    errors?: TLocalUserChangePasswordErrorsField;
}

const ModalChangePassword: React.FC<Props> = ({
    isOpen,
    onConfirm,
    onCancel,
    localUser,
    errors,
}) => {
    const [formData, setFormData] = useState<ILocalUserChangePasswordFormData>({
        username: "",
        newPassword: "",
        confirmPassword: "",
    });

    const onChangeFormData = (
        key: keyof ILocalUserChangePasswordFormData,
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            username: localUser.username,
            newPassword: "",
            confirmPassword: "",
        }));
    }, [localUser, isOpen]);
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            footer={false}
            destroyOnClose={true}
            width={450}
        >
            <div className="header py-3 mb-3">
                <h4 className="text-center font-bold text-lg">
                    Thay đổi mật khẩu
                </h4>
            </div>
            <Form layout="vertical">
                <FormItem
                    label="Mật khẩu"
                    labelAlign="left"
                    required
                    validateStatus={errors?.newPassword ? "error" : ""}
                    help={errors?.newPassword || ""}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu mới"
                        value={formData.newPassword}
                        onChange={(e) =>
                            onChangeFormData("newPassword", e.target.value)
                        }
                    />
                </FormItem>

                <FormItem
                    label="Xác nhận mật khẩu"
                    required
                    labelAlign="left"
                    validateStatus={errors?.confirmPassword ? "error" : ""}
                    help={errors?.confirmPassword || ""}
                >
                    <Input.Password
                        placeholder="Nhập lại mật khẩu mới"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            onChangeFormData("confirmPassword", e.target.value)
                        }
                    />
                </FormItem>
                <div className="h-6"></div>
                <FormItem>
                    <Space align="center">
                        <Button className="mr-2 w-28" onClick={onCancel}>
                            Huỷ bỏ
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => onConfirm(formData)}
                        >
                            Cập nhật
                        </Button>
                    </Space>
                </FormItem>
            </Form>
        </Modal>
    );
};
export default ModalChangePassword;
