import React, { useState } from "react";
import { Form, Row, Col, Input, Space, Button, Divider } from "antd";
import FormItem from "@/components/base/FormItem";
import { CustomerInformation } from "@/models/management/booking/customer.interface";

import classNames from "classnames";
import Link from "next/link";
export interface CustomerInformationFormProps {
    className?: string;
    customerInformation: CustomerInformation;
    setCustomerInformation: React.Dispatch<
        React.SetStateAction<CustomerInformation>
    >;
    errors?: Partial<Record<keyof CustomerInformation, string>> | undefined;
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
    className = "",
    customerInformation,
    setCustomerInformation,
    errors,
}) => {
    const onChangeCustomerInformation = (
        key: keyof CustomerInformation,
        value: CustomerInformation[keyof CustomerInformation],
    ) => {
        setCustomerInformation((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onCustomerNote = (value: string) => {
        setCustomerInformation((prev) => ({ ...prev, rmk: value }));
    };

    return (
        <div
            className={classNames("customer__information", {
                [className]: className,
            })}
        >
            <div className="customer__information-head px-6 pt-6">
                <h3 className="font-[500] text-lg">Thông tin người đặt</h3>
            </div>
            <Divider />
            <div className="customer__information-body px-6 pb-6">
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
                                validateStatus={
                                    errors?.custEmail ? "error" : ""
                                }
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
                                validateStatus={
                                    errors?.custPhoneNumber ? "error" : ""
                                }
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
                                    value={customerInformation.rmk}
                                    onChange={(ev) =>
                                        onCustomerNote(ev.target.value)
                                    }
                                ></Input.TextArea>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div className="note">
                    <p>
                        <Link href="/portal/booking/passenger-information">
                            Nhập thông tin hành khách?
                        </Link>
                    </p>
                    <p>
                        Thông tin hành khách vẫn có thể được nhập và thay đổi
                        trong quản lý booking.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default CustomerInformationForm;
