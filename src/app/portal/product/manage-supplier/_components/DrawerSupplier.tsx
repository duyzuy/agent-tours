"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
    Form,
    Input,
    Space,
    Button,
    Drawer,
    Tag,
    Row,
    Col,
    Switch,
    SwitchProps,
} from "antd";
import FormItem from "@/components/base/FormItem";

import { Status } from "@/models/management/common.interface";

import { useFormSubmit } from "@/hooks/useFormSubmit";
import { SupplierFormData } from "../modules/manageSupplier.interface";
import { supplierSchema } from "../schema/supplier.schema";
import { isEqualObject } from "@/utils/compare";
import { ISupplier } from "@/models/management/supplier.interface";
import SelectorVendor, { SelectorVendorProps } from "./SelectorVendor";
import { UseManageSupplier } from "../modules/useManageSupplier";

export enum EActionType {
    CREATE = "CREATE",
    EDIT = "EDIT",
}

export interface DrawerSupplierProps {
    isOpen?: boolean;
    onCancel?: () => void;
    actionType?: EActionType;
    initialValues?: ISupplier;
    onSubmit?: (
        actionType: EActionType,
        formData: SupplierFormData,
        cb?: () => void,
    ) => void;
    onApproval?: UseManageSupplier["onApproval"];
    onDeactive?: UseManageSupplier["onDeactive"];
    onActive?: UseManageSupplier["onActive"];
}

const DrawerVendor: React.FC<DrawerSupplierProps> = ({
    isOpen,
    onCancel,
    actionType,
    onSubmit,
    initialValues,
    onApproval,
    onDeactive,
    onActive,
}) => {
    const initFormData = new SupplierFormData(
        undefined,
        undefined,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        Status.OK,
    );
    const [formData, setFormData] = useState(initFormData);
    const [isLoadingStatus, setLoadingStatus] = useState(false);
    const { errors, handlerSubmit } = useFormSubmit({ schema: supplierSchema });

    const onChangeFormData = (
        key: keyof SupplierFormData,
        value: SupplierFormData[keyof SupplierFormData],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const selectVendor: SelectorVendorProps["onChange"] = (
        vendorId,
        option,
    ) => {
        setFormData((prev) => ({
            ...prev,
            vendorId: vendorId,
        }));
    };
    const handleUpdateStatus: SwitchProps["onChange"] = (checked) => {
        if (!formData.recId) {
            throw new Error("Recid in-valid");
        }
        setLoadingStatus(true);
        if (checked === true) {
            onActive?.(formData?.recId, (data) => {
                setFormData((prev) => ({
                    ...prev,
                    status: data.status,
                }));
                setLoadingStatus(false);
            });
        } else {
            onDeactive?.(formData?.recId, (data) => {
                setFormData((prev) => ({
                    ...prev,
                    status: data.status,
                }));
                setLoadingStatus(false);
            });
        }
    };
    const isDisableSubmitButton = useMemo(() => {
        if (actionType === EActionType.EDIT && initialValues) {
            const { recId, vendor, ...restInitValues } = initialValues;

            return isEqualObject(
                [
                    "address",
                    "fullName",
                    "shortName",
                    "bankAccountNumber",
                    "bankAddress",
                    "bankName",
                    "contact",
                    "rmk",
                    "taxCode",
                    "email",
                ],
                formData,
                {
                    ...restInitValues,
                },
            );
        }
        return isEqualObject(
            [
                "address",
                "fullName",
                "shortName",
                "bankAccountNumber",
                "bankAddress",
                "bankName",
                "contact",
                "rmk",
                "taxCode",
                "email",
            ],
            formData,
            initFormData,
        );
    }, [isOpen, actionType, initialValues, formData]);

    useEffect(() => {
        if (actionType === EActionType.EDIT && initialValues) {
            const {
                recId,
                vendorId,
                shortName,
                fullName,
                email,
                address,
                contact,
                taxCode,
                bankAccountNumber,
                bankAddress,
                bankName,
                rmk,
                status,
            } = initialValues;

            const initFormDataFromValues = new SupplierFormData(
                recId,
                vendorId,
                shortName,
                fullName,
                contact,
                address,
                email,
                taxCode,
                rmk,
                bankName,
                bankAccountNumber,
                bankAddress,
                status,
            );
            setFormData((prev) => initFormDataFromValues);
        } else {
            setFormData((prev) => initFormData);
        }
    }, [isOpen, initialValues]);

    return (
        <Drawer
            title={
                actionType === EActionType.CREATE
                    ? "Thêm mới"
                    : initialValues?.fullName
            }
            extra={
                formData.status === Status.QQ ? (
                    <Button
                        type="primary"
                        onClick={() =>
                            initialValues && onApproval?.(initialValues?.recId)
                        }
                    >
                        Duyệt
                    </Button>
                ) : (
                    <Space>
                        <span className="font-normal text-sm">Kích hoạt:</span>
                        <Switch
                            value={
                                formData?.status === Status.OK ? true : false
                            }
                            loading={isLoadingStatus}
                            onChange={handleUpdateStatus}
                        />
                    </Space>
                )
            }
            destroyOnClose
            width={550}
            onClose={onCancel}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form
                layout="vertical"
                colon={false}
                labelWrap
                className="max-w-4xl"
            >
                <FormItem
                    label="Chọn Vendor"
                    required
                    validateStatus={errors?.vendorId ? "error" : ""}
                    help={errors?.vendorId || ""}
                >
                    <SelectorVendor
                        onChange={selectVendor}
                        value={formData.vendorId}
                        disabled={actionType === EActionType.EDIT}
                    />
                </FormItem>
                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <FormItem
                            label="Tên supplier"
                            required
                            validateStatus={errors?.fullName ? "error" : ""}
                            help={errors?.fullName || ""}
                        >
                            <Input
                                placeholder="Tên vendor"
                                value={formData.fullName}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "fullName",
                                        ev.target.value,
                                    )
                                }
                                disabled={formData.status === Status.QQ}
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Tên rút gọn"
                            required
                            validateStatus={errors?.shortName ? "error" : ""}
                            help={errors?.shortName || ""}
                        >
                            <Input
                                placeholder="Tên rút gọn"
                                value={formData.shortName}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "shortName",
                                        ev.target.value,
                                    )
                                }
                                disabled={formData.status === Status.QQ}
                            />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <FormItem
                            label="Họ và tên người liên hệ"
                            required
                            validateStatus={errors?.contact ? "error" : ""}
                            help={errors?.contact || ""}
                        >
                            <Input
                                placeholder="Họ và tên"
                                value={formData.contact}
                                onChange={(ev) =>
                                    onChangeFormData("contact", ev.target.value)
                                }
                                disabled={formData.status === Status.QQ}
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Email"
                            required
                            validateStatus={errors?.email ? "error" : ""}
                            help={errors?.email || ""}
                        >
                            <Input
                                placeholder="Email"
                                value={formData.email}
                                onChange={(ev) =>
                                    onChangeFormData("email", ev.target.value)
                                }
                                disabled={formData.status === Status.QQ}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                    label="Địa chỉ"
                    validateStatus={errors?.address ? "error" : ""}
                    help={errors?.address || ""}
                >
                    <Input
                        placeholder="Địa chỉ"
                        value={formData.address}
                        onChange={(ev) =>
                            onChangeFormData("address", ev.target.value)
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
                <FormItem
                    label="Ghi chú"
                    validateStatus={errors?.rmk ? "error" : ""}
                    help={errors?.rmk || ""}
                >
                    <Input.TextArea
                        placeholder="Ghi chú"
                        value={formData.rmk}
                        onChange={(ev) =>
                            onChangeFormData("rmk", ev.target.value)
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
                <FormItem
                    label="Mã số thuế"
                    validateStatus={errors?.taxCode ? "error" : ""}
                    help={errors?.taxCode || ""}
                >
                    <Input
                        placeholder="Mã số thuế"
                        value={formData.taxCode}
                        onChange={(ev) =>
                            onChangeFormData("taxCode", ev.target.value)
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
                <FormItem
                    label="Tên ngân hàng"
                    validateStatus={errors?.bankName ? "error" : ""}
                    help={errors?.bankName || ""}
                >
                    <Input
                        placeholder="Tên ngân hàng"
                        value={formData.bankName}
                        onChange={(ev) =>
                            onChangeFormData("bankName", ev.target.value)
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
                <FormItem
                    label="Chi nhánh ngân hàng"
                    validateStatus={errors?.bankAddress ? "error" : ""}
                    help={errors?.bankAddress || ""}
                >
                    <Input
                        placeholder="Chi nhánh ngân hàng"
                        value={formData.bankAddress}
                        onChange={(ev) =>
                            onChangeFormData("bankAddress", ev.target.value)
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
                <FormItem
                    label="Số tài khoản ngân hàng"
                    validateStatus={errors?.bankAccountNumber ? "error" : ""}
                    help={errors?.bankAccountNumber || ""}
                >
                    <Input
                        placeholder="Số tài khoản ngân hàng"
                        value={formData.bankAccountNumber}
                        onChange={(ev) =>
                            onChangeFormData(
                                "bankAccountNumber",
                                ev.target.value,
                            )
                        }
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>
            </Form>
            <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                <Space>
                    <Button onClick={onCancel}>Huỷ bỏ</Button>
                    {actionType === EActionType.EDIT ? (
                        <Button
                            type="primary"
                            onClick={() =>
                                handlerSubmit(formData, (data) =>
                                    onSubmit?.(actionType, data),
                                )
                            }
                            disabled={isDisableSubmitButton}
                        >
                            Cập nhật
                        </Button>
                    ) : null}
                    {actionType === EActionType.CREATE ? (
                        <>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handlerSubmit(formData, (data) =>
                                        onSubmit?.(actionType, {
                                            ...data,
                                            status: Status.QQ,
                                        }),
                                    )
                                }
                                disabled={isDisableSubmitButton}
                            >
                                Lưu và chờ duyệt
                            </Button>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handlerSubmit(formData, (data) =>
                                        onSubmit?.(actionType, {
                                            ...data,
                                            status: Status.OK,
                                        }),
                                    )
                                }
                                disabled={isDisableSubmitButton}
                            >
                                Lưu và duyệt
                            </Button>
                        </>
                    ) : null}
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawerVendor;
