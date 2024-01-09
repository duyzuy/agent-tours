"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Spin, Tabs, TabsProps } from "antd";

import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import { useEffect, useState } from "react";
import { LINKS } from "@/constants/links.constant";

import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../../hooks/useCRUDStockInventory";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import StockForm from "../../components/StockForm";
import StockList from "../../components/StockList";
import { PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";

const StockPage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );
    const { data: stockList } = useGetStockInventoryListCoreQuery({
        inventoryId: params.inventoryId,
        enabled:
            !isUndefined(inventoryDetail) &&
            !isLoading &&
            inventoryDetail.isStock,
    });

    const { onCreate, onConfirm, errors } = useCRUDStockInventory();
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách Stock",
            children: (
                <StockList items={stockList || []} onConfirm={onConfirm} />
            ),
        },
        {
            key: "createStock",
            label: "Tạo Stock",
            children:
                (inventoryDetail && (
                    <StockForm
                        inventoryId={inventoryDetail.recId}
                        inventoryType={inventoryDetail.type}
                        onSubmit={onCreate}
                        errors={errors}
                    />
                )) ||
                null,
            icon: <PlusOutlined />,
        },
    ];

    useEffect(() => {
        if (
            (!inventoryDetail && !isLoading) ||
            (inventoryDetail && !inventoryDetail.isStock)
        ) {
            router.push(LINKS.ProductInventoryList);
        }
        if (inventoryDetail && !inventoryDetail.isStock) {
            message.warning(
                `Inventory "${inventoryDetail.name}" không quản lý Stock.`,
            );
        }
    }, [inventoryDetail, isLoading]);

    if (isLoading) {
        return <Spin size="large" />;
    }
    if (!inventoryDetail || (inventoryDetail && !inventoryDetail.isStock)) {
        return null;
    }
    return (
        <PageContainer
            name={inventoryDetail.name}
            onBack={() => router.push(LINKS.ProductInventoryList)}
            modelName="Quảnt lý stock"
            breadCrumItems={[
                { title: "Inventory", href: LINKS.ProductInventoryList },
                { title: inventoryDetail.name },
            ]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default StockPage;
