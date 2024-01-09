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
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { useEffect, useMemo, useState } from "react";
import { SelectProps } from "antd/es/select";
const { RangePicker } = DatePicker;
const StockPage = () => {
    const [type, setType] = useState("");

    const { data: inventoryTypeList } = useGetInventoryTypeListCoreQuery({
        enabled: true,
    });

    const {
        data: stockInventoryType,
        isLoading: isLoadingStockType,
        refetch,
    } = useGetStockInventoryTypeCoreQuery(type);

    const inventoryTypeOptions: SelectProps["options"] = useMemo(() => {
        let options: SelectProps["options"] = [
            { label: "Chọn loại inventory", value: "" },
        ];
        if (inventoryTypeList) {
            inventoryTypeList.forEach((item) => {
                options = [...(options || []), { value: item, label: item }];
            });
        }
        return options;
    }, [inventoryTypeList]);

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
    console.log(stockInventoryType, type);

    // useEffect(() => {
    //     refetch();
    // }, [type]);
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
                <FormItem label="Inventory type" required>
                    <Select
                        defaultValue=""
                        onChange={(value) => setType(value)}
                        options={inventoryTypeOptions}
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
