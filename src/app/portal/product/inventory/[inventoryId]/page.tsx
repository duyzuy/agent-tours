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
    Select,
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
import StockListContainer, {
    StockListContainerProps,
} from "../_components/StockListContainer";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import { DATE_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { Status } from "@/models/management/common.interface";
import { RangePickerProps } from "antd/es/date-picker";
const { RangePicker } = DatePicker;
const StockPage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );

    const [stockQueryParams, setStockFilterFormdata] = useState(
        new StockInventoryQueryparams(
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            1,
            10,
            undefined,
        ),
    );

    const { data: stockResponse, isLoading: isLoadingStockList } =
        useGetStockInventoryListCoreQuery({
            inventoryId: params.inventoryId,
            queryparams: stockQueryParams,
            enabled:
                !isUndefined(inventoryDetail) &&
                !isLoading &&
                inventoryDetail.isStock,
        });
    const {
        list: stockList,
        pageSize,
        pageCurrent,
        totalItems,
    } = stockResponse || {};
    const { onCreate, onConfirm, onAdjustQuantity } = useCRUDStockInventory();

    const onChangeFilterForm = (
        key: keyof StockInventoryQueryparams,
        value: StockInventoryQueryparams[keyof StockInventoryQueryparams],
    ) => {
        if (key === "status" && typeof value === "string") {
            if (value === "All") {
                setStockFilterFormdata((prev) => ({
                    ...prev,
                    status: undefined,
                }));
            } else {
                setStockFilterFormdata((prev) => ({
                    ...prev,
                    status: value as Status,
                }));
            }
        }
    };
    const onChangeValidDate: RangePickerProps["onChange"] = (
        dates,
        datesStr,
    ) => {
        setStockFilterFormdata((prev) => ({
            ...prev,
            valid: datesStr[0],
            validTo: datesStr[1],
        }));
    };
    const onChangeValidUseDate: RangePickerProps["onChange"] = (
        dates,
        datesStr,
    ) => {
        setStockFilterFormdata((prev) => ({
            ...prev,
            start: datesStr[0],
            end: datesStr[1],
        }));
    };
    const onChangeStockPage: StockListContainerProps["onChangeStockPage"] = (
        page,
    ) => {
        setStockFilterFormdata((prev) => ({ ...prev, pageCurrent: page }));
    };
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách Stock",
            children: (
                <StockListContainer
                    items={stockList || []}
                    pageSize={pageSize || 10}
                    pageCurrent={pageCurrent || 1}
                    totalItems={totalItems || 0}
                    isLoading={isLoadingStockList}
                    onConfirm={onConfirm}
                    onAdjustQuantity={onAdjustQuantity}
                    onChangeStockPage={onChangeStockPage}
                    render={() => {
                        return (
                            <div className="stock-list-filter pt-3">
                                <Form layout="vertical">
                                    <Row gutter={12}>
                                        <Col>
                                            <FormItem>
                                                <FilterOutlined /> Lọc
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem>
                                                <Select
                                                    value={
                                                        stockQueryParams.status ??
                                                        "All"
                                                    }
                                                    options={[
                                                        {
                                                            label: "Tất cả trạng thái",
                                                            value: "All",
                                                        },
                                                        {
                                                            label: "Đã duyệt",
                                                            value: Status.OK,
                                                        },
                                                        {
                                                            label: "Chờ duyệt",
                                                            value: Status.QQ,
                                                        },
                                                    ]}
                                                    onChange={(value) =>
                                                        onChangeFilterForm(
                                                            "status",
                                                            value,
                                                        )
                                                    }
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
                                                        "Valid from",
                                                        "Valid to",
                                                    ]}
                                                    format={DATE_FORMAT}
                                                    value={[
                                                        stockQueryParams.valid
                                                            ? dayjs(
                                                                  stockQueryParams.valid,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                        stockQueryParams.validTo
                                                            ? dayjs(
                                                                  stockQueryParams.validTo,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                    ]}
                                                    onChange={onChangeValidDate}
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
                                                        stockQueryParams.start
                                                            ? dayjs(
                                                                  stockQueryParams.start,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                        stockQueryParams.end
                                                            ? dayjs(
                                                                  stockQueryParams.end,
                                                                  DATE_FORMAT,
                                                              )
                                                            : null,
                                                    ]}
                                                    onChange={
                                                        onChangeValidUseDate
                                                    }
                                                    className="w-full"
                                                />
                                            </FormItem>
                                        </Col>
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
