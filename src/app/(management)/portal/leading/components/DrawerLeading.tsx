import React, { useEffect } from "react";
import { Button, Checkbox, Col, Drawer, DrawerProps, Form, Input, Radio, Row, Select, Space } from "antd";

import { useForm, Controller, UseFormHandleSubmit } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { leadingSchema } from "../schema/leading.schema";
import { Leading, LeadingSource, LeadingStatus } from "@/models/management/leading.interface";
import { LeadingFormData } from "../modules/leading.interface";
import FormItem from "@/components/base/FormItem";
import { read, writeFileXLSX } from "xlsx";

export const LEADING_SOURCE_LIST: LeadingSource[] = [
  "NEW",
  "RETURNED",
  "FACEBOOK",
  "TIKTOK",
  "ZALO",
  "TELESALE",
  "NEWSPAPER",
  "POSTER",
  "FLYER",
  "OTHER",
];
export const LEADING_STATUS_LIST: LeadingStatus[] = ["BLACKLIST", "CALLBACKLATER", "LOSS", "NEW", "NORESPONSE", "WIN"];

export type DrawerLeadingProps = DrawerProps & {
  initialValue?: Leading;
  action?: "create" | "edit";
  onClose?: () => void;
  onSubmit?: (data: LeadingFormData) => void;
};

export const initFormData = new LeadingFormData(undefined, "", "", "", "OTHER", "NEW");

const DrawerLeading: React.FC<DrawerLeadingProps> = ({
  initialValue,
  action,
  onClose,
  open,
  onSubmit,
  ...restprops
}) => {
  const { getValues, setValue, clearErrors, handleSubmit, control, watch } = useForm<LeadingFormData>({
    resolver: yupResolver(leadingSchema),
    defaultValues: { ...initFormData },
  });

  const onChangeSource = (source: LeadingSource) => {
    setValue("source", source);
  };

  const onChangeStatus = (status: LeadingStatus) => {
    setValue("status", status);
  };

  useEffect(() => {
    const initValues = initialValue
      ? new LeadingFormData(
          initialValue.recId,
          initialValue.phone,
          initialValue.paxName,
          initialValue.remark,
          initialValue.source,
          initialValue.status,
        )
      : initFormData;

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof LeadingFormData, value);
    });
    clearErrors();
  }, [initialValue]);

  return (
    <Drawer
      title={action === "create" ? "Thêm mới" : "Chỉnh sửa"}
      destroyOnClose
      width={550}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <Controller
          control={control}
          name="paxName"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Họ và tên" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input placeholder="Họ và tên" {...field} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Số điện thoại" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Input placeholder="Số điện thoại" {...field} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="remark"
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Chi tiết" help={error?.message} validateStatus={error ? "error" : ""}>
              <Input.TextArea {...field} rows={6} />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="source"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <FormItem label="Nguồn" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Row gutter={[12, 12]}>
                {LEADING_SOURCE_LIST.map((sourceItem) => (
                  <Col span="6" key={sourceItem}>
                    <Radio
                      checked={value === sourceItem}
                      onChange={() => onChangeSource(sourceItem)}
                      value={sourceItem}
                    >
                      {sourceItem}
                    </Radio>
                  </Col>
                ))}
              </Row>
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { value }, fieldState: { error } }) => (
            <FormItem label="Trạng thái" required validateStatus={error ? "error" : ""} help={error?.message}>
              <Row gutter={[12, 12]}>
                {LEADING_STATUS_LIST.map((statusItem) => (
                  <Col span="8" key={statusItem}>
                    <Radio
                      checked={value === statusItem}
                      onChange={() => onChangeStatus(statusItem)}
                      value={statusItem}
                    >
                      {statusItem}
                    </Radio>
                  </Col>
                ))}
              </Row>
            </FormItem>
          )}
        />

        <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
          <Space>
            <Button onClick={onClose}>Huỷ</Button>
            <Button onClick={onSubmit ? handleSubmit(onSubmit) : undefined} type="primary">
              {action === "create" ? "Thêm mới" : "Cập nhật"}
            </Button>
          </Space>
        </div>
      </Form>
    </Drawer>
  );
};
export default DrawerLeading;
