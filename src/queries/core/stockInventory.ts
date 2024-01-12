import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";

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
    queryparams,
    enabled,
}: {
    inventoryId: number;
    queryparams: StockInventoryQueryparams;
    enabled: boolean;
}) => {
    const sortedQueryParams = Object.keys(queryparams)
        .sort()
        .reduce<StockInventoryQueryparams>((acc, key) => {
            return {
                ...acc,
                [key]: queryparams[key as keyof StockInventoryQueryparams],
            };
        }, new StockInventoryQueryparams("", "", "", "", "", 1, 10));
    return useQuery({
        queryKey: [
            queryCore.GET_STOCK_LIST_INVENTORY,
            inventoryId,
            sortedQueryParams,
        ],
        queryFn: () =>
            stockInventoryAPIs.getStockList(inventoryId, sortedQueryParams),
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
