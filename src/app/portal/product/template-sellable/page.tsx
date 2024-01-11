"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
    Checkbox,
    Space,
    Button,
} from "antd";

import FormItem from "@/components/base/FormItem";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";

import { SelectProps } from "antd/es/select";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import { TemplateSellableFormData } from "@/models/management/core/templateSellable.interface";
import { Status } from "@/models/management/common.interface";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { IDestination } from "@/models/management/region.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { CMS_TEMPLATES } from "@/constants/cmsTemplate.constant";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import useCRUDTemplateSellable from "../hooks/useCRUDTemplateSellable";
type TDestinationOption = {
    label: string;
    value: string;
    destination: IDestination;
};
const SellTemplatePage = () => {
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

    const { onCreate, errors } = useCRUDTemplateSellable();

    console.log(errors);
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
        setTemplateSellableFormData((prev) => ({
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
    }, []);

    return (
        <PageContainer
            name="Template Sell able"
            modelName="Template Sell able"
            breadCrumItems={[{ title: "Template Sell able" }]}
            hideAddButton
            // onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        >
            <Form
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ flex: "1,1,0" }}
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
                <FormItem
                    wrapperCol={{
                        span: 18,
                        offset: 6,
                    }}
                >
                    <Space>
                        <Button>Huỷ bỏ</Button>
                        <Button
                            type="primary"
                            onClick={() => onCreate(templateSellableFormData)}
                        >
                            Tạo template
                        </Button>
                    </Space>
                </FormItem>
            </Form>
        </PageContainer>
    );
};
export default SellTemplatePage;

const getSelectedDestination = (destinations: IDestination[]) => {
    return destinations.map((des) => des.codeKey);
};
