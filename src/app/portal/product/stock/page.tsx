"use client";
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
import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useMemo, useState } from "react";
import { SelectProps } from "antd/es/select";
import {
    IInventory,
    IInventoryQueryParams,
} from "@/models/management/core/inventory.interface";
import { Status } from "@/models/management/common.interface";
import { StockInventoryFormData } from "@/models/management/core/stockInventory.interface";
const { RangePicker } = DatePicker;
const StockPage = () => {
    const stockFormData = new StockInventoryFormData(
        undefined,
        "",
        "",
        "",
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        0,
        [],
    );
    const {
        data: stockInventoryType,
        isLoading: isLoadingStockType,
        refetch,
    } = useGetStockInventoryTypeCoreQuery("HOTEL");
    const ivnentoryQueryParams = new IInventoryQueryParams(
        undefined,
        true,
        1,
        10,
        Status.OK,
    );
    const { data: inventoryResponse, isLoading } = useGetInventoryListCoreQuery(
        { queryParams: ivnentoryQueryParams, enabled: true },
    );
    const { list: inventoryList } = inventoryResponse || {};

    console.log(stockInventoryType);
    const stockInventoryTypeOptions = useMemo(() => {
        let options: SelectProps["options"] = [
            { label: "Chọn loại Stock", value: "" },
        ];

        if (stockInventoryType) {
            stockInventoryType.forEach((item) => {
                options = [...(options || []), { value: item, label: item }];
            });
        }
        return options;
    }, [stockInventoryType]);

    const onSelectInventory: SelectProps["onChange"] = (value, option) => {
        console.log(value, option);
    };
    const inventoryOptions = useMemo(() => {
        return inventoryList?.reduce<
            { label: string; value: number; data: IInventory }[]
        >((acc, inv) => {
            return [
                ...acc,
                {
                    label: `${inv.name} - ${inv.code}`,
                    value: inv.recId,
                    data: inv,
                },
            ];
        }, []);
    }, [inventoryList]);
    return (
        <PageContainer
            name="Stock"
            modelName="Stock"
            breadCrumItems={[{ title: "Stock" }]}
            hideAddButton
            // onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        >
            <Form
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ flex: 1 }}
                colon={false}
                labelWrap
                className="max-w-4xl"
            >
                <FormItem label="Chọn inventory" required>
                    <Select
                        defaultValue=""
                        onChange={onSelectInventory}
                        options={inventoryOptions}
                    />
                </FormItem>
                <FormItem label="Type" required>
                    <Select
                        loading={isLoadingStockType}
                        defaultValue=""
                        onChange={() => {}}
                        options={stockInventoryTypeOptions}
                    />
                </FormItem>
                <FormItem label="Mô tả" required>
                    <Input.TextArea rows={4}></Input.TextArea>
                </FormItem>
                <FormItem label="Số lượng">
                    <Input placeholder="Số lượng" type="number" />
                </FormItem>
                <FormItem label="Valid date" required>
                    <Row gutter={16}>
                        <Col span={12}>
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                placeholder="From"
                                format={"DDMMMYY HH:mm"}
                                onChange={() => {}}
                                onOk={() => {}}
                                className="w-full"
                            />
                        </Col>
                        <Col span={12}>
                            <DatePicker
                                placeholder="To"
                                showTime={{ format: "HH:mm" }}
                                format={"DDMMMYY HH:mm"}
                                onChange={() => {}}
                                onOk={() => {}}
                                className="w-full"
                            />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="Ngày bắt đầu và kết thúc" required>
                    <Row gutter={16}>
                        <Col span={12}>
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                placeholder="Start date"
                                format={"DDMMMYY HH:mm"}
                                onChange={() => {}}
                                onOk={() => {}}
                                className="w-full"
                            />
                        </Col>
                        <Col span={12}>
                            <DatePicker
                                placeholder="End date"
                                showTime={{ format: "HH:mm" }}
                                format={"DDMMMYY HH:mm"}
                                onChange={() => {}}
                                onOk={() => {}}
                                className="w-full"
                            />
                        </Col>
                    </Row>
                </FormItem>

                <FormItem
                    wrapperCol={{
                        span: 18,
                        offset: 6,
                    }}
                >
                    <Space>
                        <Button>Random</Button>
                        <Button type="primary">Add 1</Button>
                    </Space>
                </FormItem>
                <hr className="mb-6" />
                <FormItem label="From valid to" required>
                    <DatePicker
                        placeholder="From valid to"
                        showTime={{ format: "HH:mm" }}
                        format={"DDMMMYY HH:mm"}
                        onChange={() => {}}
                        onOk={() => {}}
                    />
                </FormItem>

                <FormItem
                    wrapperCol={{
                        span: 18,
                        offset: 6,
                    }}
                >
                    <Space>
                        {[
                            "Every",
                            "CN",
                            "T2",
                            "T3",
                            "T4",
                            "T5",
                            "T6",
                            "T7",
                        ].map((day) => (
                            <Checkbox key={day}>{day}</Checkbox>
                        ))}
                    </Space>
                </FormItem>
                <FormItem label="Lặp lại sau" required>
                    <Input type="number" />
                </FormItem>
                <FormItem label="Exclusive">
                    <DatePicker
                        placeholder="End date"
                        showTime={{ format: "HH:mm" }}
                        format={"DDMMMYY HH:mm"}
                        onChange={() => {}}
                        onOk={() => {}}
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
                        <Button type="primary">Add Serial</Button>
                    </Space>
                </FormItem>
            </Form>
        </PageContainer>
    );
};
export default StockPage;
