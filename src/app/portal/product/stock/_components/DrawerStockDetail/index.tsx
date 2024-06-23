import React from "react";
import { Drawer, Tag, List, Divider } from "antd";

import { Status } from "@/models/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import {
    StockAdjustFormData,
    StockConfirmFormData,
} from "../../modules/stock.interface";
import { formatDate } from "@/utils/date";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";
import StockConfirmationForm from "./StockConfirmationForm";

import StockAdjustmentForm from "./StockAdjustmentForm";
export enum EActionType {
    EDIT = "edit",
    APPROVAL = "approval",
}
export type TDrawerStockDetailAction = {
    type: EActionType;
    record: IStockListOfInventoryRs["result"][0];
};

export interface DrawerStockDetailProps {
    isOpen?: boolean;
    onCancel: () => void;
    initialValues?: IStockListOfInventoryRs["result"][0];
    actionType?: EActionType;
    onApproval?: (formData: StockConfirmFormData) => void;
    onAdjust?: (formData: StockAdjustFormData, cb?: () => void) => void;
}

const DrawerStockDetail: React.FC<DrawerStockDetailProps> = ({
    actionType,
    onCancel,
    onApproval,
    onAdjust,
    isOpen,
    initialValues,
}) => {
    /**
     * Get all Stock detail history adjustment
     * only fetch if stock with status OK (Approval)
     */

    const { data: stockDetailList, isLoading } =
        useGetStockDetailInventoryCoreQuery({
            inventoryStockId: initialValues?.recId || 0,
            enabled: initialValues?.status === Status.OK,
        });

    return (
        <Drawer
            title={initialValues?.code ?? null}
            destroyOnClose
            width={550}
            onClose={onCancel}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <div className="status py-2">
                <span className="mr-3">Trạng thái</span>
                <Tag
                    color={
                        (initialValues?.status === Status.QQ && "orange") ||
                        (initialValues?.status === Status.OK && "green") ||
                        "red"
                    }
                >
                    {(initialValues?.status === Status.QQ && "Chờ duyệt") ||
                        (initialValues?.status === Status.OK && "Đã duyệt") ||
                        "Đã xoá"}
                </Tag>
            </div>

            <StockConfirmationForm
                initialValues={initialValues}
                hasApproval={actionType !== EActionType.APPROVAL}
                onSubmit={onApproval}
            />

            {actionType === EActionType.EDIT ? (
                <>
                    <Divider />
                    <div className="stock-adjustment-wrapper">
                        <StockAdjustmentForm
                            inventoryStockId={initialValues?.recId}
                            onSubmit={onAdjust}
                            onCancel={onCancel}
                            className="mb-6"
                        />
                        <div className="py-3 border-b">
                            <p className="font-semibold">Danh sách cập nhật</p>
                        </div>
                        <List
                            itemLayout="horizontal"
                            dataSource={stockDetailList || []}
                            loading={isLoading}
                            renderItem={(item, index) => (
                                <List.Item key={index}>
                                    <List.Item.Meta
                                        title={
                                            <Tag color="blue">{item.cat}</Tag>
                                        }
                                        description={
                                            <div className="description pt-2 text-gray-800">
                                                <div className="flex gap-x-2">
                                                    <p className="w-32">
                                                        {`Số lượng`}
                                                    </p>
                                                    <p className="flex-1">
                                                        {`: ${
                                                            item.quantity
                                                                ? item.quantity
                                                                : "--"
                                                        }`}
                                                    </p>
                                                </div>
                                                <div className="flex gap-x-2">
                                                    <p className="w-32">
                                                        {`Ngày cập nhật`}
                                                    </p>
                                                    <p>
                                                        {`: ${formatDate(
                                                            item.sysFstUpdate,
                                                        )}`}
                                                    </p>
                                                </div>
                                                <div className="flex gap-x-2">
                                                    <p className="w-32">
                                                        {`Mô tả`}
                                                    </p>
                                                    <p className="flex-1">
                                                        {`: ${
                                                            item.rmk
                                                                ? item.rmk
                                                                : "--"
                                                        }`}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </>
            ) : null}
        </Drawer>
    );
};
export default DrawerStockDetail;
