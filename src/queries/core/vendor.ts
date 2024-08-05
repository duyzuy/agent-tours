import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { vendorAPIs } from "@/services/management/cores/vendor";
import { VendorQueryParams } from "@/models/management/vendor.interface";

export const useGetVendorListCoreQuery = ({
  queryParams,
  enabled = false,
}: {
  queryParams?: VendorQueryParams;
  enabled?: boolean;
}) => {
  let { requestObject, pageCurrent, pageSize } = queryParams || {};

  if (requestObject) {
    requestObject = Object.keys(requestObject)
      .sort()
      .reduce<VendorQueryParams["requestObject"]>((acc, key) => {
        return {
          ...acc,
          [key as keyof VendorQueryParams["requestObject"]]: requestObject
            ? requestObject[key as keyof VendorQueryParams["requestObject"]]
            : undefined,
        };
      }, requestObject);
  }

  return useQuery({
    queryKey: [queryCore.GET_VENDOR_LIST, requestObject, pageCurrent, pageSize],
    queryFn: () => vendorAPIs.getList(queryParams),
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

export const useGetVendorDetailCoreQuery = ({ recId, enabled = false }: { recId?: number; enabled: boolean }) => {
  return useQuery({
    queryKey: [queryCore.GET_VENDOR_DETAIL, recId],
    queryFn: () => vendorAPIs.getDetail(recId),
    select: (response) => {
      return response.result;
    },
    enabled,
  });
};
