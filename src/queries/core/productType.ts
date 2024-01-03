import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { productTypeAPIs } from "@/services/management/cores/productType";

export const useGetProductTypeListCoreQuery = () => {
    return useQuery({
        queryKey: [queryCore.GET_PRODUCT_TYPE_LIST],
        queryFn: () => productTypeAPIs.getAll(),
        select: (data) => data.result,
    });
};
