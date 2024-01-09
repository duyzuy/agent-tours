import React, { useState } from "react";
import {
    IStockListOfInventoryRs,
    StockInventoryAdjustFormData,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import { useRouter } from "next/navigation";
import TableListPage from "@/components/admin/TableListPage";
import { stockColumns } from "./stockColumns";
import DrawlerStockDetail, {
    DrawlerStockDetailProps,
} from "../DrawlerStockDetail";

interface StockListProps {
    items: IStockListOfInventoryRs["result"];
    isLoading?: boolean;
    onConfirm: (data: StockInventoryConfirmFormData, cb?: () => void) => void;
    onAdjustQuantity: (
        data: StockInventoryAdjustFormData,
        cb?: () => void,
    ) => void;
}

const StockList: React.FC<StockListProps> = ({
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

    const onApproval: DrawlerStockDetailProps["onApproval"] = (data) => {
        onConfirm(data, () => {
            setShowDrawler(false);
            setStockRecord(undefined);
        });
    };

    const onAdjust: DrawlerStockDetailProps["onAdjust"] = (data) => {
        onAdjustQuantity(data, () => {
            setShowDrawler(false);
            setStockRecord(undefined);
        });
    };
    return (
        <React.Fragment>
            <TableListPage<IStockListOfInventoryRs["result"][0]>
                dataSource={items}
                scroll={{ x: 2600 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={stockColumns}
                onEdit={(record) => handleDrawler(record)}
            />
            <DrawlerStockDetail
                isOpen={showDrawler}
                onCancel={onCancel}
                initialValues={stockRecord}
                onApproval={onApproval}
                onAdjust={onAdjust}
            />
        </React.Fragment>
    );
};
export default StockList;
