"use client";
import FormItem from "@/components/base/FormItem";
import { Form, Input, Button } from "antd";

interface CustomLinkMenuTypeProps {}
const CustomLinkMenuType: React.FC<CustomLinkMenuTypeProps> = () => {
    return (
        <div>
            <Form layout="vertical">
                <FormItem label="Tên menu">
                    <Input placeholder="Tên menu" />
                </FormItem>
                <FormItem label="Đường dẫn">
                    <Input placeholder="ex: http://example.com" />
                </FormItem>
                <Button type="primary" ghost size="small">
                    Thêm vào menu
                </Button>
            </Form>
        </div>
    );
};
export default CustomLinkMenuType;
