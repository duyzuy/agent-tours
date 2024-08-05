import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { templateSellableAPIs } from "@/services/management/cores/templateSellable";

import { TemplateSellableQueryParams } from "@/models/management/core/templateSellable.interface";

export const useGetTemplateSellableListCoreQuery = ({
  queryParams,
  enabled = false,
}: {
  queryParams?: TemplateSellableQueryParams;
  enabled?: boolean;
}) => {
  let { requestObject, pageCurrent, pageSize } = queryParams || {};

  if (requestObject) {
    requestObject = Object.keys(requestObject)
      .sort()
      .reduce<TemplateSellableQueryParams["requestObject"]>((acc, key) => {
        return {
          ...acc,
          [key as keyof TemplateSellableQueryParams["requestObject"]]: requestObject
            ? requestObject[key as keyof TemplateSellableQueryParams["requestObject"]]
            : undefined,
        };
      }, requestObject);
  }

  return useQuery({
    queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE, requestObject, pageCurrent, pageSize],
    queryFn: () => templateSellableAPIs.getTemplateList(queryParams),
    select: (response) => {
      return {
        list: response.result,
        pageCurrent: response.pageCurrent,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
      };
    },
    enabled: enabled,
  });
};

export const useGetOneTemplateSellableCoreQuery = ({ recId, enabled }: { recId: number; enabled: boolean }) => {
  return useQuery({
    queryKey: [queryCore.GET_LIST_TEMPLATE_SELLABLE, recId],
    queryFn: () => templateSellableAPIs.getOneTemplate(recId),
    select: (data) => data.result,
    enabled: enabled,
  });
};
