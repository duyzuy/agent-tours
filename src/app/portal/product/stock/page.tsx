"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Tabs, TabsProps, Form, Row, Col, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useMemo, useState } from "react";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "./modules/useCRUDStockInventory";
import StockFormContainer from "./_components/StockFormContainer";
import StockListContainer, {
    StockListContainerProps,
} from "./_components/StockListContainer";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import { DATE_TIME_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { Status } from "@/models/management/common.interface";
import { RangePickerProps } from "antd/es/date-picker";
import { InventoryQueryParams } from "@/models/management/core/inventory.interface";
import CustomRangePicker from "@/components/admin/CustomRangePicker";

type StockTabKeys = "stockList" | "createStock";
const StockPage = () => {
    const initInventoryQueryparams = new InventoryQueryParams(
        {
            isStock: true,
            status: Status.OK,
        },
        undefined,
        undefined,
    );
    const [stockTabKey, setStockTabKey] = useState<StockTabKeys>("stockList");
    const { data: inventoryResponse } = useGetInventoryListCoreQuery({
        queryParams: initInventoryQueryparams,
        enabled: true,
    });
    const { list: inventoryList } = inventoryResponse || {};
    const [stockQueryParams, setStockQueryParams] = useState(
        new StockQueryParams(undefined, 1, 10),
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

    const onChangeValidDate: RangePickerProps["onChange"] = (dates) => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                valid:
                    dates && dates[0]
                        ? dates[0].locale("en").format(DATE_TIME_FORMAT)
                        : undefined,
                validTo:
                    dates && dates[1]
                        ? dates[1].locale("en").format(DATE_TIME_FORMAT)
                        : undefined,
            },
        }));
    };
    const onChangeUsedDate: RangePickerProps["onChange"] = (dates) => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                start:
                    dates && dates[0]
                        ? dates[0].locale("en").format(DATE_TIME_FORMAT)
                        : undefined,
                end:
                    dates && dates[1]
                        ? dates[1].locale("en").format(DATE_TIME_FORMAT)
                        : undefined,
            },
        }));
    };
    const onChangePage: StockListContainerProps["onChangeStockPage"] = (
        page,
    ) => {
        setStockQueryParams((prev) => ({ ...prev, pageCurrent: page }));
    };
    const onCancel = () => {
        setStockTabKey("stockList");
    };
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách kho sản phẩm",
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
                                                    placeholder="Chọn nhóm kho"
                                                    value={
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.inventoryId
                                                    }
                                                    fieldNames={{
                                                        value: "recId",
                                                        label: "name",
                                                    }}
                                                    options={inventoryList}
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
                                                <CustomRangePicker
                                                    placeholder={[
                                                        "Mở bán từ",
                                                        "Mở bán đến",
                                                    ]}
                                                    format={"DD/MM/YYYY"}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.valid
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .valid,
                                                                  {
                                                                      format: DATE_TIME_FORMAT,
                                                                  },
                                                              )
                                                            : null,
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.validTo
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .validTo,
                                                                  {
                                                                      format: DATE_TIME_FORMAT,
                                                                  },
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
                                                <CustomRangePicker
                                                    placeholder={[
                                                        "Sử dụng từ",
                                                        "Sử dụng đến",
                                                    ]}
                                                    format={"DD/MM/YYYY"}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.start
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .start,
                                                                  {
                                                                      format: DATE_TIME_FORMAT,
                                                                  },
                                                              )
                                                            : null,
                                                        stockQueryParams
                                                            ?.requestObject?.end
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      .requestObject
                                                                      .end,
                                                                  {
                                                                      format: DATE_TIME_FORMAT,
                                                                  },
                                                              )
                                                            : null,
                                                    ]}
                                                    onChange={onChangeUsedDate}
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
            label: "Tạo kho sản phẩm",
            children: (
                <StockFormContainer
                    inventoryList={inventoryList}
                    onSubmit={onCreate}
                    onCancel={onCancel}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];

    return (
        <PageContainer
            name={"Kho sản phẩm"}
            modelName="Kho sản phẩm"
            breadCrumItems={[{ title: "Kho sản phẩm" }]}
            hideAddButton
        >
            <Tabs
                activeKey={stockTabKey}
                items={tabItems}
                destroyInactiveTabPane={true}
                onChange={(tab) => setStockTabKey(tab as StockTabKeys)}
            />
        </PageContainer>
    );
};
export default StockPage;
