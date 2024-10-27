import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { SellableQueryParams } from "@/models/management/core/sellable.interface";
import { sellableAPIs } from "@/services/management/cores/sellable";

export const useGetSellableListCoreQuery = (sellableQuery?: {
  queryParams?: SellableQueryParams;
  enabled?: boolean;
}) => {
  const { queryParams, enabled = false } = sellableQuery || {};
  let sellableQueryParams = new SellableQueryParams(undefined, 1, 20);
  if (queryParams) {
    sellableQueryParams = Object.keys(queryParams)
      .sort()
      .reduce<SellableQueryParams>((acc, key) => {
        return {
          ...acc,
          [key as keyof SellableQueryParams]: queryParams[key as keyof SellableQueryParams],
        };
      }, sellableQueryParams);
  }

  return useQuery({
    queryKey: [queryCore.GET_SELLABLE_LIST, sellableQueryParams],
    queryFn: () => sellableAPIs.getList(sellableQueryParams),
    select: (data) => {
      const { result, pageCurrent, pageSize, totalPages, totalItems } = data;
      return {
        list: result,
        pageCurrent,
        pageSize,
        totalPages,
        totalItems,
      };
    },

    enabled: enabled,
  });
};

export const useGetSellableDetailCoreQuery = (
  recId?: number,
  options?: {
    enabled: boolean;
  },
) => {
  const { enabled = true } = options || {};

  return useQuery({
    queryKey: [queryCore.GET_SELLABLE_DETAIL, recId],
    queryFn: () => sellableAPIs.getDetail(recId),
    select: (data) => {
      return data["result"];
    },
    enabled: enabled,
  });
};

export const useGetSellablePriceConfigsCoreQuery = (
  sellableRecId?: number,
  options?: {
    enabled: boolean;
  },
) => {
  const { enabled = true } = options || {};

  return useQuery({
    queryKey: [queryCore.GET_SELLABLE_PRICE_CONFIGS, sellableRecId],
    queryFn: () => sellableAPIs.getPriceConfigs(sellableRecId),
    select: (data) => {
      return data["result"];
    },
    enabled: enabled,
  });
};

export const useGetSellableCodeListQuery = ({ code, enabled = false }: { code: string; enabled: boolean }) => {
  return useQuery({
    queryKey: [queryCore.GET_SELLABLE_PRICE_CONFIGS, code],
    queryFn: () => sellableAPIs.getListCodes(code),
    select: (data) => {
      return data["result"];
    },
    enabled: enabled,
  });
};
