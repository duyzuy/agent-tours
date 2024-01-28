import React, { useCallback, useState, useMemo } from "react";
import {
    Empty,
    Space,
    Table,
    Tag,
    Select,
    SelectProps,
    Divider,
    Button,
} from "antd";
import {
    PlusCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { ColumnsType, TableProps } from "antd/es/table";
import { IStock } from "@/models/management/core/stockInventory.interface";
import { isArray, isEmpty, isUndefined } from "lodash";
import { IInventory } from "@/models/management/core/inventory.interface";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";

import ModalContent from "@/components/admin/ModalContent";
import ContentDetail from "@/components/admin/ContentDetail";
import { formatDate } from "@/utils/date";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import { Status } from "@/models/management/common.interface";
import StockExtraList, { StockExtraListProps } from "./StockExtraList";
import { SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import CustomTable from "@/components/admin/CustomTable";

type StockExtraItemType = SellableConfirmFormData["extraStocks"][0];
export type StockExtraSelectionProps = TableProps<IStock> & {
    inventories: IInventory[];
    stocks?: StockExtraItemType[];
    stockSelectedList?: StockExtraItemType[];
    isLoading?: boolean;
    onSetStock?: (
        action: "add" | "remove",
        record: StockExtraItemType["stock"],
    ) => void;
    onSaveQuantity?: StockExtraListProps["onSave"];
};
interface IInventoryOption {
    label: string;
    value: number;
    data: IInventory | undefined;
}
function StockExtraSelection(props: StockExtraSelectionProps) {
    const {
        inventories,
        isLoading,
        onSetStock,
        onSaveQuantity,
        columns,
        stocks,
        stockSelectedList,
        ...restProps
    } = props;
    const queryParams = new StockInventoryQueryparams(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        5,
        Status.OK,
    );
    const [inventory, setInventory] = useState<IInventory>();
    const [stockQueryParams, setStockQueryParams] = useState(queryParams);
    const [showModalDetail, setShowModalDetail] = useState<{
        isShow: boolean;
        record?: IStock;
    }>({ isShow: false, record: undefined });

    const { data: stockResponse, isLoading: isLoadingStock } =
        useGetStockInventoryListCoreQuery({
            queryparams: stockQueryParams,
            enabled: !isUndefined(inventory),
        });
    const {
        list: stockList,
        pageCurrent,
        pageSize,
        totalItems,
    } = stockResponse || {};
    const inventoryOptions = useMemo(() => {
        return inventories.reduce<IInventoryOption[]>((acc, inv) => {
            return [...acc, { label: inv.name, value: inv.recId, data: inv }];
        }, []);
    }, [inventories]);

    const onViewStock = (record: IStock) => {
        setShowModalDetail({ isShow: true, record: record });
    };

    const onChangeInventory: SelectProps<
        number,
        IInventoryOption
    >["onChange"] = (value, option) => {
        if (!isUndefined(option) && !isArray(option)) {
            setInventory(option.data);
        }
    };
    const onChangeStocks = (
        action: "add" | "remove",
        record: Partial<IStock>,
    ) => {
        onSetStock?.(action, record);
    };

    const isSelecting = (record: IStock) => {
        return Boolean(
            (stocks || [])?.find((item) => item.stock.recId === record.recId),
        );
    };
    const getStockSelected = (record: IStock) => {
        return (stockSelectedList || [])?.find(
            (item) => item.stock.recId === record.recId,
        );
    };
    const getStockExtraSelecting = (record: IStock) => {
        return (stocks || [])?.find(
            (item) => item.stock.recId === record.recId,
        );
    };
    const mergeColumns: ColumnsType<IStock> = [
        {
            title: "#ID",
            dataIndex: "recId",
            width: 80,
            render: (_, record) => {
                return record.recId;
            },
        },
        {
            title: "Tên",
            dataIndex: "code",
            width: 250,
            render: (_, record) => {
                return (
                    <>
                        <p>{record.code}</p>
                        <p className="text-xs text-gray-500">
                            {record.description}
                        </p>
                    </>
                );
            },
        },
        {
            title: "Open",
            dataIndex: "open",
            key: "open",
            width: 150,
            render: (_, record) => {
                const stockSelected = getStockSelected(record);
                const stockSelecting = getStockExtraSelecting(record);

                let color = "green";

                let openQuantity = Number(record.open);
                if (stockSelected) {
                    openQuantity = openQuantity - Number(stockSelected.qty);
                }
                if (openQuantity <= 0) {
                    color = "red";
                }

                if (stockSelecting) {
                    openQuantity = openQuantity - stockSelecting.qty;
                }
                return (
                    <Tag bordered={false} color={color}>
                        {openQuantity}
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
                            title="Xem chi tiết"
                            onClick={() => onViewStock(record)}
                            shape="circle"
                        ></Button>
                        {isSelecting(record) ? (
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                danger
                                title="Xoá"
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
                                title="Thêm"
                                onClick={() => onChangeStocks("add", record)}
                                shape="circle"
                                className="text-red-500"
                            ></Button>
                        )}
                    </>
                );
            },
        },
    ];

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
                    <StockExtraList
                        stocks={stocks}
                        onSave={onSaveQuantity}
                        onDelete={(item) =>
                            onChangeStocks("remove", item.stock)
                        }
                    />
                )}
            </div>
            <Divider />
            <Select
                options={inventoryOptions}
                placeholder="Chọn inventory"
                onChange={onChangeInventory}
                className="w-full"
            />
            <div className="mb-3"></div>
            <CustomTable
                columns={mergeColumns}
                dataSource={inventory ? stockList : []}
                loading={isLoadingStock}
                size="small"
                pagination={{
                    hideOnSinglePage: true,
                    current: inventory ? pageCurrent : 1,
                    pageSize: inventory ? pageSize : 20,
                    total: inventory ? totalItems : 0,
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
                isShowModal={showModalDetail.isShow}
                onClose={() =>
                    setShowModalDetail({ isShow: false, record: undefined })
                }
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
            />
        </React.Fragment>
    );
}
export default StockExtraSelection;
