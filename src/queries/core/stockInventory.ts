import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { StockInventoryQueryparams } from "@/models/management/core/stockInventory.interface";
import { isUndefined } from "lodash";

export const useGetStockInventoryTypeCoreQuery = (type: string) => {
    return useQuery({
        queryKey: [queryCore.GET_STOCK_INVENTORY_TYPE, type],
        queryFn: () => stockInventoryAPIs.getStockType(type),
        select: (data) => data.result,
        enabled: Boolean(type),
    });
};

export const useGetStockInventoryListCoreQuery = ({
    queryparams,
    enabled,
}: {
    enabled?: boolean;
    queryparams?: StockInventoryQueryparams;
}) => {
    let stockQueryParams = new StockInventoryQueryparams(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        10,
        undefined,
    );

    if (queryparams) {
        stockQueryParams = Object.keys(queryparams)
            .sort()
            .reduce<StockInventoryQueryparams>((acc, key) => {
                return {
                    ...acc,
                    [key]: queryparams[key as keyof StockInventoryQueryparams],
                };
            }, stockQueryParams);
    }
    return useQuery({
        queryKey: [queryCore.GET_STOCK_LIST_INVENTORY, stockQueryParams],
        queryFn: () => stockInventoryAPIs.getStockList(queryparams),
        select: (data) => {
            const { result, pageCurrent, pageSize, totalPages, totalItems } =
                data;
            return {
                list: result,
                pageCurrent,
                pageSize,
                totalItems,
                totalPages,
            };
        },
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
