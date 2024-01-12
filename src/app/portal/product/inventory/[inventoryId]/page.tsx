"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Spin, Tabs, TabsProps } from "antd";

import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import { useEffect } from "react";
import { LINKS } from "@/constants/links.constant";

import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "../../hooks/useCRUDStockInventory";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import StockFormContainer from "../_components/StockFormContainer";
import StockListContainer from "../_components/StockListContainer";

import { PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
const StockPage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );
    const stockQueryParams = new StockInventoryQueryparams("", "", "", "", "");
    const { data: stockList } = useGetStockInventoryListCoreQuery({
        inventoryId: params.inventoryId,
        queryparams: stockQueryParams,
        enabled:
            !isUndefined(inventoryDetail) &&
            !isLoading &&
            inventoryDetail.isStock,
    });

    const { onCreate, onConfirm, onAdjustQuantity } = useCRUDStockInventory();
    const tabItems: TabsProps["items"] = [
        {
            key: "stockList",
            label: "Danh sách Stock",
            children: (
                <StockListContainer
                    items={stockList || []}
                    onConfirm={onConfirm}
                    onAdjustQuantity={onAdjustQuantity}
                />
            ),
        },
        {
            key: "createStock",
            label: "Tạo Stock",
            children:
                (inventoryDetail && (
                    <StockFormContainer
                        inventoryId={inventoryDetail.recId}
                        inventoryType={inventoryDetail.type}
                        onSubmit={onCreate}
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
