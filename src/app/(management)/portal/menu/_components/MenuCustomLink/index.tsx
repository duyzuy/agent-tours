"use client";
import FormItem from "@/components/base/FormItem";
import { Locale } from "@/models/management/cms/language.interface";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
import { Form, Input, Button, Space, FormProps } from "antd";
import { isEmpty } from "lodash";
import { useMemo, useState } from "react";
import useMessage from "@/hooks/useMessage";

type FieldType = {
  name?: string;
  slug?: string;
};
export interface MenuCustomLinkProps {
  locale?: Locale;
  menuPosition: MenuPositionType;
  onAdd?: (data: FieldType, cb?: () => void) => void;
}

const MenuCustomLink: React.FC<MenuCustomLinkProps> = ({ locale, menuPosition, onAdd }) => {
  const [formData, setFormData] = useState<FieldType>({ name: "", slug: "" });
  const [form] = Form.useForm();
  const message = useMessage();

  // const isDisable = useMemo(() => {
  //   return isEmpty(formData.name) || isEmpty(formData.slug);
  // }, [formData]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (isEmpty(values.name) || isEmpty(values.slug)) {
      message.error("Không bỏ trống.");
      return;
    }
    onAdd?.(values, () => {
      form.resetFields();
    });
  };

  // const onChange: FormProps<FieldType>["onValuesChange"] = (changedValues, values) => {
  //   // console.log(changedValues, values);
  // };
  return (
    <div className="form">
      <Form<FieldType>
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        // onValuesChange={onChange}
      >
        <Form.Item<FieldType> label="Tên menu" name="name">
          <Input placeholder="Tên menu" />
        </Form.Item>
        <Form.Item<FieldType> label="Đường dẫn" name="slug">
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
export default MenuCustomLink;
