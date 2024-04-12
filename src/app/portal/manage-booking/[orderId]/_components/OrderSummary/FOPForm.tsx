import React, { useMemo, useState } from "react";
import { Space, Button, Form, Row, Col, Input, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import {
    FOP_PAYMENT_TYPE_LIST,
    FOP_TYPE_LIST,
} from "../../modules/formOfPayment.interface";
import TextArea from "antd/es/input/TextArea";
import { formOfPaymentSchema } from "../../schema/formOfPayment";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { isEmpty, isUndefined } from "lodash";

type TFormData = Required<FOPFormData>;
interface FOPFormProps {
    orderId?: number;
    onSubmitForm?: (data: FOPFormData, cb?: () => void) => void;
    formOfPaymentType: FOPFormData["type"];
}
const FOPForm: React.FC<FOPFormProps> = ({
    orderId = 0,
    onSubmitForm,
    formOfPaymentType,
}) => {
    const [isLoading, setLoading] = useState(false);
    const initialValue = new FOPFormData(
        orderId,
        formOfPaymentType,
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
    const isDisableButton = useMemo(() => {
        return (
            isEmpty(formData.amount) ||
            isUndefined(formData.amount) ||
            isUndefined(formData.payer) ||
            isEmpty(formData.payer) ||
            isUndefined(formData.fopType)
        );
    }, [formData.amount, formData.payer, formData.fopType]);
    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
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

                    <Col span={12}>
                        <FormItem
                            label="Hình thức"
                            validateStatus={errors?.fopType ? "error" : ""}
                            help={errors?.fopType || ""}
                            required
                        >
                            <Select
                                value={formData.fopType}
                                options={FOP_PAYMENT_TYPE_LIST}
                                placeholder="Hình thức"
                                onChange={(value) => onChange("fopType", value)}
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="Số tiền"
                            validateStatus={errors?.amount ? "error" : ""}
                            help={errors?.amount || ""}
                        >
                            <Input
                                value={formData.amount}
                                placeholder="Số tiền"
                                onChange={(evt) =>
                                    onChange("amount", evt.target.value)
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
                <Button
                    onClick={() => handlerSubmit(formData, onSubmit)}
                    type="primary"
                    className="w-[140px]"
                    loading={isLoading}
                    disabled={isDisableButton}
                >
                    Xác nhận
                </Button>
            </Space>
        </>
    );
};
export default FOPForm;
