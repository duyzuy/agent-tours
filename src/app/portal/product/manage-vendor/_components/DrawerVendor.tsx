"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
    Form,
    Input,
    Select,
    Space,
    Button,
    SelectProps,
    Drawer,
    Tag,
    Checkbox,
    Row,
    Col,
    CheckboxProps,
    Switch,
    SwitchProps,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

import { Status } from "@/models/management/common.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";

import { useFormSubmit } from "@/hooks/useFormSubmit";
import { VendorFormData } from "../modules/manageVendor.interface";
import { vendorSchema } from "../schema/vendor.schema";
import { IVendor } from "@/models/management/vendor.interface";
import { isEqualObject } from "@/utils/compare";
import { UseManageVendor } from "../modules/useManageVendor";
export enum EActionType {
    CREATE = "CREATE",
    EDIT = "EDIT",
}

export interface DrawerVendorProps {
    isOpen?: boolean;
    onCancel?: () => void;
    actionType?: EActionType;
    initialValues?: IVendor;
    onSubmit?: (
        actionType: EActionType,
        formData: VendorFormData,
        cb?: () => void,
    ) => void;
    onApproval?: UseManageVendor["onApproval"];
    onDeactive?: UseManageVendor["onDeactive"];
    onActive?: UseManageVendor["onActive"];
}

const DrawerVendor: React.FC<DrawerVendorProps> = ({
    isOpen,
    onCancel,
    actionType,
    onSubmit,
    initialValues,
    onApproval,
    onDeactive,
    onActive,
}) => {
    const initVendorFormData = new VendorFormData(
        undefined,
        "",
        [],
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "CASH",
        false,
        Status.OK,
    );
    const [formData, setFormData] = useState(initVendorFormData);
    const { errors, handlerSubmit } = useFormSubmit({ schema: vendorSchema });
    const [isLoadingStatus, setLoadingStatus] = useState(false);

    const { data: listInventoriesType, isLoading } =
        useGetInventoryTypeListCoreQuery({
            enabled: isOpen,
        });

    const onChangeFormData = (
        key: keyof VendorFormData,
        value: VendorFormData[keyof VendorFormData],
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const selectInventoryType: SelectProps<
        EInventoryType[],
        { label: string; value: string }
    >["onChange"] = (value, options) => {
        setFormData((prev) => ({
            ...prev,
            typeList: value,
        }));
    };

    const changeCreateSpplier: CheckboxProps["onChange"] = (ev) => {
        setFormData((prev) => ({
            ...prev,
            createDefaultSupplier: ev.target.checked,
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
            const { recId, typeList, ...restInitValues } = initialValues;
            const typeListArr = typeList?.split("||") as EInventoryType[];
            return isEqualObject(
                [
                    "address",
                    "fullName",
                    "shortName",
                    "bankAccountNumber",
                    "bankAddress",
                    "bankName",
                    "contact",
                    "typeList",
                    "rmk",
                    "taxCode",
                    "email",
                ],
                formData,
                {
                    ...restInitValues,
                    typeList: typeListArr,
                    createDefaultSupplier: false,
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
                "typeList",
                "rmk",
                "taxCode",
                "email",
            ],
            formData,
            initVendorFormData,
        );
    }, [isOpen, actionType, initialValues, formData]);

    useEffect(() => {
        if (actionType === EActionType.EDIT && initialValues) {
            const {
                recId,
                typeList,
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
                paymentType,
            } = initialValues;

            const typeListArr = typeList?.split("||") as EInventoryType[];
            const initFormDataFromValues = new VendorFormData(
                recId,
                shortName,
                typeListArr,
                fullName,
                contact,
                address,
                email,
                taxCode,
                rmk,
                bankName,
                bankAccountNumber,
                bankAddress,
                paymentType,
                false,
                status,
            );
            setFormData((prev) => initFormDataFromValues);
        } else {
            setFormData((prev) => initVendorFormData);
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
                initialValues?.status !== Status.QQ ? (
                    <Space>
                        <span className="font-normal text-sm">Kích hoạt:</span>
                        <Switch
                            value={
                                formData?.status === Status.OK ? true : false
                            }
                            onChange={handleUpdateStatus}
                            loading={isLoadingStatus}
                        />
                    </Space>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => onApproval?.(initialValues.recId)}
                    >
                        Duyệt
                    </Button>
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
                <Row gutter={[24, 24]}>
                    <Col span={12}>
                        <FormItem
                            label="Tên vendor"
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
                <FormItem
                    label="Loại dịch vụ cung ứng"
                    required
                    validateStatus={errors?.typeList ? "error" : ""}
                    help={errors?.typeList || ""}
                >
                    <Select<
                        EInventoryType[],
                        { label: string; value: EInventoryType }
                    >
                        mode="multiple"
                        placeholder="Loại dịch vụ cung ứng"
                        loading={isLoading}
                        value={formData.typeList}
                        options={listInventoriesType?.reduce<
                            { label: string; value: EInventoryType }[]
                        >((opts, item) => {
                            return [...opts, { label: item, value: item }];
                        }, [])}
                        onChange={selectInventoryType}
                        disabled={formData.status === Status.QQ}
                    />
                </FormItem>

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
                <Row gutter={[24, 24]}>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Payment type"
                            validateStatus={errors?.paymentType ? "error" : ""}
                            help={errors?.paymentType || ""}
                        >
                            <Input
                                placeholder="Payment type"
                                disabled={formData.status === Status.QQ}
                                value={formData.paymentType}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "bankAccountNumber",
                                        ev.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </Col>
                </Row>
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
                {actionType !== EActionType.EDIT ? (
                    <FormItem
                        label="Tạo Supplier"
                        tooltip="Tạo supplier tương ứng với Vendor"
                        required
                        validateStatus={errors?.bankName ? "error" : ""}
                        help={errors?.bankName || ""}
                    >
                        <Checkbox
                            checked={formData.createDefaultSupplier}
                            onChange={changeCreateSpplier}
                            disabled={formData.status === Status.QQ}
                        >
                            Tạo Supplier tương ứng
                        </Checkbox>
                    </FormItem>
                ) : null}
            </Form>
            <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                <Space>
                    <Button onClick={onCancel}>Huỷ bỏ</Button>
                    {initialValues?.status === Status.OK ? (
                        <>
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
                        </>
                    ) : null}
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawerVendor;
