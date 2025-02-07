import { memo } from "react";
import { Button, Divider, Drawer, Form, FormProps, Input, Space, Timeline } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { formatDate } from "@/utils/date";
import { useAddComment } from "../../modules/useAddComment";
import { isEmpty } from "lodash";

export interface CommentContainerDrawerProps {
  items: IOrderDetail["comments"];
  isOpen?: boolean;
  onClose?: () => void;
  orderId: number;
}

type FieldType = { comment: string };
const CommentContainerDrawer: React.FC<CommentContainerDrawerProps> = ({ items, isOpen, onClose, orderId }) => {
  const { onAddComment, isPending } = useAddComment();
  const [form] = Form.useForm<FieldType>();

  const onComment = (value: string) => {
    form.setFieldValue("comment", value);
  };

  const onSubmitForm: FormProps<FieldType>["onFinish"] = (data) => {
    onAddComment(
      { orderId: orderId, comment: data.comment },
      {
        onSuccess(data, variables, context) {
          form.resetFields();
        },
      },
    );
  };

  const isDisabledButton = isEmpty(Form.useWatch((values) => values.comment, form));

  return (
    <Drawer
      title="Ghi chú"
      width={550}
      onClose={onClose}
      closeIcon={null}
      destroyOnClose={true}
      open={isOpen}
      footer={
        <Space className="py-3">
          <Button type="primary" htmlType="submit" className="w-[80px]" loading={isPending} disabled={isDisabledButton}>
            Lưu
          </Button>
        </Space>
      }
    >
      <Form<FieldType> layout="vertical" onFinish={onSubmitForm} form={form}>
        <Form.Item<FieldType>
          label="Nội dung ghi chú"
          name="comment"
          required
          rules={[{ required: true, message: "Không bỏ trống." }]}
        >
          <Input.TextArea
            rows={4}
            value={form.getFieldValue("comment")}
            placeholder="Nội dung"
            onChange={(evt) => onComment(evt.target.value)}
          />
        </Form.Item>
      </Form>
      <Divider />
      <Timeline
        mode="alternate"
        items={items.map((item) => {
          return {
            label: <div className="text-gray-500">{item.sysFstUser}</div>,
            children: (
              <div key={item.recId}>
                <div className="text-gray-500">{formatDate(item.sysFstUpdate)}</div>
                <div>{item.comment}</div>
              </div>
            ),
          };
        })}
      />
    </Drawer>
  );
};
export default memo(CommentContainerDrawer);
