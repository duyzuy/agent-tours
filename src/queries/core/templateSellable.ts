import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import { TemplateSellableQueryParams } from "@/models/management/core/templateSellable.interface";

export const useGetTemplateSellableListCoreQuery = (templateOptions?: {
    queryParams?: TemplateSellableQueryParams;
    enabled?: boolean;
}) => {
    const { queryParams, enabled = false } = templateOptions || {};
    let templateQueryParams = new TemplateSellableQueryParams(
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        20,
        undefined,
    );
    if (queryParams) {
        templateQueryParams = Object.keys(queryParams)
            .sort()
            .reduce<TemplateSellableQueryParams>((acc, key) => {
                return {
                    ...acc,
                    [key as keyof TemplateSellableQueryParams]:
                        queryParams[key as keyof TemplateSellableQueryParams],
                };
            }, templateQueryParams);
    }

    return useQuery({
        queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE, templateQueryParams],
        queryFn: () =>
            templateSellableAPIs.getTemplateList(templateQueryParams),
        select: (data) => {
            const { result, pageCurrent, pageSize, totalPages, totalItems } =
                data;
            return {
                list: result,
                pageCurrent: pageCurrent,
                pageSize,
                totalPages,
                totalItems,
            };
        },
        enabled: enabled,
    });
};

export const useGetOneTemplateSellableCoreQuery = ({
    recId,
    enabled,
}: {
    recId: number;
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE, recId],
        queryFn: () => templateSellableAPIs.getOneTemplate(recId),
        select: (data) => data.result[0],
        enabled: enabled,
    });
};
