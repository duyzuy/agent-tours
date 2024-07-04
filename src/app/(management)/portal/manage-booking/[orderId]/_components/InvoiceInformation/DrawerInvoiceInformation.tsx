import { useEffect, useState, memo, useMemo } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { BookingOrderInvoiceFormData } from "../../../modules/bookingOrder.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { bookingInvoiceInfoSchema } from "../../../schema/bookingOrder.schema";
import { isEqualObject } from "@/utils/compare";
import { isEqual } from "lodash";

export interface DrawerInvoiceInformationProps {
    isOpen?: boolean;
    onClose?: () => void;
    initialValues?: BookingOrderInvoiceFormData;
    onSubmit?: (data: BookingOrderInvoiceFormData) => void;
    orderId?: number;
}

type KeysOfValue<T, TCondition> = {
    [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysPassenger = KeysOfValue<
    Required<BookingOrderInvoiceFormData>,
    string
>;

const DrawerInvoiceInformation: React.FC<DrawerInvoiceInformationProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    orderId,
}) => {
    const [formData, setformData] = useState(
        () => new BookingOrderInvoiceFormData(orderId, "", "", "", "", ""),
    );
    const { handlerSubmit, clearErrors, errors } = useFormSubmit({
        schema: bookingInvoiceInfoSchema,
    });

    const onChangeFormData = (
        key: TKeysPassenger,
        value: (typeof formData)[TKeysPassenger],
    ) => {
        setformData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onSubmitformData: HandleSubmit<BookingOrderInvoiceFormData> = (
        data,
    ) => {
        onSubmit?.(data);
    };

    const isDisableButton = useMemo(() => {
        return isEqualObject(
            [
                "invoiceAddress",
                "invoiceCompanyName",
                "invoiceEmail",
                "invoiceName",
            ],
            formData,
            initialValues,
        );
    }, [formData]);

    /*
     * INITIAL FORM Data
     */
    useEffect(() => {
        setformData((prev) => ({
            ...prev,
            invoiceName: initialValues?.invoiceName,
            invoiceEmail: initialValues?.invoiceEmail,
            invoiceCompanyName: initialValues?.invoiceCompanyName,
            invoiceTaxCode: initialValues?.invoiceTaxCode,
            invoiceAddress: initialValues?.invoiceAddress,
        }));
        clearErrors();
    }, [initialValues, isOpen]);

    return (
        <Drawer
            title={`Thông tin xuất hoá đơn`}
            width={650}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem
                            label="Họ và tên"
                            validateStatus={errors?.invoiceName ? "error" : ""}
                            help={errors?.invoiceName || ""}
                            required
                        >
                            <Input
                                value={formData.invoiceName}
                                placeholder="Họ và tên"
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "invoiceName",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Email"
                            validateStatus={errors?.invoiceEmail ? "error" : ""}
                            help={errors?.invoiceEmail || ""}
                            required
                        >
                            <Input
                                value={formData.invoiceEmail}
                                placeholder="Email"
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "invoiceEmail",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Tên công ty"
                            validateStatus={
                                errors?.invoiceCompanyName ? "error" : ""
                            }
                            help={errors?.invoiceCompanyName || ""}
                            required
                        >
                            <Input
                                value={formData.invoiceCompanyName}
                                placeholder="Tên công ty"
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "invoiceCompanyName",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            label="Mã số thuế"
                            validateStatus={
                                errors?.invoiceTaxCode ? "error" : ""
                            }
                            help={errors?.invoiceTaxCode || ""}
                        >
                            <Input
                                value={formData.invoiceTaxCode}
                                placeholder="Mã số thuế"
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "invoiceTaxCode",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="Địa chỉ"
                            validateStatus={
                                errors?.invoiceAddress ? "error" : ""
                            }
                            help={errors?.invoiceAddress || ""}
                        >
                            <Input
                                value={formData.invoiceAddress}
                                placeholder="Địa chỉ"
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "invoiceAddress",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handlerSubmit(formData, onSubmitformData)
                        }
                        type="primary"
                        disabled={isDisableButton}
                    >
                        Cập nhật
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default memo(DrawerInvoiceInformation);
