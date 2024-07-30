"use client";
import FormItem from "@/components/base/FormItem";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import Quantity from "@/components/base/Quantity";
interface RegisterVisaFormProps {
  title?: string;
  price?: string;
}
const RegisterVisaForm: React.FC<RegisterVisaFormProps> = ({}) => {
  const t = useTranslations("String");

  return (
    <div className="px-6 py-4 border rounded-lg">
      <div className="py-2 mb-3">
        <h4 className="text-base text-red-600 font-[500]">Đăng ký tư vấn visa</h4>
      </div>
      <Form layout="vertical">
        <FormItem label="Họ và tên" required>
          <Input placeholder="Họ và tên" size="large" />
        </FormItem>
        <FormItem label="Số điện thoại" required>
          <Input placeholder="Số điện thoại" size="large" />
        </FormItem>
        <div>
          <div>
            <div>
              <span>Người lớn</span>
            </div>
            <Quantity value={1} size="sm" />
          </div>
          <div>
            <div>
              <span>Trẻ em</span>
            </div>
            <Quantity size="sm" />
          </div>
          <div>
            <div>
              <span>Em bé</span>
            </div>
            <Quantity size="sm" />
          </div>
        </div>
        <FormItem label="Email" required>
          <Input placeholder="Email" size="large" />
        </FormItem>
        <FormItem label="Ghi chú">
          <Input.TextArea placeholder="Ghi chú" rows={4} size="large" />
        </FormItem>
        <FormItem>
          <Button type="primary" className="w-full" size="large">
            Đăng ký ngay
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default RegisterVisaForm;
