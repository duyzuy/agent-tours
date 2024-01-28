"use client";
import React, { useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { useGetSellableDetailCoreQuery } from "@/queries/core/Sellable";
import {
    SellableConfirmFormData,
    SellableListRs,
} from "@/models/management/core/sellable.interface";
import { sellableColumns } from "./sellableColumns";
import DrawerSellable, {
    DrawerSellableProps,
    EActionType,
} from "../DrawerSellable";
import { Status } from "@/models/management/common.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { IInventoryQueryParams } from "@/models/management/core/inventory.interface";

import { useGetSellablePriceConfigsCoreQuery } from "@/queries/core/Sellable";
import useMessage from "@/hooks/useMessage";
import DrawerPriceConfig from "../DrawerPriceConfig";
import { isUndefined } from "lodash";
import useConfigPriceSellable from "../../hooks/useConfigPriceSellable";
import DrawerSellableDetail from "../DrawerSellableDetail";
import { TemplateSellableQueryParams } from "@/models/management/core/templateSellable.interface";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";
import { PaginationProps } from "antd";

export interface SellableListProps {
    dataSource: SellableListRs["result"];
    pageSize: number;
    pageCurrent: number;
    totalItems: number;
    isLoading?: boolean;
    render?: () => React.ReactNode;
    onApproval: (record: SellableConfirmFormData, cb?: () => void) => void;
    onChangePageSellable?: PaginationProps["onChange"];
}

const SellableListContainer: React.FC<SellableListProps> = ({
    dataSource,
    isLoading,
    pageSize,
    pageCurrent,
    totalItems,
    onApproval,
    onChangePageSellable,
    render,
}) => {
    const initTemplateQueryParams = new TemplateSellableQueryParams(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        Status.OK,
    );

    const { data } = useGetTemplateSellableListCoreQuery({
        queryParams: initTemplateQueryParams,
        enabled: true,
    });
    console.log(data);

    const inventoryQueryParams = new IInventoryQueryParams(
        undefined,
        undefined,
        1,
        10,
        Status.OK,
    );

    const { data: inventoryListByTemplateSellableResponse } =
        useGetInventoryListCoreQuery({
            enabled: true,
            queryParams: inventoryQueryParams,
        });
    const { list: inventoryListByTemplateSellable } =
        inventoryListByTemplateSellableResponse || {};

    const [showDrawer, setShowDrawer] = useState(false);
    const [viewSellableDetail, setViewSellableDetail] = useState<{
        recId?: number;
        isShow: boolean;
    }>({ recId: undefined, isShow: false });
    const [drawerPriceConfig, setDrawerPriceConfig] = useState<{
        isShow: boolean;
        record?: SellableListRs["result"][0];
    }>({ isShow: false, record: undefined });
    const [editRecord, setEditRecord] = useState<SellableListRs["result"][0]>();

    const [actionType, setActionType] = useState<EActionType>();
    const message = useMessage();
    const { data: sellablePriceConfigs, isLoading: isLoadingPriceConfig } =
        useGetSellablePriceConfigsCoreQuery(drawerPriceConfig.record?.recId, {
            enabled: !isUndefined(drawerPriceConfig.record?.recId),
        });

    const { data: sellableDetail, isLoading: isLoadingSellableDetail } =
        useGetSellableDetailCoreQuery(viewSellableDetail.recId, {
            enabled: !isUndefined(viewSellableDetail.recId),
        });
    const { onUpdate } = useConfigPriceSellable();
    const onCloseDrawerAndResetRecord = () => {
        setShowDrawer(false);
        setEditRecord(undefined);
    };

    const handleDrawer = ({
        action,
        record,
    }: {
        action: EActionType;
        record: SellableListRs["result"][0];
    }) => {
        setEditRecord(record);
        setShowDrawer(true);
        setActionType(action);
    };

    const handleApproval: DrawerSellableProps["onSubmit"] = (
        actionType,
        formData,
    ) => {
        onApproval(formData, () => {
            setShowDrawer(false);
            setEditRecord(undefined);
        });
    };

    const onConfigPriceSellable = (record: SellableListRs["result"][0]) => {
        if (record.status !== Status.OK) {
            message.info("Duyệt sellable trước khi tạo giá.");
            return;
        }
        setDrawerPriceConfig({ isShow: true, record: record });
    };

    return (
        <React.Fragment>
            {render?.()}
            <TableListPage<SellableListRs["result"][0]>
                dataSource={dataSource}
                scroll={{ x: 2000 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={sellableColumns}
                pagination={{
                    current: pageCurrent,
                    pageSize: pageSize,
                    onChange: onChangePageSellable,
                    total: totalItems,
                    position: ["bottomRight"],
                    hideOnSinglePage: true,
                }}
                onApproval={(record) =>
                    handleDrawer({ action: EActionType.APPROVAL, record })
                }
                hideApproval={({ status }) => status === Status.OK}
                hideEdit={({ status }) => status === Status.QQ}
                onEdit={(record) =>
                    handleDrawer({ action: EActionType.EDIT, record })
                }
                onView={(record) =>
                    setViewSellableDetail({
                        isShow: true,
                        recId: record.recId,
                    })
                }
                onSetting={(record) => onConfigPriceSellable(record)}
            />
            <DrawerSellable
                isOpen={showDrawer}
                inventories={inventoryListByTemplateSellable || []}
                isApproval={editRecord?.status === Status.OK}
                code={editRecord?.code || ""}
                actionType={actionType}
                onCancel={onCloseDrawerAndResetRecord}
                initialValues={editRecord}
                onApproval={() => {}}
                onSubmit={handleApproval}
            />
            <DrawerSellableDetail
                isOpen={viewSellableDetail.isShow}
                onCancel={() => {
                    setViewSellableDetail({
                        isShow: false,
                        recId: undefined,
                    });
                }}
                data={sellableDetail}
                label={
                    (sellableDetail &&
                        `ID${sellableDetail.sellable.recId} - ${sellableDetail?.sellable.code}`) ||
                    ""
                }
                isLoading={isLoadingSellableDetail}
            />
            <DrawerPriceConfig
                isOpen={drawerPriceConfig.isShow}
                initialValues={sellablePriceConfigs}
                sellableRecord={drawerPriceConfig.record}
                sellableRecId={drawerPriceConfig.record?.recId}
                onCancel={() =>
                    setDrawerPriceConfig((prev) => ({
                        isShow: false,
                        record: undefined,
                    }))
                }
                onSubmit={onUpdate}
            />
        </React.Fragment>
    );
};
export default SellableListContainer;
