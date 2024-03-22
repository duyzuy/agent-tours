import { useEffect, useState } from "react";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { SplitBookingData } from "../../modules/splitBooking.interface";
import { isUndefined } from "lodash";

export interface CustomerInformationFormProps {
    initialValues?: SplitBookingData["customerInfo"];
    onChangeForm?: (
        key: keyof TCustomerInfoType,
        value: TCustomerInfoType[TKeysCustomerInfo],
    ) => void;
    errors?: Partial<Record<TKeysCustomerInfo, string>>;
}

type TCustomerInfoType = Required<Required<SplitBookingData>["customerInfo"]>;

type KeysOfValue<T, TCondition> = {
    [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysCustomerInfo = KeysOfValue<TCustomerInfoType, string>;

const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
    onChangeForm,
    initialValues,
    errors,
}) => {
    const [customerFormData, setCustomerFormData] =
        useState<SplitBookingData["customerInfo"]>();

    const onChangeFormData = (
        key: keyof TCustomerInfoType,
        value: TCustomerInfoType[TKeysCustomerInfo],
    ) => {
        setCustomerFormData((oldValue) => ({
            ...oldValue,
            [key]: value,
        }));
        onChangeForm?.(key, value);
    };

    /*
     * INITIAL FORM Data
     */
    useEffect(() => {
        if (!isUndefined(initialValues)) {
            setCustomerFormData((prev) => ({
                ...prev,
                custName: initialValues?.custName,
                custEmail: initialValues?.custEmail,
                custAddress: initialValues?.custAddress,
                custPhoneNumber: initialValues?.custPhoneNumber,
                rmk: initialValues?.rmk,
            }));
        }
    }, []);

    return (
        <div className="customer__information-form max-w-2xl mt-6">
            <div className="customer__information-form-head py-3">
                <span className="font-[500] text-[16px]">
                    Thông tin người đặt mới
                </span>
            </div>
            <div className="customer__information-form-body">
                <Form layout="vertical" component="div">
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem
                                label="Họ và tên"
                                validateStatus={errors?.custName ? "error" : ""}
                                help={errors?.custName || ""}
                                required
                            >
                                <Input
                                    value={customerFormData?.custName}
                                    placeholder="Họ"
                                    onChange={(ev) =>
                                        onChangeFormData(
                                            "custName",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="Email"
                                validateStatus={
                                    errors?.custEmail ? "error" : ""
                                }
                                help={errors?.custEmail || ""}
                                required
                            >
                                <Input
                                    value={customerFormData?.custEmail}
                                    placeholder="Email"
                                    onChange={(ev) =>
                                        onChangeFormData(
                                            "custEmail",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="Số điện thoại"
                                validateStatus={
                                    errors?.custPhoneNumber ? "error" : ""
                                }
                                help={errors?.custPhoneNumber || ""}
                                required
                            >
                                <Input
                                    value={customerFormData?.custPhoneNumber}
                                    placeholder="Số điện thoại"
                                    onChange={(ev) =>
                                        onChangeFormData(
                                            "custPhoneNumber",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>

                        <Col span={12}>
                            <FormItem
                                label="Địa chỉ"
                                validateStatus={
                                    errors?.custAddress ? "error" : ""
                                }
                                help={errors?.custAddress || ""}
                            >
                                <Input
                                    value={customerFormData?.custAddress}
                                    placeholder="Nhập địa chỉ thường trú"
                                    onChange={(ev) =>
                                        onChangeFormData(
                                            "custAddress",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem
                                label="Khách hàng ghi chú"
                                validateStatus={errors?.rmk ? "error" : ""}
                                help={errors?.rmk || ""}
                            >
                                <Input.TextArea
                                    value={customerFormData?.rmk}
                                    placeholder="Ghi chú"
                                    onChange={(ev) =>
                                        onChangeFormData("rmk", ev.target.value)
                                    }
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
export default CustomerInformationForm;
