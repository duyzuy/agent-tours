import { useEffect, useMemo, useState, memo } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { BookingOrderCustomerFormData } from "../../../modules/bookingOrder.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { bookingCustomerInfoSchema } from "../../../schema/bookingOrder.schema";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { isEqualObject } from "@/utils/compare";
export interface DrawerCustomerInformationProps {
    isOpen?: boolean;
    onClose?: () => void;
    initialValues?: ICustomerInformation;
    onSubmit?: (data: BookingOrderCustomerFormData) => void;
    orderId?: number;
}

type KeysOfValue<T, TCondition> = {
    [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysPassenger = KeysOfValue<
    Required<BookingOrderCustomerFormData>,
    string
>;

const DrawerCustomerInformation: React.FC<DrawerCustomerInformationProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues,
    orderId,
}) => {
    const [passengerFormData, setPassengerFormData] = useState(
        () => new BookingOrderCustomerFormData(orderId, "", "", "", "", ""),
    );
    const { handlerSubmit, clearErrors, errors } = useFormSubmit({
        schema: bookingCustomerInfoSchema,
    });

    const onChangeFormData = (
        key: TKeysPassenger,
        value: (typeof passengerFormData)[TKeysPassenger],
    ) => {
        setPassengerFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const isDisableButton = useMemo(() => {
        return isEqualObject(
            ["custAddress", "custEmail", "custName", "custPhoneNumber", "rmk"],
            passengerFormData,
            initialValues,
        );
    }, [passengerFormData]);
    const onSubmitPassengerFormData: HandleSubmit<
        BookingOrderCustomerFormData
    > = (data) => {
        onSubmit?.(data);
    };
    /*
     * INITIAL FORM Data
     */
    useEffect(() => {
        if (initialValues) {
            setPassengerFormData((prev) => ({
                ...prev,
                custName: initialValues?.custName,
                custEmail: initialValues?.custEmail,
                custAddress: initialValues?.custAddress,
                custPhoneNumber: initialValues?.custPhoneNumber,
                rmk: initialValues?.rmk,
            }));
        }
        clearErrors();
    }, [initialValues, isOpen]);

    return (
        <Drawer
            title={`Thông tin người đặt`}
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
                            validateStatus={errors?.custName ? "error" : ""}
                            help={errors?.custName || ""}
                            required
                        >
                            <Input
                                value={passengerFormData.custName}
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
                            validateStatus={errors?.custEmail ? "error" : ""}
                            help={errors?.custEmail || ""}
                            required
                        >
                            <Input
                                value={passengerFormData.custEmail}
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
                                value={passengerFormData.custPhoneNumber}
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
                            validateStatus={errors?.custAddress ? "error" : ""}
                            help={errors?.custAddress || ""}
                        >
                            <Input
                                value={passengerFormData.custAddress}
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
                            label="Lưu ý"
                            validateStatus={errors?.rmk ? "error" : ""}
                            help={errors?.rmk || ""}
                        >
                            <Input.TextArea
                                value={passengerFormData.rmk}
                                placeholder="Nhập nội dung"
                                onChange={(ev) =>
                                    onChangeFormData("rmk", ev.target.value)
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
                            handlerSubmit(
                                passengerFormData,
                                onSubmitPassengerFormData,
                            )
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
export default memo(DrawerCustomerInformation);
