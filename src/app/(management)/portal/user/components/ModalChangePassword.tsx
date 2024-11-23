import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import FormItem from "@/components/base/FormItem";
import { LocalUserChangePasswordFormData } from "../hooks/localUser.interface";
import useChangePasswordLocalUser from "../hooks/useChangePasswordLocalUser";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { localUserChangePasswordSchema } from "../hooks/validate";
interface Props {
  isOpen: boolean;
  onCancel: () => void;
  userName: string;
}

const ModalChangePassword: React.FC<Props> = ({ isOpen, onCancel, userName }) => {
  const initData = new LocalUserChangePasswordFormData(userName, "", "");

  const { control, handleSubmit } = useForm<LocalUserChangePasswordFormData>({
    defaultValues: { ...initData },
    resolver: yupResolver(localUserChangePasswordSchema),
  });
  const { onUpdatePassword, isPending } = useChangePasswordLocalUser();

  const onSubmitForm: SubmitHandler<LocalUserChangePasswordFormData> = (data) => {
    onUpdatePassword(data, {
      onSuccess(data, variables, context) {
        onCancel?.();
      },
    });
  };

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={false} destroyOnClose={true} width={380}>
      <div className="header py-3 mb-3">
        <h4 className="text-center font-bold text-lg">Thay đổi mật khẩu</h4>
      </div>
      <Form layout="vertical">
        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Mật khẩu" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input.Password placeholder="Nhập mật khẩu mới" {...field} />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Xác nhận mật khẩu"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" {...field} />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center">
          <Space align="center">
            <Button className="w-24" onClick={onCancel}>
              Huỷ bỏ
            </Button>
            <Button type="primary" className="w-24" onClick={handleSubmit(onSubmitForm)} loading={isPending}>
              Cập nhật
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};
export default ModalChangePassword;
