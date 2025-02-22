import React, { useState } from "react";
import { Form, Input, Popover, Button, PopoverProps, Space } from "antd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import FormItem from "@/components/base/FormItem";
import useChangePasswordLocalUser from "@/modules/admin/user/hooks/useChangePasswordLocalUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { localUserChangePasswordSchema } from "@/modules/admin/user/validate";
import { LocalUserChangePasswordFormData } from "@/modules/admin/user/user.interface";

interface ChangePasswordButtonProps {
  username: string;
}
const ChangePasswordButton: React.FC<ChangePasswordButtonProps> = ({ username }) => {
  const [open, setOpen] = useState(false);

  const initData = new LocalUserChangePasswordFormData(username, "", "");

  const { control, handleSubmit, watch } = useForm<LocalUserChangePasswordFormData>({
    defaultValues: { ...initData },
    resolver: yupResolver(localUserChangePasswordSchema),
  });
  const { mutate: changePassword, isPending } = useChangePasswordLocalUser();

  const onOpenChange: PopoverProps["onOpenChange"] = (newOpen) => {
    setOpen(newOpen);
  };

  const onSubmitForm: SubmitHandler<LocalUserChangePasswordFormData> = (data) => {
    changePassword(data, {
      onSuccess(data, variables, context) {
        setOpen(false);
      },
    });
  };
  const isDisabledButton = !watch("newPassword")?.length || !watch("confirmPassword")?.length;
  return (
    <Popover
      open={open}
      trigger="click"
      placement="rightTop"
      onOpenChange={onOpenChange}
      content={
        <Form layout="vertical" disabled={isPending}>
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
          <div>
            <Space align="center">
              <Button className="w-24" onClick={() => setOpen(false)}>
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
          </div>
        </Form>
      }
    >
      <span className="text-xs text-blue-600 cursor-pointer">Đổi mật khẩu</span>
    </Popover>
  );
};
export default ChangePasswordButton;
