import React, { useEffect, useState } from "react";
import { Form, Button, Input, Space, Drawer, Tabs } from "antd";
import FormItem from "@/components/base/FormItem";
import { MiscDepartLocationFormData } from "../modules/miscDepart.interface";
import { Controller, useForm } from "react-hook-form";

import { IDepartLocation } from "@/models/management/cms/miscDepartLocation.interface";
import { removeVietnameseTones } from "@/utils/helper";

export interface DrawerDepartLocationProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: MiscDepartLocationFormData) => void;
  initialValue?: IDepartLocation;
  action?: "edit" | "create";
}
const DrawerDepartLocation: React.FC<DrawerDepartLocationProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  action = "create",
}) => {
  const initFormData = new MiscDepartLocationFormData(undefined, "", "", "", undefined);

  const { control, setValue, handleSubmit, watch, getValues } = useForm<MiscDepartLocationFormData>({
    defaultValues: { ...initFormData },
  });

  const onChangeKey = (key: string) => {
    const keyStr = removeVietnameseTones(key);
    setValue("key", keyStr.toUpperCase());
  };
  useEffect(() => {
    const initValues = initialValue
      ? new MiscDepartLocationFormData(
          initialValue.id,
          initialValue.key,
          initialValue.name_vi,
          initialValue.name_en,
          initialValue.status,
        )
      : initFormData;

    Object.keys(initValues).forEach((key) => {
      setValue(key as keyof MiscDepartLocationFormData, initValues[key as keyof MiscDepartLocationFormData]);
    });
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      destroyOnClose={true}
      onClose={onClose}
      width={550}
      title={action === "create" ? "Thêm điểm khởi hành" : "Sửa điểm khởi hành"}
      push={false}
    >
      <Form layout="vertical">
        <Controller
          name="key"
          control={control}
          disabled={action === "edit"}
          render={({ field: { value }, fieldState: { error } }) => (
            <FormItem
              label="Mã điểm khởi hành"
              required
              validateStatus={error?.message ? "error" : ""}
              help={error?.message}
            >
              <Input
                placeholder="Nhập mã điểm khởi hành"
                value={value}
                onChange={(evt) => onChangeKey(evt.target.value)}
              />
            </FormItem>
          )}
        />
        <Controller
          name="name_vi"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Tên - vi" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input placeholder="Nhập điểm khởi hành - vi" {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="name_en"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Tên - en" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input placeholder="Nhập điểm khởi hành - en" {...field} />
            </FormItem>
          )}
        />

        <FormItem>
          <Space>
            <Button type="default" onClick={onClose} className="min-w-[120px]">
              Huỷ bỏ
            </Button>
            <Button
              type="primary"
              //disabled={isDisableButton}
              className="min-w-[120px]"
              onClick={handleSubmit((formData) => onSubmit?.(formData))}
            >
              {action === "edit" ? "Cập nhật" : "Lưu"}
            </Button>
          </Space>
        </FormItem>
      </Form>
    </Drawer>
  );
};
export default DrawerDepartLocation;
