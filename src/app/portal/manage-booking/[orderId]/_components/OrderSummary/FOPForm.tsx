import { useEffect, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import {
    FOP_PAYMENT_TYPE_LIST,
    FOP_TYPE_LIST,
} from "../../modules/formOfPayment.interface";
import TextArea from "antd/es/input/TextArea";
import { formOfPaymentSchema } from "../../schema/formOfPayment";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
type TFormData = Required<FOPFormData>;
interface FOPFormProps {
    orderId: number;
    onSubmitForm?: (data: FOPFormData, cb?: () => void) => void;
}
const FOPForm: React.FC<FOPFormProps> = ({ orderId, onSubmitForm }) => {
    const [isLoading, setLoading] = useState(false);
    const initialValue = new FOPFormData(
        orderId,
        undefined,
        undefined,
        "",
        0,
        "",
        "",
    );
    const [formData, setFormData] = useState(initialValue);

    const { handlerSubmit, errors } = useFormSubmit({
        schema: formOfPaymentSchema,
    });

    const onChange = (
        key: keyof FOPFormData,
        value: FOPFormData[keyof TFormData],
    ) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };
    const onSubmit: HandleSubmit<FOPFormData> = (data) => {
        setLoading(true);
        onSubmitForm?.(data, () => {
            setFormData(initialValue);
            setLoading(false);
        });
    };

    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem
                            label="Loại phiếu thu"
                            validateStatus={errors?.type ? "error" : ""}
                            help={errors?.type || ""}
                            required
                        >
                            <Select
                                value={formData.type}
                                options={FOP_TYPE_LIST}
                                placeholder="Chọn loại phiếu thu"
                                onChange={(value) => onChange("type", value)}
                            />
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            label="Hình thức thanh toán"
                            validateStatus={errors?.fopType ? "error" : ""}
                            help={errors?.fopType || ""}
                            required
                        >
                            <Select
                                value={formData.fopType}
                                options={FOP_PAYMENT_TYPE_LIST}
                                placeholder="Chọn hình thức thanh toán"
                                onChange={(value) => onChange("fopType", value)}
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Số tiền"
                            validateStatus={errors?.amount ? "error" : ""}
                            help={errors?.amount || ""}
                        >
                            <Input
                                value={formData.amount}
                                placeholder="Số tiền thanh toán"
                                onChange={(evt) =>
                                    onChange("amount", evt.target.value)
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Người thanh toán"
                            validateStatus={errors?.payer ? "error" : ""}
                            help={errors?.payer || ""}
                            required
                        >
                            <Input
                                value={formData.payer}
                                placeholder="Họ tên"
                                name="payer"
                                onChange={(evt) =>
                                    onChange("payer", evt.target.value)
                                }
                            />
                        </FormItem>
                    </Col>

                    <Col span={24}>
                        <FormItem label="Thông tin thanh toán">
                            <TextArea
                                placeholder="Thông tin hoá đơn, mã số thanh toán..."
                                value={formData.fopDocument}
                                onChange={(evt) =>
                                    onChange("fopDocument", evt.target.value)
                                }
                            ></TextArea>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="Ghi chú"
                            validateStatus={errors?.rmk ? "error" : ""}
                            help={errors?.rmk || ""}
                        >
                            <Input.TextArea
                                placeholder="Ghi chú"
                                value={formData.rmk}
                                onChange={(evt) =>
                                    onChange("rmk", evt.target.value)
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Space>
                <Button onClick={() => {}}>Huỷ</Button>
                <Button
                    onClick={() => handlerSubmit(formData, onSubmit)}
                    type="primary"
                    loading={isLoading}
                >
                    Tạo phiếu thu
                </Button>
            </Space>
        </>
    );
};
export default FOPForm;
