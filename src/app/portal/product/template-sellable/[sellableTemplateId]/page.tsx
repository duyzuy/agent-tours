"use client";
import PageContainer from "@/components/admin/PageContainer";
import { Spin, Tabs, TabsProps } from "antd";

import { useGetInventoryDetailCoreQuery } from "@/queries/core/inventory";
import { useEffect } from "react";
import { LINKS } from "@/constants/links.constant";

import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";

import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";

import { PlusOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import SellableListContainer from "../_components/SellableListContainer";
import SellableFormContainer from "../_components/SellableFormContainer";
const Sellablepage = ({ params }: { params: { inventoryId: number } }) => {
    const router = useRouter();
    const message = useMessage();
    const { data: inventoryDetail, isLoading } = useGetInventoryDetailCoreQuery(
        params.inventoryId,
    );

    const tabItems: TabsProps["items"] = [
        {
            key: "sellableList",
            label: "Danh sách Sellable",
            children: <SellableListContainer />,
        },
        {
            key: "sellAbleForm",
            label: "Tạo Sellable",
            children: (
                <SellableFormContainer
                    onSubmit={() => {}}
                    templateSellableId={0}
                    inventoryType=""
                />
            ),
            icon: <PlusOutlined />,
        },
    ];

    // useEffect(() => {
    //     if (
    //         (!inventoryDetail && !isLoading) ||
    //         (inventoryDetail && !inventoryDetail.isStock)
    //     ) {
    //         router.push(LINKS.ProductInventoryList);
    //     }
    //     if (inventoryDetail && !inventoryDetail.isStock) {
    //         message.warning(
    //             `Inventory "${inventoryDetail.name}" không quản lý Stock.`,
    //         );
    //     }
    // }, [inventoryDetail, isLoading]);

    // if (isLoading) {
    //     return <Spin size="large" />;
    // }
    // if (!inventoryDetail || (inventoryDetail && !inventoryDetail.isStock)) {
    //     return null;
    // }
    return (
        <PageContainer
            name="Quản lý Sellable"
            // onBack={() => router.push(LINKS.ProductInventoryList)}
            modelName="Quản lý Sellable"
            breadCrumItems={[{ title: "Sellable" }]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default Sellablepage;
