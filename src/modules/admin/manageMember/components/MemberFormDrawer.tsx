import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input } from "antd";

import FormItem from "@/components/base/FormItem";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Member } from "@/models/management/member.interface";
import { MemberUpdateFormData } from "@/modules/admin/manageMember/member.interface";
import { memberUpdateSchema } from "@/modules/admin/manageMember/validate.schema";

export interface MemberFormDrawerProps {
  isOpen?: boolean;
  onCancel: () => void;
  initialValue?: Member;
  onSubmit?: (formData: MemberUpdateFormData) => void;
}

const MemberFormDrawer: React.FC<MemberFormDrawerProps> = ({ isOpen, onCancel, onSubmit, initialValue }) => {
  const initFormData = new MemberUpdateFormData(
    initialValue?.recId,
    initialValue?.username,
    initialValue?.email,
    initialValue?.phoneNumber,
  );

  const { setValue, control, handleSubmit, formState } = useForm<MemberUpdateFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(memberUpdateSchema),
  });

  console.log(formState.errors);
  const [isEditPassword, setEditPassword] = useState(false);

  useEffect(() => {
    const formData = initFormData
      ? new MemberUpdateFormData(
          initialValue?.recId,
          initialValue?.username,
          initialValue?.email,
          initialValue?.phoneNumber,
        )
      : initFormData;

    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof MemberUpdateFormData, value as MemberUpdateFormData[keyof MemberUpdateFormData]);
    });
  }, [initialValue, isOpen]);

  return (
    <>
      <Drawer
        title="Chỉnh sửa"
        destroyOnClose
        width={550}
        onClose={onCancel}
        open={isOpen}
        footer={
          <Space>
            <Button onClick={onSubmit && handleSubmit(onSubmit)} type="primary" className="w-28">
              Lưu
            </Button>
            <Button onClick={onCancel} className="w-28">
              Huỷ
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <h3 className="font-semibold text-lg mb-6">Thông tin tài khoản</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Tên tài khoản"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Tên tài khoản" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Email" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
                    <Input placeholder="Email" autoComplete="email" {...field} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Số điện thoại"
                    required
                    validateStatus={error?.message ? "error" : ""}
                    help={error?.message}
                  >
                    <Input placeholder="Số điện thoại" {...field} />
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default MemberFormDrawer;
