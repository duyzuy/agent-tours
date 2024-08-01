"use client";
import { Row, Col, Input, Form, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import classNames from "classnames";
import { IconSend } from "@/assets/icons";

interface ContactFormProps {
  className?: string;
}
const ContactForm: React.FC<ContactFormProps> = ({ className = "" }) => {
  return (
    <div
      className={classNames("contact-form border px-6 py-4  rounded-lg", {
        [className]: className,
      })}
    >
      <div className="contact-form__head mb-3">
        <span className="text-lg font-[500]">Gửi liên hệ</span>
      </div>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={24} lg={24}>
            <FormItem label="Họ và tên" required>
              <Input placeholder="Họ và tên" size="large" className="" />
            </FormItem>
          </Col>
          <Col span={24} lg={24}>
            <FormItem label="Số điện thoại" required>
              <Input placeholder="Số điện thoại" size="large" />
            </FormItem>
          </Col>
          <Col span={24} lg={24}>
            <FormItem label="Email" required>
              <Input placeholder="Email" size="large" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Nội dung">
              <Input.TextArea placeholder="Nội dung" size="large" />
            </FormItem>
          </Col>
        </Row>
        <Button type="primary" size="large">
          <div className="flex items-center justify-center">
            <IconSend className="mr-2" />
            <span>Gửi liên hệ</span>
          </div>
        </Button>
      </Form>
    </div>
  );
};
export default ContactForm;
