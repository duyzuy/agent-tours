import React, { useState } from "react";
import {
    IStock,
    IStockConfirmPayload,
    IStockListOfInventoryRs,
    StockInventoryAdjustFormData,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import { useRouter } from "next/navigation";
import TableListPage from "@/components/admin/TableListPage";
import { stockColumns } from "./stockColumns";
import DrawerStockDetail, {
    DrawerStockDetailProps,
} from "../DrawerStockDetail";
import { BaseResponse } from "@/models/management/common.interface";
import { PaginationProps } from "antd";

export interface StockListContainerProps {
    items: IStockListOfInventoryRs["result"];
    pageSize: number;
    pageCurrent: number;
    totalItems: number;
    isLoading?: boolean;
    onConfirm: (
        data: StockInventoryConfirmFormData,
        cb?: (
            response: BaseResponse<IStock>,
            variables?: IStockConfirmPayload,
        ) => void,
    ) => void;
    onAdjustQuantity: (
        data: StockInventoryAdjustFormData,
        cb?: () => void,
    ) => void;
    render?: () => React.ReactNode;
    onChangeStockPage?: PaginationProps["onChange"];
}

const StockListContainer: React.FC<StockListContainerProps> = ({
    items,
    isLoading,
    pageSize,
    pageCurrent,
    totalItems,
    onConfirm,
    onAdjustQuantity,
    onChangeStockPage,
    render,
}) => {
    const [showDrawler, setShowDrawler] = useState(false);

    const [stockRecord, setStockRecord] =
        useState<IStockListOfInventoryRs["result"][0]>();
    const router = useRouter();
    const handleDrawler = (record: IStockListOfInventoryRs["result"][0]) => {
        setShowDrawler(true);
        setStockRecord(record);
    };
    const onCancel = () => {
        setShowDrawler(false);
        setStockRecord(undefined);
    };

    const onApproval: DrawerStockDetailProps["onApproval"] = (data) => {
        onConfirm(data, (response, variables) => {
            // setShowDrawler(false);
            setStockRecord(response["result"]);
        });
    };

    return (
        <React.Fragment>
            {render?.()}
            <TableListPage<IStockListOfInventoryRs["result"][0]>
                dataSource={items}
                scroll={{ x: 2200 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={stockColumns}
                onEdit={(record) => handleDrawler(record)}
                pagination={{
                    current: pageCurrent,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: onChangeStockPage,
                }}
            />
            <DrawerStockDetail
                isOpen={showDrawler}
                onCancel={onCancel}
                initialValues={stockRecord}
                onApproval={onApproval}
                onAdjust={onAdjustQuantity}
            />
        </React.Fragment>
    );
};
export default StockListContainer;
