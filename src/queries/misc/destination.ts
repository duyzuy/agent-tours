import { useQuery } from "@tanstack/react-query";
import { queryMisc, queryCMS } from "../var";
import { getAgToken } from "@/utils/common";
import { destinationAPIs } from "@/services/management/misc/destination";
import { isEmpty, isUndefined } from "lodash";
import { localSearchAPIs } from "@/services/management/misc/localSearch";
import { LocalSearchQueryParams } from "@/models/management/localSearchDestination.interface";
import { Status } from "@/models/common.interface";

export const useGetDestinationsQuery = (options?: { enabled?: boolean }) => {
  const token = getAgToken() || "";
  const { enabled = true } = options || {};
  return useQuery({
    queryKey: [queryMisc.GET_DESTINATION_LIST],
    queryFn: () => destinationAPIs.getDestinationList(),
    enabled: enabled && Boolean(token),
    select: (data) => {
      return data.result;
    },
  });
};

export const useGetDestinationDetailMICSQuery = (id: number) => {
  const token = getAgToken() || "";

  return useQuery({
    queryKey: [queryMisc.GET_DESTINATION_DETAIL, id],
    queryFn: () => destinationAPIs.getDestinationDetail(id),
    enabled: Boolean(token),
    select: (data) => {
      return data.result[0];
    },
  });
};

export const useGetDestinationDetailCMSQuery = (codekey: string) => {
  const token = getAgToken() || "";

  return useQuery({
    queryKey: [queryCMS.GET_DESTINATION_CMS_DETAIL, codekey],
    queryFn: () => destinationAPIs.getCMSContent({ codekey }),
    enabled: Boolean(token) && Boolean(codekey),
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
