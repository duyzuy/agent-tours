import React from "react";
import { Drawer, Tag, List } from "antd";

import { Status } from "@/models/management/common.interface";

import { TInventoryErrorsField } from "../../hooks/useCRUDInventory";
import {
    IStockListOfInventoryRs,
    StockInventoryAdjustFormData,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";

export enum EActionType {
    VIEW = "view",
    CONFIRM = "confirm",
}

export type TDrawlerStockDetailAction = {
    type: EActionType;
    record: IStockListOfInventoryRs["result"][0];
};

export interface DrawlerStockDetailProps {
    isOpen?: boolean;
    onCancel: () => void;
    initialValues?: IStockListOfInventoryRs["result"][0];
    onApproval?: (formData: StockInventoryConfirmFormData) => void;
    onAdjust?: (
        formData: StockInventoryAdjustFormData,
        cb?: () => void,
    ) => void;
}
export const DATE_FORMAT = "DDMMMYY HH:mm";
export const TIME_FORMAT = "HH:mm";

import StockConfirmationForm from "./StockConfirmationForm";
import { formatDate } from "@/utils/date";
import StockAdjustmentForm from "./StockAdjustmentForm";

const DrawlerStockDetail: React.FC<DrawlerStockDetailProps> = ({
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
            {(initialValues && (
                <StockConfirmationForm
                    initialValues={initialValues}
                    hasApproval={initialValues.status === Status.OK}
                    onSubmit={onApproval}
                />
            )) ||
                null}
            {initialValues && initialValues.status === Status.OK ? (
                <>
                    <hr className="my-6" />
                    <div className="stock-adjustment-wrapper">
                        <StockAdjustmentForm
                            inventoryStockId={initialValues.recId}
                            onSubmit={onAdjust}
                            onCancel={onCancel}
                            className="mb-6"
                        />
                        <div className="py-3 border-b">
                            <p className="font-semibold">Lịch sử cập nhật</p>
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
                                            <div className="description pt-2">
                                                <div className="flex gap-x-2">
                                                    <p className="w-24">
                                                        {` Mô tả:`}
                                                    </p>
                                                    <p className="flex-1">
                                                        {item.rmk
                                                            ? item.rmk
                                                            : "--"}
                                                    </p>
                                                </div>
                                                <div className="flex gap-x-2">
                                                    <p className="w-24">
                                                        {`Số lượng:`}
                                                    </p>
                                                    <p className="flex-1">
                                                        {item.quantity
                                                            ? item.quantity
                                                            : "--"}
                                                    </p>
                                                </div>
                                                <div className="flex gap-x-2">
                                                    <p className="w-24">
                                                        {`Ngày:`}
                                                    </p>
                                                    <p>
                                                        {formatDate(
                                                            item.sysFstUpdate,
                                                        )}
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
export default DrawlerStockDetail;
