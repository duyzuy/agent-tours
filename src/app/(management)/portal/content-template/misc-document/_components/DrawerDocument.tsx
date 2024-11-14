import React, { memo, useCallback, useEffect, useState } from "react";
import { Form, Button, Input, Space, Drawer, Tabs } from "antd";
import FormItem from "@/components/base/FormItem";
import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { MiscDocumentFormData } from "../modules/miscDocument.interface";
import { IMiscDocument } from "@/models/management/cms/miscDocument.interface";
import { Controller, useForm } from "react-hook-form";
import { MediaTypes } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import Link from "next/link";
import { PaperClipOutlined, UploadOutlined } from "@ant-design/icons";

export interface DrawerDocumentProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: MiscDocumentFormData) => void;
  initialValue?: IMiscDocument;
  action?: "edit" | "create";
}
const DrawerDocument: React.FC<DrawerDocumentProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  action = "create",
}) => {
  const initFormData = new MiscDocumentFormData(undefined, "", "", "", undefined);

  const { control, setValue, handleSubmit } = useForm<MiscDocumentFormData>({
    defaultValues: { ...initFormData },
  });

  const [showMedia, setShowMedia] = useState(false);

  const handleSelectFile: MediaUploadProps["onConfirm"] = (files) => {
    setValue("link", `${mediaConfig.rootApiPath}/${files[0]["fullPath"]}`);
  };

  const onRemoveDocument = () => {
    setValue("link", "");
  };
  useEffect(() => {
    const initValues = initialValue
      ? new MiscDocumentFormData(
          initialValue.id,
          initialValue.name,
          initialValue.descriptions,
          initialValue.link,
          initialValue.status,
        )
      : initFormData;

    Object.keys(initValues).forEach((key) => {
      setValue(key as keyof MiscDocumentFormData, initValues[key as keyof MiscDocumentFormData]);
    });
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      destroyOnClose={true}
      onClose={onClose}
      width={550}
      title={action === "create" ? "Thêm document" : "Sửa document"}
      push={false}
    >
      <Form layout="vertical">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Tên" required validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input placeholder="Nhập tên hồ sơ, loại giấy tờ, tài liệu" {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="descriptions"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Mô tả" validateStatus={error?.message ? "error" : ""} help={error?.message}>
              <Input.TextArea placeholder="Mô tả" {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="link"
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <FormItem label="Biểu mẫu">
              <div>
                {value ? (
                  <>
                    <p className="py-2">
                      <Link href={value} className="flex items-start gap-x-2" target="_blank">
                        <PaperClipOutlined className="mt-1" />
                        <span className="text-xs">{value}</span>
                      </Link>
                    </p>
                  </>
                ) : null}
                <Space>
                  <Button type="text" onClick={() => setShowMedia(true)} size="small" icon={<UploadOutlined />}>
                    {value ? "Đổi file" : "Chọn file"}
                  </Button>
                  {value ? (
                    <Button onClick={onRemoveDocument} size="small" type="text" danger>
                      xoá
                    </Button>
                  ) : null}
                </Space>
              </div>
            </FormItem>
          )}
        />

        <FormItem>
          <Space>
            <Button
              type="primary"
              //disabled={isDisableButton}
              className="min-w-[120px]"
              onClick={handleSubmit((formData) => onSubmit?.(formData))}
            >
              {action === "edit" ? "Cập nhật" : "Lưu"}
            </Button>
            <Button type="default" onClick={onClose} className="min-w-[120px]">
              Huỷ bỏ
            </Button>
          </Space>
        </FormItem>
      </Form>
      <MediaUploadDrawler
        mediaTypes={[MediaTypes.FILE]}
        onClose={() => setShowMedia(false)}
        isOpen={showMedia}
        onConfirm={handleSelectFile}
      />
    </Drawer>
  );
};
export default DrawerDocument;
