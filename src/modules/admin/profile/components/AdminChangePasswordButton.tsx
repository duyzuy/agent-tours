import React, { useMemo, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import FormItem from "@/components/base/FormItem";
import { ChangePasswordFormData } from "../adminProfile.types";

import { adminChangePasswordSchema } from "../adminProfile.schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditOutlined } from "@ant-design/icons";
import { useAdminChangePassword } from "../useAdminProfile";
export interface AdminChangePasswordButtonProps {
  userName: string;
}

const AdminChangePasswordButton: React.FC<AdminChangePasswordButtonProps> = ({ userName }) => {
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const { mutate: onChangePassword, isPending } = useAdminChangePassword();
  const initFormData = new ChangePasswordFormData(userName, "", "");

  const { control, handleSubmit, reset, getValues, watch } = useForm<ChangePasswordFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(adminChangePasswordSchema),
  });

  const closeModal = () => {
    setShowModalChangePassword(false);
    reset(initFormData);
  };

  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = (data) => {
    onChangePassword(data, {
      onSuccess(data, variables, context) {
        setShowModalChangePassword(false);
        reset(initFormData);
      },
    });
  };
  const isDisableButton = useMemo(() => {
    return getValues("newPassword") === "" || getValues("confirmPassword") === "";
  }, [watch()]);

  return (
    <>
      <div>
        <div className="">Mật khẩu</div>
        <Space>
          <p>*******</p>
          <Button
            type="text"
            size="small"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setShowModalChangePassword(true)}
          />
        </Space>
      </div>
      <Modal
        open={showModalChangePassword}
        onCancel={closeModal}
        footer={false}
        closeIcon={null}
        maskClosable={false}
        destroyOnClose={true}
        width={380}
        title="Đổi mật khẩu"
      >
        <Form layout="vertical" disabled={isPending}>
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
          <Space align="center">
            <Button
              type="primary"
              className="w-28"
              onClick={handleSubmit(handleChangePassword)}
              loading={isPending}
              disabled={isDisableButton}
            >
              Lưu
            </Button>
            <Button
              className="w-28 !bg-gray-100 !text-gray-800 !border !border-gray-200"
              type="text"
              onClick={closeModal}
            >
              Huỷ bỏ
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
export default AdminChangePasswordButton;
