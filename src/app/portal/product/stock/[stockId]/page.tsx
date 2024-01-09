"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
    Checkbox,
    Space,
    Button,
    Spin,
} from "antd";
import { useGetStockDetailInventoryCoreQuery } from "@/queries/core/stockInventory";

const StockPage = ({ params }: { params: { stockId: number } }) => {
    const router = useRouter();

    const { data, isLoading } = useGetStockDetailInventoryCoreQuery({
        inventoryStockId: params.stockId,
        enabled: true,
    });

    useEffect(() => {
        if (!data && !isLoading) {
            router.push("/portal/product/inventory");
        }
    }, [isLoading, data]);
    if (isLoading) {
        return <Spin size="large" />;
    }
    if (!data && !isLoading) {
        return null;
    }
    console.log(data);

    return (
        <PageContainer
            name={`Stock`}
            modelName="Stock"
            breadCrumItems={[{ title: "Stock" }]}
            hideAddButton
            // onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        ></PageContainer>
    );
};
export default StockPage;
