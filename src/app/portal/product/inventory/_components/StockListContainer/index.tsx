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

interface StockListContainerProps {
    items: IStockListOfInventoryRs["result"];
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
}

const StockListContainer: React.FC<StockListContainerProps> = ({
    items,
    isLoading,
    onConfirm,
    onAdjustQuantity,
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
            <TableListPage<IStockListOfInventoryRs["result"][0]>
                dataSource={items}
                scroll={{ x: 2200 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={stockColumns}
                onEdit={(record) => handleDrawler(record)}
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
