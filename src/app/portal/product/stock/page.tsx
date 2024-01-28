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
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useMemo, useState } from "react";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../hooks/useCRUDStockInventory";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import StockFormContainer from "./_components/StockFormContainer";
import StockListContainer, {
    StockListContainerProps,
} from "./_components/StockListContainer";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import { DATE_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { Status } from "@/models/management/common.interface";
import { RangePickerProps } from "antd/es/date-picker";
import {
    IInventory,
    IInventoryQueryParams,
} from "@/models/management/core/inventory.interface";
const { RangePicker } = DatePicker;
const StockPage = () => {
    const router = useRouter();
    const message = useMessage();
    const initInventoryQueryparams = new IInventoryQueryParams(
        "",
        true,
        undefined,
        undefined,
        Status.OK,
    );

    const { data: inventoryResponse } = useGetInventoryListCoreQuery({
        queryParams: initInventoryQueryparams,
        enabled: true,
    });
    const { list: inventoryList } = inventoryResponse || {};
    const [stockQueryParams, setStockQueryParams] = useState(
        new StockInventoryQueryparams(
            undefined,
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
            queryparams: stockQueryParams,
            enabled: !isUndefined(stockQueryParams.inventoryId),
        });
    const {
        list: stockList,
        pageSize,
        pageCurrent,
        totalItems,
    } = stockResponse || {};
    const { onCreate, onConfirm, onAdjustQuantity } = useCRUDStockInventory();

    const inventoryOptions = useMemo(() => {
        return inventoryList?.reduce<
            { value: number; label: string; data: IInventory }[]
        >((acc, inv) => {
            return [...acc, { value: inv.recId, label: inv.name, data: inv }];
        }, []);
    }, [inventoryResponse]);
    const onChangeFilterForm = (
        key: keyof StockInventoryQueryparams,
        value: StockInventoryQueryparams[keyof StockInventoryQueryparams],
    ) => {
        if (key === "status" && typeof value === "string") {
            if (value === "All") {
                setStockQueryParams((prev) => ({
                    ...prev,
                    status: undefined,
                }));
            } else {
                setStockQueryParams((prev) => ({
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
        setStockQueryParams((prev) => ({
            ...prev,
            valid: datesStr[0],
            validTo: datesStr[1],
        }));
    };
    const onChangeValidUseDate: RangePickerProps["onChange"] = (
        dates,
        datesStr,
    ) => {
        setStockQueryParams((prev) => ({
            ...prev,
            start: datesStr[0],
            end: datesStr[1],
        }));
    };
    const onChangeStockPage: StockListContainerProps["onChangeStockPage"] = (
        page,
    ) => {
        setStockQueryParams((prev) => ({ ...prev, pageCurrent: page }));
    };
    const onChangeQueryParams = (
        key: keyof StockInventoryQueryparams,
        value: StockInventoryQueryparams[keyof StockInventoryQueryparams],
    ) => {
        setStockQueryParams((prev) => ({
            ...prev,
            [key]: value,
        }));
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
                                                    placeholder="Chọn inventory"
                                                    value={
                                                        stockQueryParams.inventoryId
                                                    }
                                                    options={inventoryOptions}
                                                    onChange={(value) =>
                                                        onChangeQueryParams(
                                                            "inventoryId",
                                                            value,
                                                        )
                                                    }
                                                />
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
            children: (
                <StockFormContainer
                    inventoryList={inventoryList}
                    onSubmit={onCreate}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];

    return (
        <PageContainer
            name={"Stocks"}
            modelName="Quản lý stock"
            breadCrumItems={[{ title: "stocks" }]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default StockPage;
