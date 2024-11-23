import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Modal, Space } from "antd";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import FormItem from "@/components/base/FormItem";
import { ChangePasswordFormData } from "../modules/userProfileInfo.interface";
import { localUserChangePasswordSchema } from "../../user/hooks/validate";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ModalChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onSubmit: (data: ChangePasswordFormData) => void;
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({ isOpen, onClose, userName, onSubmit }) => {
  const initFormData = new ChangePasswordFormData(userName, "", "");
  const { control, handleSubmit } = useForm<ChangePasswordFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(localUserChangePasswordSchema),
  });

  return (
    <Modal open={isOpen} onCancel={onClose} footer={false} destroyOnClose={true} width={380}>
      <div className="header py-3 mb-3">
        <h4 className="text-center font-bold text-lg">Đổi mật khẩu</h4>
      </div>
      <Form layout="vertical">
        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Mật khẩu mới"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
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
              <Input.Password placeholder="Xác nhận mật khẩu" {...field} />
            </FormItem>
          )}
        />
        <Divider />

        <Space align="center">
          <Button className="w-28" onClick={onClose}>
            Huỷ bỏ
          </Button>
          <Button type="primary" className="w-28" onClick={handleSubmit(onSubmit)}>
            Cập nhật
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};
export default ModalChangePassword;
