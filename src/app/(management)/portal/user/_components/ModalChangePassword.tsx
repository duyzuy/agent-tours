import React from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import FormItem from "@/components/base/FormItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { localUserChangePasswordSchema } from "@/modules/admin/user/validate";
import useChangePasswordLocalUser from "@/modules/admin/user/hooks/useChangePasswordLocalUser";
import { LocalUserChangePasswordFormData } from "@/modules/admin/user/user.interface";
interface Props {
  isOpen: boolean;
  onCancel: () => void;
  userName: string;
}

const ModalChangePassword: React.FC<Props> = ({ isOpen, onCancel, userName }) => {
  const initData = new LocalUserChangePasswordFormData(userName, "", "");

  const { control, handleSubmit, watch } = useForm<LocalUserChangePasswordFormData>({
    defaultValues: { ...initData },
    resolver: yupResolver(localUserChangePasswordSchema),
  });
  const { mutate: updatePassword, isPending } = useChangePasswordLocalUser();

  const onSubmitForm: SubmitHandler<LocalUserChangePasswordFormData> = (data) => {
    updatePassword(data, {
      onSuccess(data, variables, context) {
        onCancel?.();
      },
    });
  };

  const isDisabledButton = !watch("newPassword")?.length || !watch("confirmPassword")?.length;
  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      destroyOnClose={true}
      maskClosable={false}
      closeIcon={null}
      width={380}
      footer={
        <Space align="center">
          <Button className="w-24" onClick={onCancel}>
            Huỷ bỏ
          </Button>
          <Button
            type="primary"
            className="w-24"
            onClick={handleSubmit(onSubmitForm)}
            loading={isPending}
            disabled={isDisabledButton}
          >
            Lưu
          </Button>
        </Space>
      }
    >
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
      </Form>
    </Modal>
  );
};
export default ModalChangePassword;
