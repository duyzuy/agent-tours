import React, { useState } from "react";
import {
    IStockConfirmPayload,
    IStockListOfInventoryRs,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import TableListPage from "@/components/admin/TableListPage";
import { stockColumns } from "./stockColumns";
import DrawlerStockConfirm, {
    DrawlerStockConfirmProps,
    EActionType,
} from "../DrawlerStockConfirm";

interface StockListProps {
    items: IStockListOfInventoryRs["result"];
    isLoading?: boolean;
    onConfirm: (data: StockInventoryConfirmFormData, cb?: () => void) => void;
}

const StockList: React.FC<StockListProps> = ({
    items,
    isLoading,
    onConfirm,
}) => {
    const [showDrawler, setShowDrawler] = useState(false);
    const [stockRecord, setStockRecord] =
        useState<IStockListOfInventoryRs["result"][0]>();
    const handleDrawler = (record: IStockListOfInventoryRs["result"][0]) => {
        setShowDrawler(true);
        setStockRecord(record);
    };
    const onCancel = () => {
        setShowDrawler(false);
    };

    const onSubmitFormData: DrawlerStockConfirmProps["onSubmit"] = (data) => {
        onConfirm(data, () => {
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
            <DrawlerStockConfirm
                isOpen={showDrawler}
                onCancel={onCancel}
                initialValues={stockRecord}
                onSubmit={onSubmitFormData}
                actionType={EActionType.CREATE}
            />
        </React.Fragment>
    );
};
export default StockList;
