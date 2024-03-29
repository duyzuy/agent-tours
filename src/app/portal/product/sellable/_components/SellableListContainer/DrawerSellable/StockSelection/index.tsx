import React, { useState, useEffect } from "react";
import { Empty, Space, Tag, Select, SelectProps, Divider, Button } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import {
    DeleteOutlined,
    EyeOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { isEmpty, isUndefined } from "lodash";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import { miniStockColumns } from "./miniStockColumns";
import { formatDate } from "@/utils/date";
import ModalContent from "@/components/admin/ModalContent";
import ContentDetail from "@/components/admin/ContentDetail";
import { SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import { Status } from "@/models/management/common.interface";
import { IInventory } from "@/models/management/core/inventory.interface";
import {
    IStock,
    StockQueryParams,
} from "@/models/management/core/stock.interface";
import CustomTable from "@/components/admin/CustomTable";

export type StockSelectionProps = TableProps<IStock> & {
    inventories: IInventory[];
    validFrom?: string;
    validTo?: string;
    stocks?: SellableConfirmFormData["stocks"];
    stockSelectedList?: SellableConfirmFormData["extraStocks"];
    defaultQuantity: number;
    isLoading?: boolean;
    onSetStock?: (
        action: "add" | "remove",
        record: SellableConfirmFormData["stocks"][0]["stock"],
    ) => void;
    onRemove?: (record: IStock) => void;
};

function StockSelection({
    inventories,
    isLoading,
    onSetStock,
    onRemove,
    columns,
    stocks,
    defaultQuantity = 0,
    stockSelectedList,
    validTo,
    validFrom,
    ...restProps
}: StockSelectionProps) {
    const [showModalDetail, setShowModalDetail] = useState<{
        isShow: boolean;
        record?: IStock;
    }>({ isShow: false, record: undefined });

    const [stockQueryparams, setStockQueryParams] = useState(
        () =>
            new StockQueryParams(
                {
                    valid: validFrom,
                    validTo: validTo,
                    status: Status.OK,
                },
                1,
                5,
            ),
    );

    const { data: stockResponse, isLoading: isLoadingStock } =
        useGetStockInventoryListCoreQuery({
            queryparams: stockQueryparams,
            enabled: !isUndefined(stockQueryparams.requestObject?.inventoryId),
        });
    const {
        list: stockList,
        pageCurrent,
        pageSize,
        totalItems,
    } = stockResponse || {};

    const onChangeInventory: SelectProps<number, IInventory>["onChange"] = (
        value,
        option,
    ) => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: { ...prev.requestObject, inventoryId: value },
        }));
    };
    const onChangeStocks = (
        action: "add" | "remove",
        record: Partial<IStock>,
    ) => {
        onSetStock?.(action, record);
    };

    const onViewStock = (record: IStock) => {
        setShowModalDetail({ isShow: true, record: record });
    };
    const isSelecting = (record: IStock) => {
        return Boolean(
            (stocks || [])?.find((item) => item.stock.recId === record.recId),
        );
    };
    const getStockSelectedFromExtra = (record: IStock) => {
        return stockSelectedList?.find(
            (item) => item.stock.recId === record.recId,
        );
    };
    const mergeColumns: ColumnsType<IStock> = [
        ...miniStockColumns,
        {
            title: "Số lượng",
            dataIndex: "open",
            key: "open",
            width: 150,
            render: (_, record) => {
                let quantity = Number(record.open);
                const stockSelected = getStockSelectedFromExtra(record);
                if (!isUndefined(stockSelected)) {
                    quantity = quantity - Number(stockSelected.qty);
                }
                return (
                    <Tag
                        color={quantity < defaultQuantity ? "red" : "green"}
                        bordered={false}
                    >
                        {isSelecting(record)
                            ? quantity - defaultQuantity
                            : quantity}
                    </Tag>
                );
            },
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            width: 100,
            fixed: "right",
            render: (_, record) => {
                return (
                    <>
                        <Button
                            icon={<EyeOutlined style={{ color: "#0078ce" }} />}
                            size="small"
                            type="text"
                            onClick={() => onViewStock(record)}
                            shape="circle"
                        ></Button>
                        {isSelecting(record) ? (
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                danger
                                type="text"
                                onClick={() => onChangeStocks("remove", record)}
                                shape="circle"
                            ></Button>
                        ) : (
                            <Button
                                icon={
                                    <PlusCircleOutlined
                                        style={{ color: "green" }}
                                    />
                                }
                                size="small"
                                type="text"
                                onClick={() => onChangeStocks("add", record)}
                                shape="circle"
                            ></Button>
                        )}
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        setStockQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                valid: validFrom,
                validTo: validTo,
            },
        }));
    }, [validFrom, validTo]);
    return (
        <React.Fragment>
            <div className="list-select py-2">
                {isUndefined(stocks) || isEmpty(stocks) ? (
                    <Empty
                        description="Chưa có stock nào được chọn"
                        className="py-2"
                        imageStyle={{ width: 60, height: 60, margin: "auto" }}
                    />
                ) : (
                    <Space wrap className="mb-2">
                        {stocks?.map((item) => (
                            <Tag
                                key={item.stock.recId}
                                color="blue"
                                onClose={() =>
                                    onChangeStocks("remove", item.stock)
                                }
                                closable
                            >
                                {`#${item.stock.recId} - ${item.stock.code}  `}
                            </Tag>
                        ))}
                    </Space>
                )}
            </div>
            <Divider />
            <Select
                options={inventories}
                placeholder="Chọn inventory"
                fieldNames={{ label: "name", value: "recId" }}
                onChange={onChangeInventory}
                value={stockQueryparams?.requestObject?.inventoryId}
                className="w-full"
            />
            <div className="mb-3"></div>
            <CustomTable
                columns={mergeColumns}
                size="small"
                dataSource={
                    stockQueryparams?.requestObject?.inventoryId
                        ? stockList
                        : []
                }
                loading={isLoadingStock}
                pagination={{
                    hideOnSinglePage: true,
                    current: stockQueryparams?.requestObject?.inventoryId
                        ? pageCurrent
                        : 1,
                    pageSize: stockQueryparams?.requestObject?.inventoryId
                        ? pageSize
                        : 20,
                    total: stockQueryparams?.requestObject?.inventoryId
                        ? totalItems
                        : 0,
                    size: "small",
                    onChange: (page) =>
                        setStockQueryParams((prev) => ({
                            ...prev,
                            pageCurrent: page,
                        })),
                }}
                {...restProps}
            />
            <ModalContent
                title={`Chi tiết Stock`}
                descriptions={
                    showModalDetail.record ? (
                        <ContentDetail
                            contents={[
                                {
                                    label: "#ID",
                                    value: showModalDetail.record.recId.toString(),
                                },
                                {
                                    label: "Code",
                                    value: showModalDetail.record.code,
                                },
                                {
                                    label: "Loại Inventory",
                                    value: showModalDetail.record.inventoryType,
                                },
                                {
                                    label: "Loại stock",
                                    value: showModalDetail.record.type,
                                },
                                {
                                    label: "Mô tả",
                                    value: showModalDetail.record.description,
                                },
                                {
                                    label: "Khả dụng",
                                    value: showModalDetail.record.avaiable.toString(),
                                },
                                {
                                    label: "Đã sử dụng",
                                    value: showModalDetail.record.used.toString(),
                                },
                                {
                                    label: "Ngày mở bán",
                                    value: formatDate(
                                        showModalDetail.record.validFrom,
                                    ),
                                },
                                {
                                    label: "Ngày kết thúc mở bán",
                                    value: formatDate(
                                        showModalDetail.record.validTo,
                                    ),
                                },
                                {
                                    label: "Ngày sử dụng",
                                    value: formatDate(
                                        showModalDetail.record.startDate,
                                    ),
                                },
                                {
                                    label: "Ngày hết hạn sử dụng",
                                    value: formatDate(
                                        showModalDetail.record.endDate,
                                    ),
                                },
                            ]}
                        />
                    ) : null
                }
                isShowModal={showModalDetail.isShow}
                onClose={() =>
                    setShowModalDetail({ isShow: false, record: undefined })
                }
            />
        </React.Fragment>
    );
}
export default StockSelection;
