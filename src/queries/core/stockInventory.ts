import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";

export const useGetStockInventoryTypeCoreQuery = (type: string) => {
    return useQuery({
        queryKey: [queryCore.GET_STOCK_INVENTORY_TYPE, type],
        queryFn: () => stockInventoryAPIs.getStockType(type),
        select: (data) => data.result,
        enabled: Boolean(type),
    });
};

export const useGetStockInventoryListCoreQuery = ({
    inventoryId,
    enabled,
}: {
    inventoryId: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_STOCK_LIST_INVENTORY, inventoryId],
        queryFn: () => stockInventoryAPIs.getStockList(inventoryId),
        select: (data) => data.result,
        enabled: enabled,
    });
};

export const useGetStockDetailInventoryCoreQuery = ({
    inventoryStockId,
    enabled,
}: {
    inventoryStockId: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_STOCK_DETAIL_INVENTORY, inventoryStockId],
        queryFn: () => stockInventoryAPIs.getStockDetail(inventoryStockId),
        select: (data) => data.result,
        enabled: enabled,
    });
};
