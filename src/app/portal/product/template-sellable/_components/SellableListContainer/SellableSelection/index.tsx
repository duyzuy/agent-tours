import React, { useState, useMemo } from "react";
import { Empty, Table, Tag, Select, SelectProps, Divider, Button } from "antd";
import {
    PlusCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { ColumnsType, TableProps } from "antd/es/table";
import { IStock } from "@/models/management/core/stockInventory.interface";
import { isArray, isEmpty, isUndefined } from "lodash";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";

import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import { useGetSellableListCoreQuery } from "@/queries/core/Sellable";
import SellableList, { SellableListProps } from "./SellableList";
import {
    ISellable,
    SellableConfirmFormData,
    SellableQueryParams,
} from "@/models/management/core/sellable.interface";
import {
    ITemplateSellable,
    TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";
import ContentDetail from "@/components/admin/ContentDetail";
import ModalContent from "@/components/admin/ModalContent";
type SellableItemType = SellableConfirmFormData["otherSellables"][0];
export type SellableSelectionProps = TableProps<ISellable> & {
    sellableList?: SellableItemType[];
    onSetSellable?: (
        action: "add" | "remove",
        record: SellableItemType["sellable"],
    ) => void;
    onSaveQuantity?: SellableListProps["onSave"];
};
interface ITemplateOption {
    label: string;
    value: number;
    data: ITemplateSellable | undefined;
}
function StockExtraSelection(props: SellableSelectionProps) {
    const {
        sellableList,
        onSetSellable,
        onSaveQuantity,
        columns,
        ...restProps
    } = props;

    const templateQueryParams = new TemplateSellableQueryParams(
        undefined,
        "EXTRA",
        undefined,
        undefined,
        1,
        10,
        Status.OK,
    );

    const [template, setTemplate] = useState<ITemplateSellable>();
    const sellableQueryParams = new SellableQueryParams(
        template?.recId,
        undefined,
        undefined,
        1,
        10,
        Status.OK,
    );
    const [showModalDetail, setShowModalDetail] = useState<{
        isShow: boolean;
        record?: ISellable;
    }>({ isShow: false, record: undefined });

    const { data: templateResponse, isLoading: isLoadingTemplate } =
        useGetTemplateSellableListCoreQuery({
            queryParams: templateQueryParams,
            enabled: true,
        });

    const { data: sellableResponse, isLoading: isLoadingSellable } =
        useGetSellableListCoreQuery({
            queryParams: sellableQueryParams,
            enabled: !isUndefined(template?.recId),
        });

    const { list: templateList } = templateResponse || {};

    const {
        list: sellables,
        pageCurrent,
        pageSize,
        totalItems,
    } = sellableResponse || {};
    const templateOptions = useMemo(() => {
        return (templateList || []).reduce<ITemplateOption[]>(
            (acc, template) => {
                return [
                    ...acc,
                    {
                        label: template.name,
                        value: template.recId,
                        data: template,
                    },
                ];
            },
            [],
        );
    }, [templateList]);

    const onView = (record: ISellable) => {
        setShowModalDetail({ isShow: true, record: record });
    };

    const onChangeTemplate: SelectProps<number, ITemplateOption>["onChange"] = (
        value,
        option,
    ) => {
        if (!isUndefined(option) && !isArray(option)) {
            setTemplate(option.data);
        }
    };
    const onChangeStocks = (
        action: "add" | "remove",
        record: SellableConfirmFormData["otherSellables"][0]["sellable"],
    ) => {
        onSetSellable?.(action, record);
    };

    const isSelecting = (record: ISellable) => {
        return false;
    };
    const onViewDetail = (record: ISellable) => {
        setShowModalDetail({ isShow: true, record: record });
    };
    const mergeColumns: ColumnsType<ISellable> = [
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
                return record.code;
            },
        },
        {
            title: "Open",
            dataIndex: "open",
            key: "open",
            width: 150,
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
                            onClick={() => onViewDetail(record)}
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
                {isUndefined(sellableList) || isEmpty(sellableList) ? (
                    <Empty
                        description="Chưa có sellable nào được chọn"
                        className="py-2"
                        imageStyle={{ width: 60, height: 60, margin: "auto" }}
                    />
                ) : (
                    <SellableList
                        templateSellableList={[]}
                        sellables={[]}
                        onSave={onSaveQuantity}
                        onDelete={(item) =>
                            onChangeStocks("remove", item.sellable)
                        }
                    />
                )}
            </div>
            <Divider />
            <Select
                options={templateOptions}
                placeholder="Chọn template sellable"
                onChange={onChangeTemplate}
                className="w-full"
            />
            <div className="mb-3"></div>
            <Table
                columns={mergeColumns}
                dataSource={sellables}
                loading={isLoadingSellable}
                {...restProps}
                pagination={{
                    total: totalItems,
                    pageSize: pageSize,
                    current: pageCurrent,
                }}
            />
            <ModalContent
                isShowModal={showModalDetail.isShow}
                onClose={() =>
                    setShowModalDetail({ isShow: false, record: undefined })
                }
                title={`Chi tiết Sellable`}
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
                                    label: "Loại stock",
                                    value: showModalDetail.record.type,
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
