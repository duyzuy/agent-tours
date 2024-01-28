import React, { useState, useMemo, FunctionComponent } from "react";
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
import { ColumnsType, TableProps } from "antd/es/table";
import {
    DeleteOutlined,
    EyeOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { isArray, isEmpty, isUndefined } from "lodash";
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
    StockInventoryQueryparams,
} from "@/models/management/core/stockInventory.interface";
import CustomTable from "@/components/admin/CustomTable";

export type StockSelectionProps = TableProps<IStock> & {
    inventories: IInventory[];
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
interface IInventoryOption {
    label: string;
    value: number;
    data: IInventory | undefined;
}
function StockSelection(props: StockSelectionProps) {
    const {
        inventories,
        isLoading,
        onSetStock,
        onRemove,
        columns,
        stocks,
        defaultQuantity = 0,
        stockSelectedList,
        ...restProps
    } = props;

    const [inventory, setInventory] = useState<IInventory>();
    const [showModalDetail, setShowModalDetail] = useState<{
        isShow: boolean;
        record?: IStock;
    }>({ isShow: false, record: undefined });
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
    const [stockQueryparams, setStockQueryParams] = useState(queryParams);
    const { data: stockResponse, isLoading: isLoadingStock } =
        useGetStockInventoryListCoreQuery({
            queryparams: stockQueryparams,
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
            title: "open",
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
                            <Tag key={item.stock.recId} color="blue">
                                {`#${item.stock.recId} - ${item.stock.code}  `}
                            </Tag>
                        ))}
                    </Space>
                )}
            </div>
            <Divider />
            <Select
                options={inventoryOptions}
                placeholder="Chọn inventory"
                onChange={onChangeInventory}
                value={inventory?.recId}
                className="w-full"
            />
            <div className="mb-3"></div>
            <CustomTable
                columns={mergeColumns}
                size="small"
                dataSource={inventory ? stockList : []}
                loading={isLoadingStock}
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
