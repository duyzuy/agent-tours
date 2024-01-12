"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Select, Space, Button, SelectProps, Drawer } from "antd";
import FormItem from "@/components/base/FormItem";
import { IDestination } from "@/models/management/region.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { CMS_TEMPLATES } from "@/constants/cmsTemplate.constant";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import {
    ITemplateSaleableListRs,
    TemplateSellableFormData,
} from "@/models/management/core/templateSellable.interface";
import { Status } from "@/models/management/common.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { templateSellableSchema } from "../../../hooks/validation";

export enum EActionType {
    CREATE = "CREATE",
    EDIT = "EDIT",
}
type TDestinationOption = {
    label: string;
    value: string;
    destination: IDestination;
};
export interface DrawerTemplateSellableProps {
    isOpen?: boolean;
    onCancel: () => void;
    actionType?: EActionType;
    initialValues?: ITemplateSaleableListRs["result"][0];
    onSubmit?: (
        actionType: EActionType,
        formData: TemplateSellableFormData,
    ) => void;
}

const DrawerTemplateSellable: React.FC<DrawerTemplateSellableProps> = ({
    isOpen,
    onCancel,
    actionType,
    onSubmit,
    initialValues,
}) => {
    const initSellableFormdata = new TemplateSellableFormData(
        "",
        undefined,
        "",
        "",
        [],
        [],
        Status.QQ,
    );
    const [templateSellableFormData, setTemplateSellableFormData] =
        useState(initSellableFormdata);

    const { data: destinationList } = useGetDestinationsQuery();

    const { data: inventoryTypeList } = useGetInventoryTypeListCoreQuery({
        enabled: true,
    });

    const { data: productTypeList } = useGetProductTypeListCoreQuery({
        enabled: true,
    });

    const { handlerSubmit, errors } = useFormSubmit<TemplateSellableFormData>({
        schema: templateSellableSchema,
    });
    const inventoryTypeOptions: SelectProps["options"] = useMemo(() => {
        let options: SelectProps["options"] = [];
        if (inventoryTypeList) {
            inventoryTypeList.forEach((item) => {
                options = [...(options || []), { value: item, label: item }];
            });
        }
        return options;
    }, [inventoryTypeList]);

    const productTypeOptions = useMemo(() => {
        return (
            productTypeList?.reduce<{ label: string; value: string }[]>(
                (acc, type) => {
                    acc = [...acc, { label: type, value: type }];
                    return acc;
                },
                [],
            ) || []
        );
    }, [productTypeList]);

    const destinationListOptions = useMemo(() => {
        return destinationList?.reduce<
            { value: string; label: string; destination: IDestination }[]
        >((acc, destination) => {
            acc = [
                ...acc,
                {
                    value: destination.codeKey,
                    label: destination.codeName,
                    destination: destination,
                },
            ];
            return acc;
        }, []);
    }, [destinationList]);

    const onSelectDestination = (options: TDestinationOption[]) => {
        const destinations = options.map((opt) => opt.destination);
        setTemplateSellableFormData((prev) => ({
            ...prev,
            destListJson: [...destinations],
        }));
    };
    const onChangeSellableFormData = (
        key: keyof TemplateSellableFormData,
        value:
            | string
            | number
            | EInventoryType[]
            | EProductType
            | IDestination[],
    ) => {
        if (key === "code" && typeof value === "string") {
            value = vietnameseTonesToUnderscoreKeyname(value).toUpperCase();
        }

        const data = setTemplateSellableFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const templateOptions = useMemo(() => {
        return CMS_TEMPLATES.reduce<
            {
                label: string;
                value: string;
                templateName: string;
                templateKey: string;
            }[]
        >((acc, template) => {
            return (acc = [
                ...acc,
                {
                    ...template,
                    label: template.templateName,
                    value: template.templateKey,
                },
            ]);
        }, []);
    }, [initialValues, isOpen]);

    const handleSubmitForm: HandleSubmit<TemplateSellableFormData> = (data) => {
        actionType && onSubmit?.(actionType, data);
    };
    useEffect(() => {
        if (initialValues && actionType === EActionType.EDIT) {
            const inventoryTypeList = initialValues.inventoryTypeList.split(
                "||",
            ) as EInventoryType[];

            const destinationList = JSON.parse(
                initialValues.destListJson,
            ) as IDestination[];

            setTemplateSellableFormData((prev) => ({
                ...prev,
                inventoryTypeList: inventoryTypeList,
                type: initialValues.type as EProductType,
                name: initialValues.name,
                code: initialValues.code,
                cmsIdentity: initialValues.cmsIdentity,
                destListJson: destinationList,
            }));
        } else {
            setTemplateSellableFormData(initSellableFormdata);
        }
    }, [initialValues, actionType, isOpen]);

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
            <Form
                layout="vertical"
                colon={false}
                labelWrap
                className="max-w-4xl"
            >
                <FormItem
                    label="CMS template content"
                    required
                    validateStatus={errors?.cmsIdentity ? "error" : ""}
                    help={errors?.cmsIdentity || ""}
                >
                    <Select
                        placeholder="Chọn template"
                        onChange={(value) =>
                            onChangeSellableFormData("cmsIdentity", value)
                        }
                        options={templateOptions}
                    />
                </FormItem>
                <FormItem
                    label="Template sellable name"
                    required
                    validateStatus={errors?.name ? "error" : ""}
                    help={errors?.name || ""}
                >
                    <Input
                        placeholder="Template sellable name"
                        value={templateSellableFormData.name}
                        onChange={(ev) =>
                            onChangeSellableFormData("name", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Template sellable code"
                    required
                    validateStatus={errors?.code ? "error" : ""}
                    help={errors?.code || ""}
                >
                    <Input
                        placeholder="Template sellable code"
                        value={templateSellableFormData.code}
                        onChange={(ev) =>
                            onChangeSellableFormData("code", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Loại product"
                    required
                    validateStatus={errors?.type ? "error" : ""}
                    help={errors?.type || ""}
                >
                    <Select
                        placeholder="Chọn sản phẩm"
                        value={templateSellableFormData.type}
                        onChange={(value) =>
                            onChangeSellableFormData("type", value)
                        }
                        options={productTypeOptions}
                    />
                </FormItem>
                <FormItem
                    label="Loại inventory"
                    required
                    validateStatus={errors?.inventoryTypeList ? "error" : ""}
                    help={errors?.inventoryTypeList || ""}
                >
                    <Select
                        placeholder="Chọn inventory"
                        mode="multiple"
                        value={templateSellableFormData.inventoryTypeList}
                        onChange={(value) =>
                            onChangeSellableFormData("inventoryTypeList", value)
                        }
                        options={inventoryTypeOptions}
                    />
                </FormItem>
                <FormItem
                    label="Nhóm điểm đến"
                    required
                    validateStatus={errors?.destListJson ? "error" : ""}
                    help={errors?.destListJson || ""}
                >
                    <Select
                        placeholder="Chọn nhóm điểm đến"
                        onChange={(value, options) =>
                            onSelectDestination(options as TDestinationOption[])
                        }
                        value={getSelectedDestination(
                            templateSellableFormData.destListJson,
                        )}
                        mode="multiple"
                        options={destinationListOptions}
                    />
                </FormItem>
            </Form>
            <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                <Space>
                    <Button>Huỷ bỏ</Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            handlerSubmit(
                                templateSellableFormData,
                                handleSubmitForm,
                            )
                        }
                    >
                        {actionType === EActionType.CREATE
                            ? "Thêm mới"
                            : "Cập nhật"}
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawerTemplateSellable;

const getSelectedDestination = (destinations: IDestination[]) => {
    return destinations.map((des) => des.codeKey);
};
