import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, EditOutlined, LinkOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Divider, Form, FormProps, Input, Popover, PopoverProps, Space, Switch, SwitchProps } from "antd";
import { useUpdateDocument } from "../../../modules/useUpdateDocument";
import Link from "next/link";
import { mediaConfig } from "@/configs";
import { IDocument, UpdateDocumentPayload } from "@/models/management/core/document.interface";
import MediaUploadDrawer, {
  MediaUploadDrawerProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawer";

type UpdateDocumentFormFields = {
  remark?: string;
  status?: "FINISHED" | "NOT_FINISHED" | "NEW" | "HANDOVERED";
};

interface UpdateDocumentButtonProps {
  data: IDocument;
}
const breakLine = (text = "", revert = false) => {
  return revert === false ? text.replace(/(?:\r\n|\r|\n)/g, "<br>") : text.replace(/<br>/g, "\n");
};

const UpdateDocumentButton: React.FC<UpdateDocumentButtonProps> = ({ data }) => {
  const { documentCheckListId, attachedMedias, status } = data;
  const [form] = Form.useForm<UpdateDocumentFormFields>();
  const documentStatus = Form.useWatch("status", form);
  const [open, setOpen] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [fileList, setFileList] = useState<Exclude<IDocument["attachedMedias"], null>>(data.attachedMedias || []);
  const { mutate: updateDocument, isPending: loadingUpdate } = useUpdateDocument();

  const cancelUpdateDocument = () => {
    setOpen(false);
    form.resetFields();
    setFileList(data.attachedMedias || []);
  };
  const handleOpenMediaFile = () => {
    setShowMedia(true);
  };
  const handleRemoveFileItem = (fileId: number) => {
    setFileList((prev) => prev.filter((file) => file.id !== fileId));
  };
  const handleChangeStatus: SwitchProps["onChange"] = (checked) => {
    form.setFieldsValue({ status: checked ? "FINISHED" : "NOT_FINISHED" });
  };
  const handleOpenPopOver: PopoverProps["onOpenChange"] = (newOpen) => {
    setOpen(newOpen);
  };

  const handleSelectFiles: MediaUploadDrawerProps["onConfirm"] = (files) => {
    setFileList((oldFiles) => {
      const newFiles = files.map((file) => {
        return {
          id: file.id,
          objectType: file.cat,
          path: file.path,
          slug: file.slug,
          mediaType: file.mediaType,
          extension: file.extension,
          fullPath: file.fullPath,
        };
      });
      return [...oldFiles, ...newFiles];
    });
  };
  const handleUpdateDocument: FormProps["onFinish"] = (formData) => {
    let payload: UpdateDocumentPayload = {
      attachedMedias: fileList,
      remark: breakLine(formData.remark || ""),
      documentCheckListId: documentCheckListId,
      status: formData.status === "NEW" ? "NOT_FINISHED" : formData.status,
    };
    updateDocument(payload, {
      onSuccess(data, variables, context) {
        setOpen(false);
        form.resetFields();
        setFileList(attachedMedias || []);
      },
    });
  };

  const disabledButton = useMemo(() => {
    return !form.isFieldsTouched(false);
  }, [Form.useWatch("status", form), Form.useWatch("remark", form)]);

  useEffect(() => {
    form.setFieldsValue({ status: data.status, remark: breakLine(data.remark || "", true) });
    setFileList(attachedMedias || []);
  }, [data]);

  return (
    <>
      <Popover
        trigger="click"
        open={open}
        onOpenChange={handleOpenPopOver}
        destroyTooltipOnHide={true}
        placement="right"
        content={
          <div className="w-[460px] p-4">
            <h3 className="text-center font-bold mb-6 text-lg">Cập nhật giấy tờ cần nộp</h3>
            <Form<UpdateDocumentFormFields>
              layout="vertical"
              form={form}
              onFinish={handleUpdateDocument}
              name={`update-document-${data.documentCheckListId}`}
              disabled={loadingUpdate}
              initialValues={{ status: data.status, remark: breakLine(data.remark || "", true) }}
            >
              <Form.Item<UpdateDocumentFormFields> label="Ghi chú" name="remark">
                <Input.TextArea placeholder="Ghi chú" rows={4} />
              </Form.Item>
              <Form.Item<UpdateDocumentFormFields> label="Tình trạng" name="status">
                <Switch
                  checked={documentStatus === "FINISHED"}
                  checkedChildren="Đã nộp"
                  unCheckedChildren="Chưa nộp"
                  size="small"
                  onChange={handleChangeStatus}
                />
              </Form.Item>
              <Form.Item label="File đính kèm">
                <Button type="text" icon={<UploadOutlined />} onClick={handleOpenMediaFile}>
                  Tải lên
                </Button>
                {fileList?.length ? (
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
                <Button type="primary" htmlType="submit" loading={loadingUpdate} disabled={disabledButton}>
                  Lưu
                </Button>
                <Button onClick={cancelUpdateDocument}>Huỷ</Button>
              </Space>
            </Form>
          </div>
        }
      >
        <Button type="text" icon={<EditOutlined />} className="!text-blue-600 !bg-blue-100" size="small">
          Sửa
        </Button>
      </Popover>
      <MediaUploadDrawer
        mode="multiple"
        isOpen={showMedia}
        onClose={() => setShowMedia(false)}
        onConfirm={handleSelectFiles}
      />
    </>
  );
};
export default UpdateDocumentButton;
