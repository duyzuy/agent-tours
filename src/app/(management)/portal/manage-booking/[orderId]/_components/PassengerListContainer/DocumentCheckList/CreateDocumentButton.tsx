import React, { useMemo, useState } from "react";
import { Popover, Button, PopoverProps, Form, Input, Space, FormProps, Divider } from "antd";
import { DeleteOutlined, LinkOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useCreateDocument } from "../../../modules/useCreateDocument";
import MediaUploadDrawer, {
  MediaUploadDrawerProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawer";
import { IMediaFile } from "@/models/management/media.interface";
import Link from "next/link";
import { mediaConfig } from "@/configs";
import { CreateDocumentPayload } from "@/models/management/core/document.interface";

type DocumentFormFields = {
  documentName?: string;
  documentDescription?: string;
  remark?: string;
};

interface CreateDocumentButtonProps {
  paxId: number;
}
const breakLine = (text = "", revert = false) => {
  return revert === false ? text.replace(/(?:\r\n|\r|\n)/g, "<br>") : text.replace(/<br>/g, "\n");
};
const CreateDocumentButton: React.FC<CreateDocumentButtonProps> = ({ paxId }) => {
  const [form] = Form.useForm<DocumentFormFields>();
  const [open, setOpen] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [fileList, setFileList] = useState<IMediaFile[]>([]);

  const handleOpenChange: PopoverProps["onOpenChange"] = (newOpen) => {
    setOpen(true);
  };

  const { mutate: createDocument, isPending: loadingCreate } = useCreateDocument();

  const cancelCreateDoc = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleOpenMediaFile = () => {
    setShowMedia(true);
  };
  const handleCloseMediaFile = () => {
    setShowMedia(false);
  };
  const handleSelectMediaFile: MediaUploadDrawerProps["onConfirm"] = (files) => {
    setFileList(files);
  };

  const handleRemoveFileItem = (fileId: number) => {
    setFileList((prev) => prev.filter((file) => file.id !== fileId));
  };
  const handleCreateDocument: FormProps["onFinish"] = (data) => {
    let payload: CreateDocumentPayload = {
      bookingPaxId: paxId,
      documentDescription: breakLine(data.documentDescription),
      documentName: data.documentName,
      remark: breakLine(data.remark),
      status: "NEW",
      attachedMedias: [],
    };
    const attachedMedias = fileList.map<CreateDocumentPayload["attachedMedias"][number]>((file) => {
      return {
        id: file.id,
        objectType: "MEDIA",
        path: file.path,
        slug: file.slug,
        mediaType: file.mediaType,
        extension: file.extension,
        fullPath: file.fullPath,
      };
    });

    createDocument(
      { ...payload, attachedMedias },
      {
        onSuccess(data, variables, context) {
          setOpen(false);
          form.resetFields();
          setFileList([]);
        },
      },
    );
  };

  const disabledButton = useMemo(() => {
    return !form.isFieldsTouched(false);
  }, [
    Form.useWatch("status", form),
    Form.useWatch("remark", form),
    Form.useWatch("documentName", form),
    Form.useWatch("documentDescription", form),
  ]);

  return (
    <>
      <Popover
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        content={
          <div className="w-[420px] p-4">
            <h3 className="text-center font-bold mb-6 text-lg">Thêm giấy tờ cần nộp</h3>
            <Form
              form={form}
              onFinish={handleCreateDocument}
              name="create-document"
              layout="vertical"
              disabled={loadingCreate}
            >
              <Form.Item<DocumentFormFields>
                label="Tên giấy tờ"
                name="documentName"
                required
                rules={[{ required: true, message: "Không bỏ trống" }]}
              >
                <Input placeholder="Tên giấy tờ *" />
              </Form.Item>
              <Form.Item<DocumentFormFields> label="Mô tả" name="documentDescription">
                <Input.TextArea placeholder="Mô tả" rows={4} />
              </Form.Item>
              <Form.Item<DocumentFormFields> label="Ghi chú" name="remark">
                <Input.TextArea placeholder="Ghi chú" rows={4} />
              </Form.Item>
              <Form.Item label="File đính kèm">
                <Button type="dashed" icon={<UploadOutlined />} onClick={handleOpenMediaFile}>
                  Tải file
                </Button>
                {fileList.length ? (
                  <div className="file-list flex flex-col gap-1 pt-2">
                    {fileList.map((file) => (
                      <div key={file.id} className="flex items-center justify-between gap-x-2">
                        <Link
                          href={`${mediaConfig.rootApiPath}/${file.fullPath}`}
                          target="_blank"
                          className="inline-flex items-center gap-x-2"
                        >
                          <LinkOutlined />
                          <span className="block line-clamp-1">{file.slug}</span>
                        </Link>
                        <Button
                          type="text"
                          size="small"
                          icon={<DeleteOutlined />}
                          className="!text-red-600 !bg-red-50"
                          shape="circle"
                          onClick={() => handleRemoveFileItem(file.id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </Form.Item>
              <Divider />
              <Space align="end">
                <Button type="primary" htmlType="submit" loading={loadingCreate} disabled={disabledButton}>
                  Lưu
                </Button>
                <Button onClick={cancelCreateDoc}>Huỷ</Button>
              </Space>
            </Form>
          </div>
        }
      >
        <Button size="small" type="dashed" icon={<PlusOutlined />}>
          Thêm
        </Button>
      </Popover>
      <MediaUploadDrawer
        mode="multiple"
        isOpen={showMedia}
        onClose={handleCloseMediaFile}
        onConfirm={handleSelectMediaFile}
      />
    </>
  );
};
export default CreateDocumentButton;
