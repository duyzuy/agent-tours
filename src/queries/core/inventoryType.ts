import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { inventoryTypeAPIs } from "@/services/management/cores/inventoryType";

export const useGetInventoryTypeListCoreQuery = () => {
    return useQuery({
        queryKey: [queryCore.GET_INVENTORY_TYPE_LIST],
        queryFn: () => inventoryTypeAPIs.getAll(),
        select: (data) => data.result,
    });
};
