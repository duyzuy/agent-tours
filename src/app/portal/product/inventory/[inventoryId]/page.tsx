"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin, Tabs, TabsProps, Form, Row, Col, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import PageContainer from "@/components/admin/PageContainer";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../../stock/modules/useCRUDStockInventory";
import useMessage from "@/hooks/useMessage";
import StockFormContainer from "../../stock/_components/StockFormContainer";
import StockListContainer from "../../stock/_components/StockListContainer";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import { DATE_TIME_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { Status } from "@/models/management/common.interface";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import { LINKS } from "@/constants/links.constant";

const StockPage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );

    const [stockQueryParams, setStockFilterFormdata] = useState(
        new StockQueryParams(undefined, 1, 10),
    );

    const { data: stockResponse, isLoading: isLoadingStockList } =
        useGetStockInventoryListCoreQuery({
            queryparams: {
                ...stockQueryParams,
                requestObject: {
                    ...stockQueryParams.requestObject,
                    inventoryId: params.inventoryId,
                },
            },
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

    const onChangeStatus = (value: string) => {
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
    };
    const onChangeValidDate: RangePickerProps["onChange"] = (dates) => {
        setStockFilterFormdata((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,

                valid:
                    (dates &&
                        dates[0]?.locale("en").format(DATE_TIME_FORMAT)) ||
                    undefined,
                validTo:
                    (dates &&
                        dates[1]?.locale("en").format(DATE_TIME_FORMAT)) ||
                    undefined,
            },
        }));
    };
    const onChangeUsedDate: RangePickerProps["onChange"] = (dates) => {
        setStockFilterFormdata((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                start:
                    (dates &&
                        dates[0]?.locale("en").format(DATE_TIME_FORMAT)) ||
                    undefined,
                end:
                    (dates &&
                        dates[1]?.locale("en").format(DATE_TIME_FORMAT)) ||
                    undefined,
            },
        }));
    };
    const onCancel = useCallback(() => {}, []);
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách kho",
            children: (
                <StockListContainer
                    items={stockList || []}
                    pageSize={pageSize || 10}
                    pageCurrent={pageCurrent || 1}
                    totalItems={totalItems || 0}
                    isLoading={isLoadingStockList}
                    onConfirm={onConfirm}
                    onAdjustQuantity={onAdjustQuantity}
                    onChangeStockPage={(page) =>
                        setStockFilterFormdata((prev) => ({
                            ...prev,
                            pageCurrent: page,
                        }))
                    }
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
                                                        onChangeStatus(value)
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem>
                                                <CustomRangePicker
                                                    placeholder={[
                                                        "Ngày bán bắt đầu",
                                                        "Ngày bán kết thúc",
                                                    ]}
                                                    format={"DD/MM/YYYY"}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.valid
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      ?.requestObject
                                                                      ?.valid,
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
                                                                      ?.requestObject
                                                                      ?.validTo,
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
                                                        "Bắt đầu ngày sử dụng",
                                                        "Kết thúc ngày sử dụng",
                                                    ]}
                                                    format={"DD/MM/YYYY"}
                                                    value={[
                                                        stockQueryParams
                                                            ?.requestObject
                                                            ?.start
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      ?.requestObject
                                                                      ?.start,
                                                                  {
                                                                      format: DATE_TIME_FORMAT,
                                                                  },
                                                              )
                                                            : null,
                                                        stockQueryParams
                                                            ?.requestObject?.end
                                                            ? dayjs(
                                                                  stockQueryParams
                                                                      ?.requestObject
                                                                      ?.end,
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
            label: "Tạo số lượng kho",
            children: (
                <StockFormContainer
                    curInventory={inventoryDetail}
                    onSubmit={onCreate}
                    onCancel={onCancel}
                />
            ),
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
                { title: "Nhóm kho", href: LINKS.ProductInventoryList },
                { title: inventoryDetail.name },
            ]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default StockPage;
