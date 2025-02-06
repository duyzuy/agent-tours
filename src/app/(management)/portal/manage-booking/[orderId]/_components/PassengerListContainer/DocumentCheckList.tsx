import { Badge, Button, Card, Divider, Form, Input, message, Popover, Space, Switch } from "antd";

import { useCreateDocument } from "../../modules/useCreateDocument";
import { useUpdateDocument } from "../../modules/useUpdateDocument";
import { IDocument } from "@/models/management/core/document.interface";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface DocumentCheckListProps {
  documents?: IDocument[];
  paxId?: number;
}

const DocumentCheckList = ({ documents, paxId }: DocumentCheckListProps) => {
  const { mutate: createDocument, isPending: loadingCreate } = useCreateDocument();

  const [open, setOpen] = useState(false);

  const handleChangeOpen = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const cancelCreateDoc: CreateDocumentFormProps["onCancel"] = (resetForm) => {
    setOpen(false);
    resetForm?.();
  };

  const handleCreateDoc: CreateDocumentFormProps["onSubmit"] = (data, resetForm) => {
    if (!paxId) {
      message.error("Thiếu bookingPaxId");
      return;
    }
    createDocument(
      { ...data, bookingPaxId: paxId },
      {
        onSuccess(data, variables, context) {
          setOpen(false);
          resetForm?.();
        },
      },
    );
  };

  return (
    <div className="document">
      <div className="document__head flex gap-x-3 mb-3 justify-between">
        <span className="font-semibold">Hồ sơ giấy tờ cần nộp</span>
        <Popover
          trigger="click"
          open={open}
          onOpenChange={handleChangeOpen}
          title="Thêm giấy tờ cần nộp"
          content={<CreateDocumentForm onSubmit={handleCreateDoc} onCancel={cancelCreateDoc} loading={loadingCreate} />}
        >
          <Button size="small" type="dashed" icon={<PlusOutlined />}>
            Thêm
          </Button>
        </Popover>
      </div>
      <div
        className="document__list grid grid-cols-1 xl:grid-cols-2 gap-3"
        style={{ scrollbarGutter: "stable", scrollbarWidth: "thin" }}
      >
        {documents?.map((data, _index) => (
          <DocumentFormCardItem key={data.documentCheckListId} data={data} />
        ))}
      </div>
    </div>
  );
};
export default DocumentCheckList;

interface DocumentFormCardItemProps {
  data: IDocument;
}
function DocumentFormCardItem({ data }: DocumentFormCardItemProps) {
  const { status, documentDescription, documentCheckListId, documentName } = data;
  const { mutate: updateDocument, isPending: loadingUpdate } = useUpdateDocument();
  const handleUpdateStatus = (data: { documentCheckListId: number; status: "NOT_FINISHED" | "FINISHED" }) => {
    updateDocument(data);
  };

  return (
    <div className="bg-gray-400/10 rounded-md px-4 py-3">
      <div className="head-title mb-2">
        <div className="font-semibold inline-block">{documentName}</div>
        <Badge
          color={
            status === "NEW"
              ? "blue"
              : status === "FINISHED"
              ? "green"
              : status === "HANDOVERED"
              ? "lime"
              : status === "NOT_FINISHED"
              ? "red"
              : "default"
          }
          text={
            status === "NEW"
              ? "Mới"
              : status === "FINISHED"
              ? "Đã nộp"
              : status === "HANDOVERED"
              ? "Đã bàn giao"
              : status === "NOT_FINISHED"
              ? "Chưa nộp"
              : "Unknown"
          }
          className="float-right"
        />
      </div>
      <p className="mb-3">{documentDescription || "--"}</p>
      <>
        {status === "NEW" ? (
          <Space>
            <Button
              size="small"
              type="text"
              className="!text-red-600 !bg-red-50 hover:!bg-red-100"
              onClick={() => handleUpdateStatus?.({ documentCheckListId, status: "NOT_FINISHED" })}
              loading={loadingUpdate}
            >
              Chưa nộp
            </Button>
            <Button
              size="small"
              className="!text-blue-600 !bg-blue-50 hover:!bg-blue-100"
              type="text"
              onClick={() => handleUpdateStatus?.({ documentCheckListId, status: "FINISHED" })}
              loading={loadingUpdate}
            >
              Đã nộp
            </Button>
          </Space>
        ) : (
          <Switch
            checked={status === "FINISHED"}
            checkedChildren="Đã nộp"
            unCheckedChildren="Chưa nộp"
            size="small"
            onChange={(checked) =>
              handleUpdateStatus?.({ documentCheckListId, status: checked ? "FINISHED" : "NOT_FINISHED" })
            }
            loading={loadingUpdate}
          />
        )}
      </>
    </div>
  );
}

type DocumentFormFields = {
  documentName: string;
  documentDescription: string;
};
interface CreateDocumentFormProps {
  onCancel?: (resetForm?: () => void) => void;
  onSubmit?: (data: DocumentFormFields, resetForm?: () => void) => void;
  loading?: boolean;
}
function CreateDocumentForm({ onSubmit, onCancel, loading }: CreateDocumentFormProps) {
  const [form] = Form.useForm<DocumentFormFields>();
  return (
    <div className="w-[320px]">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={(values) => onSubmit?.(values, form.resetFields)}
        name="document"
        disabled={loading}
      >
        <Form.Item<DocumentFormFields>
          label="Tên"
          name="documentName"
          required
          rules={[{ required: true, message: "Không bỏ trống" }]}
        >
          <Input placeholder="Tên giấy tờ *" />
        </Form.Item>
        <Form.Item<DocumentFormFields> label="Mô tả" name="documentDescription">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space align="end">
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu
            </Button>
            <Button onClick={() => onCancel?.(form.resetFields)}>Huỷ</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
