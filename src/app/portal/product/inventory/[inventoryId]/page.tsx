"use client";
import PageContainer from "@/components/admin/PageContainer";
import {
    Spin,
    Tabs,
    TabsProps,
    Form,
    DatePicker,
    Row,
    Col,
    Button,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import { useEffect, useState } from "react";
import { LINKS } from "@/constants/links.constant";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../../hooks/useCRUDStockInventory";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import StockFormContainer from "../_components/StockFormContainer";
import StockListContainer from "../_components/StockListContainer";
import { PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import { DATE_FORMAT } from "../_components/StockFormContainer";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const StockPage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );
    const stockQueryParams = new StockInventoryQueryparams(
        "",
        "",
        "",
        "",
        "",
        1,
        20,
    );
    const [stockFilterFormData, setStockFilterFormdata] =
        useState(stockQueryParams);
    const { data: stockList, isLoading: isLoadingStockList } =
        useGetStockInventoryListCoreQuery({
            inventoryId: params.inventoryId,
            queryparams: stockFilterFormData,
            enabled:
                !isUndefined(inventoryDetail) &&
                !isLoading &&
                inventoryDetail.isStock,
        });

    const { onCreate, onConfirm, onAdjustQuantity } = useCRUDStockInventory();

    const onChangeFilterForm = () => {};
    const onChangeValidate = () => {};
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách Stock",
            children: (
                <StockListContainer
                    items={stockList || []}
                    isLoading={isLoadingStockList}
                    onConfirm={onConfirm}
                    onAdjustQuantity={onAdjustQuantity}
                    render={() => {
                        return (
                            <div className="stock-list-filter pt-3">
                                <Form layout="vertical">
                                    {/* {productTypeList && (
                                    <FormItem label="Product type">
                                        {productTypeList.map((type) => (
                                            <Radio
                                                key={type}
                                                value={type}
                                                checked={
                                                    queryFilter.andType === type
                                                }
                                                onChange={() =>
                                                    onFilterProductType(type)
                                                }
                                            >
                                                {type}
                                            </Radio>
                                        ))}
                                    </FormItem>
                                )} */}
                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <FormItem>
                                                <RangePicker
                                                    showTime={{
                                                        format: "HH:mm",
                                                    }}
                                                    placeholder={[
                                                        "Valid from",
                                                        "Valid to",
                                                    ]}
                                                    format={DATE_FORMAT}
                                                    value={[
                                                        stockFilterFormData.valid
                                                            ? dayjs(
                                                                  stockFilterFormData.valid,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                        stockFilterFormData.validTo
                                                            ? dayjs(
                                                                  stockFilterFormData.validTo,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                    ]}
                                                    onChange={onChangeValidate}
                                                    className="w-full"
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem>
                                                <RangePicker
                                                    showTime={{
                                                        format: "HH:mm",
                                                    }}
                                                    placeholder={[
                                                        "Start",
                                                        "End",
                                                    ]}
                                                    format={DATE_FORMAT}
                                                    value={[
                                                        stockFilterFormData.valid
                                                            ? dayjs(
                                                                  stockFilterFormData.valid,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                        stockFilterFormData.validTo
                                                            ? dayjs(
                                                                  stockFilterFormData.validTo,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                    ]}
                                                    onChange={onChangeValidate}
                                                    className="w-full"
                                                />
                                            </FormItem>
                                        </Col>
                                        <FormItem>
                                            <Button type="primary">Lọc</Button>
                                        </FormItem>
                                    </Row>
                                </Form>
                            </div>
                        );
                    }}
                />
            ),
        },
        {
            key: "createStock",
            label: "Tạo Stock",
            children:
                (inventoryDetail && (
                    <StockFormContainer
                        inventoryId={inventoryDetail.recId}
                        inventoryType={inventoryDetail.type}
                        onSubmit={onCreate}
                    />
                )) ||
                null,
            icon: <PlusOutlined />,
        },
    ];

    useEffect(() => {
        if (
            (!inventoryDetail && !isLoading) ||
            (inventoryDetail && !inventoryDetail.isStock)
        ) {
            router.push(LINKS.ProductInventoryList);
        }
        if (inventoryDetail && !inventoryDetail.isStock) {
            message.warning(
                `Inventory "${inventoryDetail.name}" không quản lý Stock.`,
            );
        }
    }, [inventoryDetail, isLoading]);

    if (isLoading) {
        return <Spin size="large" />;
    }
    if (!inventoryDetail || (inventoryDetail && !inventoryDetail.isStock)) {
        return null;
    }
    return (
        <PageContainer
            name={inventoryDetail.name}
            onBack={() => router.push(LINKS.ProductInventoryList)}
            modelName="Quản lý stock"
            breadCrumItems={[
                { title: "Inventory", href: LINKS.ProductInventoryList },
                { title: inventoryDetail.name },
            ]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default StockPage;
