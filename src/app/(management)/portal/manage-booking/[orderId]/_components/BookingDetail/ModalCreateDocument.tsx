import { Space, Button, Form, Input, Modal } from "antd";
import FormItem from "@/components/base/FormItem";

import { DocumentFormData } from "@/models/management/core/document.interface";
import { useForm, Controller } from "react-hook-form";

export interface ModalCreateDocumentProps {
  open?: boolean;
  onSubmit?: (data: DocumentFormData) => void;
  bookingPaxId?: number;
  onCancel?: () => void;
}

const ModalCreateDocument: React.FC<ModalCreateDocumentProps> = ({ open, onSubmit, bookingPaxId, onCancel }) => {
  const initialData = new DocumentFormData(bookingPaxId, "", "", undefined);

  const { control, handleSubmit } = useForm<DocumentFormData>({
    defaultValues: { ...initialData },
  });

  return (
    <Modal title="Thêm giấy tờ cần nộp" footer={null} open={open} onCancel={onCancel}>
      <Form layout="vertical">
        <Controller
          control={control}
          name="documentName"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Tên giấy tờ"
              validateStatus={error?.message ? "error" : undefined}
              help={error?.message}
              required
            >
              <Input {...field} placeholder="Tên giấy tờ" />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="documentDescription"
          render={({ field, fieldState: { error } }) => (
            <FormItem
              label="Mô tả"
              validateStatus={error?.message ? "error" : undefined}
              help={error?.message}
              required
            >
              <Input.TextArea {...field} placeholder="Mô tả" />
            </FormItem>
          )}
        />
      </Form>
      <div className="py-4 border-tbg-white">
        <Space>
          <Button onClick={onCancel}>Huỷ</Button>
          <Button type="primary" onClick={onSubmit && handleSubmit(onSubmit)}>
            Lưu
          </Button>
        </Space>
      </div>
    </Modal>
  );
};
export default ModalCreateDocument;
