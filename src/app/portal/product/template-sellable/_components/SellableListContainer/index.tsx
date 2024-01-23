import React, { useEffect, useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { useGetSellableListCoreQuery } from "@/queries/core/Sellable";
import {
    ISellable,
    SellableConfirmFormData,
    SellableQueryParams,
} from "@/models/management/core/sellable.interface";
import { sellableColumns } from "./sellableColumns";
import DrawerSellable, {
    DrawerSellableProps,
    EActionType,
} from "./DrawerSellable";
import { Status } from "@/models/management/common.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { IInventoryQueryParams } from "@/models/management/core/inventory.interface";
import { isUndefined } from "lodash";
export interface SellableListContainerProps {
    sellableTemplateId: number;
    inventoryType?: string;
    onApproval: (record: SellableConfirmFormData, cb?: () => void) => void;
    render?: () => React.ReactNode;
}
const SellableListContainer: React.FC<SellableListContainerProps> = ({
    sellableTemplateId,
    render,
    inventoryType,
    onApproval,
}) => {
    const initSellableQueryParams = new SellableQueryParams(
        sellableTemplateId,
        undefined,
        undefined,
        1,
        10,
        undefined,
    );
    const [sellableQueryParams, setSellableQueryParams] = useState(
        initSellableQueryParams,
    );

    const inventoryQueryParams = new IInventoryQueryParams(
        inventoryType,
        undefined,
        1,
        10,
        Status.OK,
    );
    const { data: sellableResponse, isLoading } = useGetSellableListCoreQuery({
        queryParams: sellableQueryParams,
        enabled: true,
    });
    const {
        list: sellableList,
        pageCurrent,
        pageSize,
        totalItems,
    } = sellableResponse || {};
    const { data: inventoryListByTemplateSellableResponse } =
        useGetInventoryListCoreQuery({
            enabled: true,
            queryParams: inventoryQueryParams,
        });
    const { list: inventoryListByTemplateSellable } =
        inventoryListByTemplateSellableResponse || {};
    const [showDrawler, setShowDrawer] = useState(false);
    const [editRecord, setEditRecord] = useState<ISellable>();
    const [actionType, setActionType] = useState<EActionType>();
    const onCancel = () => {
        setShowDrawer(false);
        setEditRecord(undefined);
    };

    const handleDrawer = ({
        action,
        record,
    }: {
        action: EActionType;
        record: ISellable;
    }) => {
        setEditRecord(record);
        setShowDrawer(true);
        setActionType(action);
    };

    const handleApproval: DrawerSellableProps["onSubmit"] = (
        actionType,
        formData,
    ) => {
        onApproval(formData);
    };

    return (
        <>
            <React.Fragment>
                {render?.()}
                <TableListPage<any>
                    dataSource={sellableList || []}
                    scroll={{ x: 1800 }}
                    rowKey={"recId"}
                    isLoading={isLoading}
                    columns={sellableColumns}
                    onEdit={(record) =>
                        handleDrawer({ action: EActionType.EDIT, record })
                    }
                    pagination={{
                        current: pageCurrent,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            console.log(page, pageSize);
                        },
                        pageSizeOptions: [10, 20, 50, 100],
                        total: totalItems,
                        position: ["bottomRight"],
                        hideOnSinglePage: true,
                    }}
                />
                <DrawerSellable
                    isOpen={showDrawler}
                    inventories={inventoryListByTemplateSellable || []}
                    isApproval={editRecord?.status === Status.OK}
                    code={editRecord?.code || ""}
                    actionType={actionType}
                    onCancel={onCancel}
                    initialValues={editRecord}
                    onApproval={() => {}}
                    onSubmit={handleApproval}
                />
            </React.Fragment>
        </>
    );
};
export default SellableListContainer;
