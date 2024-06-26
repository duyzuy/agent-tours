import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { StockQueryParams } from "@/models/management/core/stock.interface";
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
    queryparams?: StockQueryParams;
}) => {
    let { requestObject, pageCurrent, pageSize } = queryparams || {};

    if (!isUndefined(requestObject)) {
        requestObject = Object.keys(requestObject)
            .sort()
            .reduce<StockQueryParams["requestObject"]>((acc, key) => {
                return {
                    ...acc,
                    [key]: requestObject
                        ? requestObject[
                              key as keyof StockQueryParams["requestObject"]
                          ]
                        : undefined,
                };
            }, requestObject);
    }
    return useQuery({
        queryKey: [
            queryCore.GET_STOCK_LIST_INVENTORY,
            pageCurrent,
            pageSize,
            requestObject,
        ],
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
