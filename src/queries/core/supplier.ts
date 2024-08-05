import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { supplierAPIs } from "@/services/management/cores/supplier";
import { SupplierQueryParams } from "@/models/management/supplier.interface";

export const useGetSupplierListCoreQuery = ({
  queryParams,
  enabled = false,
}: {
  queryParams?: SupplierQueryParams;
  enabled?: boolean;
}) => {
  let { requestObject, pageCurrent, pageSize } = queryParams || {};

  if (requestObject) {
    requestObject = Object.keys(requestObject)
      .sort()
      .reduce<SupplierQueryParams["requestObject"]>((acc, key) => {
        return {
          ...acc,
          [key as keyof SupplierQueryParams["requestObject"]]: requestObject
            ? requestObject[key as keyof SupplierQueryParams["requestObject"]]
            : undefined,
        };
      }, requestObject);
  }

  return useQuery({
    queryKey: [queryCore.GET_SUPPLIER_LIST, requestObject, pageCurrent, pageSize],
    queryFn: () => supplierAPIs.getList(queryParams),
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

export const useGetSupplierDetailCoreQuery = ({ recId, enabled = false }: { recId?: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: [queryCore.GET_SUPPLIER_DETAIL, recId],
    queryFn: () => supplierAPIs.getDetail(recId),
    select: (response) => response.result,
    enabled: enabled,
  });
};
