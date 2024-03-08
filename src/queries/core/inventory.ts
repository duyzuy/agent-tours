import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { inventoryAPIs } from "@/services/management/cores/inventory";
import { InventoryQueryParams } from "@/models/management/core/inventory.interface";
import { isUndefined } from "lodash";

export const useGetInventoryListCoreQuery = ({
    enabled = false,
    queryParams,
}: {
    enabled?: boolean;
    queryParams?: InventoryQueryParams;
}) => {
    // const { queryParams, enabled = false } = options || {};

    let inventoryQueryparams = new InventoryQueryParams(undefined, 1, 20);
    if (!isUndefined(queryParams)) {
        inventoryQueryparams = Object.keys(queryParams)
            .sort()
            .reduce<InventoryQueryParams>((acc, key) => {
                if (queryParams[key as keyof InventoryQueryParams]) {
                    acc = {
                        ...acc,
                        [key as keyof InventoryQueryParams]:
                            queryParams[key as keyof InventoryQueryParams],
                    };
                }
                return acc;
            }, inventoryQueryparams);
    }

    return useQuery({
        queryKey: [queryCore.GET_INVENTORY_LIST, inventoryQueryparams],
        queryFn: () => inventoryAPIs.getList(inventoryQueryparams),
        select: (data) => {
            const { result, pageCurrent, pageSize, totalItems, totalPages } =
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

export const useGetInventoryDetailCoreQuery = (recId: number) => {
    return useQuery({
        queryKey: [queryCore.GET_INVENTORY_DETAIL],
        queryFn: () => inventoryAPIs.getOne(recId),
        select: (data) => data.result[0],
        enabled: Boolean(recId),
    });
};
