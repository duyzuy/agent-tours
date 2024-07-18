import { useQuery } from "@tanstack/react-query";
import { queryMisc, queryCMS } from "../var";
import { getAgToken } from "@/utils/common";
import { destinationAPIs } from "@/services/management/cms/destination";
import { isEmpty, isUndefined } from "lodash";
import { localSearchAPIs } from "@/services/management/cms/localSearch";
import { LocalSearchQueryParams } from "@/models/management/localSearchDestination.interface";
import { Status } from "@/models/common.interface";
import { DestinationMinimalQueryParams } from "@/models/management/region.interface";

export const useGetDestinationsQuery = (options?: { enabled?: boolean }) => {
  const { enabled = true } = options || {};
  return useQuery({
    queryKey: [queryMisc.GET_DESTINATION_LIST],
    queryFn: () => destinationAPIs.getDestinationList(),

    select: (data) => {
      return data.result;
    },
  });
};

export const useGetDestinationMinimalListQuery = (queryParams: DestinationMinimalQueryParams, enabled?: boolean) => {
  return useQuery({
    queryKey: [queryMisc.GET_DESTINATION_DETAIL, { ...queryParams }],
    queryFn: () => destinationAPIs.getDestinationMinimalList(queryParams),
    enabled: enabled,
    select: (data) => {
      return {
        list: data.result,
        pageCurrent: data.pageCurrent,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
      };
    },
  });
};

export const useGetDestinationDetailMICSQuery = (id: number) => {
  return useQuery({
    queryKey: [queryMisc.GET_DESTINATION_DETAIL, id],
    queryFn: () => destinationAPIs.getDestinationDetail(id),

    select: (data) => {
      return data.result[0];
    },
  });
};

export const useGetDestinationDetailCMSQuery = (codekey: string) => {
  return useQuery({
    queryKey: [queryCMS.GET_DESTINATION_CMS_DETAIL, codekey],
    queryFn: () => destinationAPIs.getCMSContent({ codekey }),
    enabled: Boolean(codekey),
    select: (data) => {
      return data.result;
    },
  });
};

export const useGetLocalSearchListMISCQuery = (options?: { enabled: boolean; queryParams: LocalSearchQueryParams }) => {
  const { enabled, queryParams } = options || {};
  const token = getAgToken() || "";

  let localSearchParams = new LocalSearchQueryParams(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    1,
    20,
    Status.OK,
  );
  if (!isUndefined(queryParams)) {
    localSearchParams = Object.keys(queryParams)
      .sort()
      .reduce<LocalSearchQueryParams>((acc, key) => {
        if (queryParams[key as keyof LocalSearchQueryParams]) {
          acc = {
            ...acc,
            [key as keyof LocalSearchQueryParams]: queryParams[key as keyof LocalSearchQueryParams],
          };
        }
        return acc;
      }, localSearchParams);
  }

  return useQuery({
    queryKey: [queryCMS.GET_LOCAL_SEACH_DESTINATION, localSearchParams],
    queryFn: () => localSearchAPIs.getList(queryParams),
    enabled: Boolean(token) && enabled,
    select: (data) => {
      return data.result;
    },
  });
};
