import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import { stockInventoryAPIs } from "@/services/management/cores/stockInventory";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "@/constants/common";

export const useGetStockInventoryTypeCoreQuery = (type?: string) => {
  return useQuery({
    queryKey: [queryCore.GET_STOCK_INVENTORY_TYPE, type],
    queryFn: () => stockInventoryAPIs.getStockType(type),
    select: (data) => data.result,
    enabled: Boolean(type),
  });
};

export const useGetStockInventoryListCoreQuery = ({
  queryparams,
  enabled,
}: {
  enabled?: boolean;
  queryparams?: StockQueryParams;
}) => {
  let { requestObject, pageCurrent, pageSize } = queryparams || {};

  const convertDateFormat = (dateStr: string) => {
    return dayjs(dateStr).locale("en").format(DATE_TIME_FORMAT);
  };
  const startDate = requestObject?.start ? convertDateFormat(requestObject.start) : undefined;
  const endDate = requestObject?.end ? convertDateFormat(requestObject.end) : undefined;
  const validDate = requestObject?.valid ? convertDateFormat(requestObject.valid) : undefined;
  const validToDate = requestObject?.validTo ? convertDateFormat(requestObject.validTo) : undefined;

  queryparams = {
    ...queryparams,
    requestObject: {
      ...queryparams?.requestObject,
      start: startDate,
      end: endDate,
      valid: validDate,
      validTo: validToDate,
    },
  };

  return useQuery({
    queryKey: [
      queryCore.GET_STOCK_LIST_INVENTORY,
      pageCurrent,
      pageSize,
      {
        inventoryId: Number(requestObject?.inventoryId),
        type: requestObject?.type,
        productType: requestObject?.productType,
        inventoryType: requestObject?.inventoryType,
        start: startDate,
        end: endDate,
        valid: validDate,
        validTo: validToDate,
      },
    ],
    queryFn: () => stockInventoryAPIs.getStockList(queryparams),
    select: (data) => {
      const { result, pageCurrent, pageSize, totalPages, totalItems } = data;
      return {
        list: result,
        pageCurrent,
        pageSize,
        totalItems,
        totalPages,
      };
    },
    enabled: enabled,
  });
};

export const useGetStockDetailInventoryCoreQuery = ({
  inventoryStockId,
  enabled,
}: {
  inventoryStockId: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_STOCK_DETAIL_INVENTORY, Number(inventoryStockId)],
    queryFn: () => stockInventoryAPIs.getStockDetail(inventoryStockId),
    select: (data) => data.result,
    enabled: enabled,
  });
};
