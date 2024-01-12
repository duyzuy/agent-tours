import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import { TemplateSellableQueryParams } from "@/models/management/core/templateSellable.interface";

export const useGetTemplateSellableListCoreQuery = (
    queryParams: TemplateSellableQueryParams,
) => {
    const sortedQueryParams = Object.keys(queryParams)
        .sort()
        .reduce<TemplateSellableQueryParams>((acc, key) => {
            return {
                ...acc,
                [key as keyof TemplateSellableQueryParams]:
                    queryParams[key as keyof TemplateSellableQueryParams],
            };
        }, new TemplateSellableQueryParams("", "", "", 0, 20));

    return useQuery({
        queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE, sortedQueryParams],
        queryFn: () => templateSellableAPIs.getTemplateList(sortedQueryParams),
        select: (data) => data.result,
        enabled: true,
    });
};
