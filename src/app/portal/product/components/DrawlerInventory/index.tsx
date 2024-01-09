import React, { useEffect, useState } from "react";
import { Form, Input, Space, Radio, Spin, Button, Drawer } from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";

import {
    InventoryFormData,
    IInventoryPayload,
    IInventoryListRs,
} from "@/models/management/core/inventory.interface";
import { Status } from "@/models/management/common.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { TInventoryErrorsField } from "../../hooks/useCRUDInventory";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    type: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    type: EActionType.EDIT;
    record: IInventoryListRs["result"][0];
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawlerInventoryProps {
    isOpen?: boolean;
    onCancel: () => void;
    actionType: EActionType;
    initialValues?: IInventoryListRs["result"][0];
    onSubmit?: (action: EActionType, formData: InventoryFormData) => void;
    errors?: TInventoryErrorsField;
}

const DrawlerInventory: React.FC<DrawlerInventoryProps> = ({
    actionType,
    onCancel,
    onSubmit,
    isOpen,
    errors,
    initialValues,
}) => {
    const { data: inventoryTypeList, isLoading: isLoadingInventoryType } =
        useGetInventoryTypeListCoreQuery({ enabled: isOpen });
    const { data: productTypeList, isLoading: isLoadingProductTpe } =
        useGetProductTypeListCoreQuery({ enabled: isOpen });

    let initFormData = new InventoryFormData("", "", "", undefined, undefined);
    const [formData, setFormData] = useState(initFormData);

    const onChangeFormData = (
        key: keyof IInventoryPayload,
        value: string | boolean,
    ) => {
        if (key === "code" && typeof value === "string") {
            value =
                vietnameseTonesToUnderscoreKeyname(value).toLocaleUpperCase();
        }
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onSubmitFormData = (status: Status) => {
        let formDataUpdateStatus = {
            ...formData,
            status: status,
        };
        onSubmit?.(actionType, formDataUpdateStatus);
    };
    useEffect(() => {
        if (initialValues) {
            initFormData = new InventoryFormData(
                initialValues.name,
                initialValues.code,
                initialValues.cmsIdentity,
                initialValues.type,
                initialValues.productType,
            );
            initFormData.status = initialValues.status;
        }
        setFormData(() => initFormData);
    }, [initialValues, isOpen]);
    return (
        <Drawer
            title={actionType === EActionType.CREATE ? "Thêm mới" : "Chỉnh sửa"}
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
            <Form layout="vertical" className=" max-w-4xl">
                <FormItem
                    label="Tên inventory"
                    required
                    validateStatus={errors?.name ? "error" : ""}
                    help={errors?.name || ""}
                >
                    <Input
                        placeholder="Tên"
                        value={formData.name}
                        onChange={(ev) =>
                            onChangeFormData("name", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Code inventory"
                    required
                    validateStatus={errors?.code ? "error" : ""}
                    help={errors?.code || ""}
                >
                    <Input
                        placeholder="Code"
                        value={formData.code}
                        onChange={(ev) =>
                            onChangeFormData("code", ev.target.value)
                        }
                        disabled={actionType === EActionType.EDIT}
                    />
                    <div className="p-2">
                        <p className="font-bold">{`Lưu ý tạo code:`}</p>
                        <ul className="text-xs list-disc pl-4">
                            <li>
                                {`Code key viết không dấu và không chứa ký tự đặc
                                biệt.`}
                            </li>
                            <li>{`Được ngăn cách bằng dấu gạch dưới '_'.`}</li>
                        </ul>
                    </div>
                </FormItem>
                <FormItem
                    label="Loại Inventory"
                    required
                    validateStatus={errors?.type ? "error" : ""}
                    help={errors?.type || ""}
                >
                    {isLoadingInventoryType ? (
                        <Spin />
                    ) : (
                        <Radio.Group
                            onChange={(ev) =>
                                onChangeFormData("type", ev.target.value)
                            }
                            value={formData.type}
                            disabled={actionType === EActionType.EDIT}
                        >
                            <Space wrap direction="vertical">
                                {inventoryTypeList?.map((inventoryType) => (
                                    <Radio
                                        value={inventoryType}
                                        key={inventoryType}
                                    >
                                        {inventoryType}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem
                    label="Loại sản phẩm"
                    required
                    validateStatus={errors?.productType ? "error" : ""}
                    help={errors?.productType || ""}
                >
                    {isLoadingProductTpe ? (
                        <Spin />
                    ) : (
                        <Radio.Group
                            onChange={(ev) =>
                                onChangeFormData("productType", ev.target.value)
                            }
                            value={formData.productType}
                            disabled={actionType === EActionType.EDIT}
                        >
                            <Space direction="vertical" wrap>
                                {productTypeList?.map((productType) => (
                                    <Radio
                                        value={productType}
                                        key={productType}
                                    >
                                        {productType}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem
                    label="Quản lý stock"
                    validateStatus={errors?.isStock ? "error" : ""}
                    help={errors?.isStock || ""}
                >
                    <Radio.Group
                        onChange={(ev) =>
                            onChangeFormData("isStock", ev.target.value)
                        }
                        value={formData.isStock}
                        disabled={actionType === EActionType.EDIT}
                    >
                        <Space direction="vertical" wrap>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Space>
                    </Radio.Group>
                </FormItem>
            </Form>
            <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                <Space>
                    <Button type="default">Huỷ bỏ</Button>
                    {actionType === EActionType.CREATE ? (
                        <>
                            <Button
                                type="primary"
                                onClick={() => onSubmitFormData(Status.QQ)}
                                disabled={false}
                            >
                                Gửi duyệt
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => onSubmitFormData(Status.OK)}
                                disabled={false}
                            >
                                Thêm và kích hoạt
                            </Button>
                        </>
                    ) : (
                        <>
                            {initialValues ? (
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        onSubmitFormData(initialValues.status)
                                    }
                                    disabled={false}
                                >
                                    Cập nhật
                                </Button>
                            ) : null}
                        </>
                    )}
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawlerInventory;
