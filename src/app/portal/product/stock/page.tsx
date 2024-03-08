"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Tabs, TabsProps, Form, DatePicker, Row, Col, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useMemo, useState } from "react";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../hooks/useCRUDStockInventory";
import StockFormContainer from "./_components/StockFormContainer";
import StockListContainer, {
    StockListContainerProps,
} from "./_components/StockListContainer";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryParams } from "@/models/management/core/stockInventory.interface";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { Status } from "@/models/management/common.interface";
import { RangePickerProps } from "antd/es/date-picker";
import {
    IInventory,
    InventoryQueryParams,
} from "@/models/management/core/inventory.interface";
const { RangePicker } = DatePicker;

type NestedKeyOf<T extends object> = {
    [Key in keyof T & (string | number)]: T[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
        : Key;
}[keyof T & (string | number)];

const StockPage = () => {
    const initInventoryQueryparams = new InventoryQueryParams(
        {
            isStock: true,
            status: Status.OK,
        },
        undefined,
        undefined,
    );

    const { data: inventoryResponse } = useGetInventoryListCoreQuery({
        queryParams: initInventoryQueryparams,
        enabled: true,
    });
    const { list: inventoryList } = inventoryResponse || {};
    const [stockQueryParams, setStockQueryParams] = useState(
        new StockInventoryQueryParams(undefined, 1, 10),
    );

    const { data: stockResponse, isLoading: isLoadingStockList } =
        useGetStockInventoryListCoreQuery({
            queryparams: stockQueryParams,
            enabled: !isUndefined(stockQueryParams.requestObject?.inventoryId),
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

    const onChangeValidDate: RangePickerProps["onChange"] = (
        dates,
        datesStr,
    ) => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                valid: datesStr[0],
                validTo: datesStr[1],
            },
        }));
    };
    const onChangeValidUseDate: RangePickerProps["onChange"] = (
        dates,
        datesStr,
    ) => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                start: datesStr[0],
                end: datesStr[1],
            },
        }));
    };
    const onChangePage: StockListContainerProps["onChangeStockPage"] = (
        page,
    ) => {
        setStockQueryParams((prev) => ({ ...prev, pageCurrent: page }));
    };
    const onChangeQueryParams = (
        key: NestedKeyOf<StockInventoryQueryParams>,
        value: StockInventoryQueryParams[keyof StockInventoryQueryParams],
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
                    onChangeStockPage={onChangePage}
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
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.inventoryId
                                                    }
                                                    options={inventoryOptions}
                                                    onChange={(value) =>
                                                        setStockQueryParams(
                                                            (prev) => ({
                                                                ...prev,
                                                                requestObject: {
                                                                    ...prev.requestObject,
                                                                    inventoryId:
                                                                        value,
                                                                },
                                                            }),
                                                        )
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem>
                                                <Select
                                                    value={
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.status ?? "All"
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
                                                        setStockQueryParams(
                                                            (prev) => ({
                                                                ...prev,
                                                                requestObject: {
                                                                    ...prev.requestObject,
                                                                    status:
                                                                        value ===
                                                                        "All"
                                                                            ? undefined
                                                                            : (value as Status),
                                                                },
                                                            }),
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

                                                        defaultValue: [
                                                            dayjs(
                                                                "00:00:00",
                                                                "HH:mm:ss",
                                                            ),
                                                            dayjs(
                                                                "23:59:59",
                                                                "HH:mm:ss",
                                                            ),
                                                        ],
                                                    }}
                                                    placeholder={[
                                                        "Mở bán từ",
                                                        "Mở bán đến",
                                                    ]}
                                                    format={DATE_TIME_FORMAT}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.valid
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .valid,
                                                                  DATE_TIME_FORMAT,
                                                              )
                                                            : null,
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.validTo
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .validTo,
                                                                  DATE_TIME_FORMAT,
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
                                                        defaultValue: [
                                                            dayjs(
                                                                "00:00:00",
                                                                "HH:mm:ss",
                                                            ),
                                                            dayjs(
                                                                "23:59:59",
                                                                "HH:mm:ss",
                                                            ),
                                                        ],
                                                    }}
                                                    placeholder={[
                                                        "Sử dụng từ",
                                                        "Sử dụng đến",
                                                    ]}
                                                    format={DATE_TIME_FORMAT}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.start
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .start,
                                                                  DATE_TIME_FORMAT,
                                                              )
                                                            : null,
                                                        stockQueryParams
                                                            ?.requestObject?.end
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .end,
                                                                  DATE_TIME_FORMAT,
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
