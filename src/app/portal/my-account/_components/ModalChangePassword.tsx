import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import FormItem from "@/components/base/FormItem";
import { ILocalUserChangePasswordFormData } from "@/models/management/localUser.interface";
import { localUserChangePasswordSchema } from "../../user/hooks/validate";

type RequiredChangePasswordFormData =
    Required<ILocalUserChangePasswordFormData>;
interface Props {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    onSubmit: (data: ILocalUserChangePasswordFormData, cb?: () => void) => void;
}

const ModalChangePassword: React.FC<Props> = ({
    isOpen,
    onClose,
    userName,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<ILocalUserChangePasswordFormData>({
        username: userName,
        newPassword: "",
        confirmPassword: "",
    });

    const { handlerSubmit, errors } =
        useFormSubmit<ILocalUserChangePasswordFormData>({
            schema: localUserChangePasswordSchema,
        });

    const onChangeFormData = (
        key: keyof RequiredChangePasswordFormData,
        value: RequiredChangePasswordFormData[keyof RequiredChangePasswordFormData],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: HandleSubmit<ILocalUserChangePasswordFormData> = (
        data,
    ) => {
        onSubmit(data, () => {
            onClose();
        });
    };
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            username: userName,
            newPassword: "",
            confirmPassword: "",
        }));
    }, [isOpen]);
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={false}
            destroyOnClose={true}
            width={450}
        >
            <div className="header py-3 mb-3">
                <h4 className="text-center font-bold text-lg">Đổi mật khẩu</h4>
            </div>
            <Form layout="vertical">
                <FormItem
                    label="Mật khẩu"
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
                        <Button className="mr-2 w-28" onClick={onClose}>
                            Huỷ bỏ
                        </Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                handlerSubmit(formData, handleSubmit)
                            }
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
