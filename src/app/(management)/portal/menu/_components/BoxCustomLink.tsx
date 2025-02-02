"use client";
import { Locale } from "@/models/management/cms/language.interface";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { Form, Input, Button, Space, FormProps } from "antd";
import { isEmpty } from "lodash";

import useMessage from "@/hooks/useMessage";

type FieldType = {
  name?: string;
  slug?: string;
};
export interface BoxCustomLinkProps {
  locale?: Locale;
  menuPosition: MenuPositionType;
  onAdd?: (data: FieldType, cb?: () => void) => void;
}

const BoxCustomLink: React.FC<BoxCustomLinkProps> = ({ locale, menuPosition, onAdd }) => {
  const [form] = Form.useForm();
  const message = useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (isEmpty(values.name) || isEmpty(values.slug)) {
      message.error("Không bỏ trống.");
      return;
    }
    onAdd?.(values, () => {
      form.resetFields();
    });
  };

  return (
    <div className="form">
      <Form<FieldType>
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Tên menu"
          name="name"
          required
          rules={[{ required: true, message: "Không bỏ trống" }]}
        >
          <Input placeholder="Tên menu" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Đường dẫn"
          name="slug"
          required
          rules={[{ required: true, message: "Không bỏ trống" }]}
        >
          <Input placeholder="ex: http://example.com" />
        </Form.Item>
        <div className="text-right">
          <Button type="primary" ghost size="small" htmlType="submit">
            Thêm vào menu
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default BoxCustomLink;
