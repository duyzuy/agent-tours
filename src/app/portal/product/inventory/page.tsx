"use client";
import PageContainer from "@/components/admin/PageContainer";
import FormItem from "@/components/base/FormItem";
import {
    IInventoryPayload,
    InventoryFormData,
} from "@/models/management/inventory.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { Checkbox, Form, Input, Radio, Space, Button, Spin } from "antd";
import { useState } from "react";
const InventoryPage = () => {
    const { data: inventoryTypeList, isLoading: isLoadingInventoryType } =
        useGetInventoryTypeListCoreQuery();
    const { data: productTypeList, isLoading: isLoadingProductTpe } =
        useGetProductTypeListCoreQuery();

    const initFormData = new InventoryFormData(
        "",
        "",
        "",
        undefined,
        undefined,
    );
    const [formData, setFormData] = useState(initFormData);

    const onChangeFormData = (
        key: keyof IInventoryPayload,
        value: string | boolean,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmitFormData = () => {
        console.log(formData);
    };
    return (
        <PageContainer
            name="Inventory"
            modelName="Inventory"
            breadCrumItems={[{ title: "Inventory" }]}
            hideAddButton={true}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                className=" max-w-4xl"
            >
                <FormItem label="Tên inventory" required>
                    <Input
                        placeholder="Tên"
                        value={formData.name}
                        onChange={(ev) =>
                            onChangeFormData("name", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Code inventory" required>
                    <Input
                        placeholder="Code"
                        value={formData.code}
                        onChange={(ev) =>
                            onChangeFormData("code", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Loại Inventory" required>
                    {isLoadingInventoryType ? (
                        <Spin />
                    ) : (
                        <Radio.Group
                            onChange={(ev) =>
                                onChangeFormData("type", ev.target.value)
                            }
                            value={formData.type}
                        >
                            <Space wrap>
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
                <FormItem label="Loại sản phẩm" required>
                    {isLoadingProductTpe ? (
                        <Spin />
                    ) : (
                        <Radio.Group
                            onChange={(ev) =>
                                onChangeFormData("productType", ev.target.value)
                            }
                            value={formData.productType}
                        >
                            <Space direction="horizontal" wrap>
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
                <FormItem label="Quản lý stock">
                    <Radio.Group
                        onChange={(ev) =>
                            onChangeFormData("isStock", ev.target.value)
                        }
                        value={formData.isStock}
                    >
                        <Space direction="horizontal" wrap>
                            <Radio value={true}>Có</Radio>
                            <Radio value={false}>Không</Radio>
                        </Space>
                    </Radio.Group>
                </FormItem>
                <FormItem
                    wrapperCol={{
                        span: 20,
                        offset: 4,
                    }}
                >
                    <Space>
                        <Button type="default">Huỷ bỏ</Button>
                        <Button
                            type="primary"
                            onClick={handleSubmitFormData}
                            disabled={false}
                        >
                            Gửi duyệt
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSubmitFormData}
                            disabled={false}
                        >
                            Thêm mới và kích hoạt
                        </Button>
                    </Space>
                </FormItem>
            </Form>
        </PageContainer>
    );
};
export default InventoryPage;
