import React, { useState } from "react";
import { Form, Row, Col, Input, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { customerInformationSchema } from "../../schema/customerInformation.schema";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
export interface CustomerInformationFormProps {
    onSubmit: (data: CustomerInformation, note: string) => void;
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
    onSubmit,
}) => {
    const router = useRouter();
    const [customerInformation, setCustomerInformation] =
        useState<CustomerInformation>(
            () => new CustomerInformation("", "", "", ""),
        );
    const [customerNote, setCustomerNote] = useState("");
    const onCustomerNote = (value: string) => {
        setCustomerNote(value);
    };
    const { handlerSubmit, errors } = useFormSubmit<CustomerInformation>({
        schema: customerInformationSchema,
    });

    const onChangeCustomerInformation = (
        key: keyof CustomerInformation,
        value: CustomerInformation[keyof CustomerInformation],
    ) => {
        setCustomerInformation((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onSubmitFormData: HandleSubmit<CustomerInformation> = (data) => {
        onSubmit(data, customerNote);
    };
    const onBack = () => {
        router.back();
    };
    return (
        <Form layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <FormItem
                        required
                        label="Họ và tên"
                        validateStatus={errors?.custName ? "error" : ""}
                        help={errors?.custName || ""}
                    >
                        <Input
                            placeholder="Họ và tên"
                            value={customerInformation.custName}
                            onChange={(ev) =>
                                onChangeCustomerInformation(
                                    "custName",
                                    ev.target.value,
                                )
                            }
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        required
                        label="Email"
                        validateStatus={errors?.custEmail ? "error" : ""}
                        help={errors?.custEmail || ""}
                    >
                        <Input
                            placeholder="Email"
                            value={customerInformation.custEmail}
                            onChange={(ev) =>
                                onChangeCustomerInformation(
                                    "custEmail",
                                    ev.target.value,
                                )
                            }
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        required
                        label="Số điện thoại"
                        validateStatus={errors?.custPhoneNumber ? "error" : ""}
                        help={errors?.custPhoneNumber || ""}
                    >
                        <Input
                            placeholder="Số điện thoại"
                            maxLength={11}
                            value={customerInformation.custPhoneNumber}
                            onChange={(ev) =>
                                onChangeCustomerInformation(
                                    "custPhoneNumber",
                                    ev.target.value,
                                )
                            }
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label="Địa chỉ">
                        <Input
                            placeholder="Địa chỉ"
                            value={customerInformation.custAddress}
                            onChange={(ev) =>
                                onChangeCustomerInformation(
                                    "custAddress",
                                    ev.target.value,
                                )
                            }
                        />
                    </FormItem>
                </Col>
                <Col span={24}>
                    <FormItem label="Ghi chú">
                        <Input.TextArea
                            value={customerNote}
                            onChange={(ev) => onCustomerNote(ev.target.value)}
                        ></Input.TextArea>
                    </FormItem>
                </Col>
                <Col span={24}>
                    <Space align="end">
                        <Button icon={<LeftOutlined />} onClick={onBack}>
                            Quay lại
                        </Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                handlerSubmit(
                                    customerInformation,
                                    onSubmitFormData,
                                )
                            }
                        >
                            Đặt và giữ chỗ
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};
export default CustomerInformationForm;
