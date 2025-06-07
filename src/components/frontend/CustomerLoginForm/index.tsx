"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

export interface CustomerLoginFormProps {}
const CustomerLoginForm: React.FC<CustomerLoginFormProps> = () => {
  const t = useTranslations("String");
  const params = useParams();
  return (
    <Form layout="vertical">
      <Form.Item label="Tên tài khoản">
        <Input
          name="account"
          placeholder="Tên tài khoản"
          size="large"
          suffix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item label="Mật khẩu">
        <Input.Password name="password" placeholder="Nhập mật khẩu" size="large" />
      </Form.Item>
      <Form.Item>
        <Link href="/">{t("forgotPassword")}</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" block size="large">
          {t("button.login")}
        </Button>
      </Form.Item>
      <div className="content-form">
        <p className="text-center text-xs">
          <Link href={`${params.locale}/${CLIENT_LINKS.CustomerRegister}`}>{t("noAccount")}</Link>
        </p>
      </div>
    </Form>
  );
};
export default CustomerLoginForm;
