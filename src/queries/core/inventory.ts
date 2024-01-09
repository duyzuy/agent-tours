import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { inventoryAPIs } from "@/services/management/cores/inventory";

export const useGetInventoryListCoreQuery = () => {
    return useQuery({
        queryKey: [queryCore.GET_INVENTORY_LIST],
        queryFn: () => inventoryAPIs.getList(),
        select: (data) => data.result,
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
