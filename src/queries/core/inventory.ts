import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { inventoryAPIs } from "@/services/management/cores/inventory";
import { IInventoryQueryParams } from "@/models/management/core/inventory.interface";
import { isUndefined } from "lodash";

export const useGetInventoryListCoreQuery = (options?: {
    enabled?: boolean;
    queryParams?: IInventoryQueryParams;
}) => {
    const { queryParams, enabled = false } = options || {};

    let inventoryQueryparams = new IInventoryQueryParams(
        undefined,
        undefined,
        1,
        20,
        undefined,
    );
    if (!isUndefined(queryParams)) {
        inventoryQueryparams = Object.keys(queryParams)
            .sort()
            .reduce<IInventoryQueryParams>((acc, key) => {
                if (queryParams[key as keyof IInventoryQueryParams]) {
                    acc = {
                        ...acc,
                        [key as keyof IInventoryQueryParams]:
                            queryParams[key as keyof IInventoryQueryParams],
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
