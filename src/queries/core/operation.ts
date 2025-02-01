import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";
import {
  operationAPIs,
  operationCostingAPIs,
  operationCostingDetailAPIs,
  operationDeadlineAPIs,
  operationRoomingAPIs,
  operationThingTodoAPIs,
} from "@/services/management/cores/operation";
import {
  OperationCostingListResponse,
  OperationCostingParams,
} from "@/models/management/core/operation/operationCosting.interface";
import { OperationQueryParams } from "@/models/management/core/operation/operation.interface";
import { OperationThingTodoQueryParams } from "@/models/management/core/operation/operationThingTodo.interface";
import { supplierAPIs } from "@/services/management/cores/supplier";
import { SupplierRs } from "@/models/management/supplier.interface";
import { OperationDeadlineQueryParams } from "@/models/management/core/operation/operationDeadline.interface";

export const useGetOperationListQuery = (queryParams?: OperationQueryParams) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_LIST],
    queryFn: () => operationAPIs.getList(queryParams),
    select: (data) => {
      return data.result;
    },
  });
};

export const useGetOperationDetailQuery = ({ operationId }: { operationId?: number }) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_DETAIL, operationId],
    queryFn: () => operationAPIs.detail(operationId),
    select: (data) => {
      return data.result;
    },
  });
};

export const useGetOperationDeadlineDetailQuery = ({ id }: { id?: number }) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_DEADLINE_DETAIL, id],
    queryFn: () => operationDeadlineAPIs.detail(id),
  });
};

export const useGetOperationDeadlineListQuery = (options: {
  queryParams: OperationDeadlineQueryParams;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST, options.queryParams],
    queryFn: () => operationDeadlineAPIs.getList(options.queryParams),
    select: (data) => ({
      list: data.result,
      pageCurrent: data.pageCurrent,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
    }),
    enabled: options.enabled,
  });
};

export const useGetOperationCostingListQuery = (options?: {
  queryParams?: OperationCostingParams;
  enabled?: boolean;
}) => {
  const { queryParams, enabled } = options || {};
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_COSTING_LIST, queryParams],
    queryFn: async () => {
      try {
        const costingResponse = await operationCostingAPIs.getList(queryParams);

        let costingListWithSupplierDetail: (OperationCostingListResponse["result"][number] & {
          supplier: SupplierRs["result"];
        })[] = [];

        // await Promise.all(
        //   costingResponse["result"].map(async (item) => {
        //     const supplierResponse = await supplierAPIs.getDetail(item.supplierId);
        //     costingListWithSupplierDetail = [
        //       ...costingListWithSupplierDetail,
        //       { ...item, supplier: supplierResponse["result"] },
        //     ];
        //   }),
        // );

        //sequence
        for (const item of costingResponse["result"]) {
          const supplierResponse = await supplierAPIs.getDetail(item.supplierId);
          costingListWithSupplierDetail = [
            ...costingListWithSupplierDetail,
            { ...item, supplier: supplierResponse["result"] },
          ];
        }

        return costingListWithSupplierDetail;
      } catch (err) {
        throw new Error("Lỗi");
      }
    },
    select: (data) => data,
    enabled: enabled,
  });
};

export const useGetOperationCostingDetailsQuery = (options?: { costingId?: number; enabled?: boolean }) => {
  const { costingId, enabled = true } = options || {};
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL, costingId],
    queryFn: () => operationCostingDetailAPIs.getList(costingId),
    select: (data) => {
      return data.result;
    },
    enabled: enabled,
  });
};

export const useGetOperationCostingDetailQuery = (options?: { costingDetailsId?: number; enabled?: boolean }) => {
  const { costingDetailsId, enabled = true } = options || {};
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_COSTING_LIST_DETAIL_ONE, costingDetailsId],
    queryFn: () => operationCostingDetailAPIs.getOne(costingDetailsId),
    select: (data) => {
      return data.result;
    },
    enabled: enabled,
  });
};

export const useGetRoomingList = ({
  enabled = true,
  queryParams,
}: {
  enabled?: boolean;
  queryParams: { sellableId?: number; orderId?: number } | { operationId?: number };
}) => {
  return useQuery({
    queryKey: [queryCore.GET_ROOMING_LIST, { ...queryParams }],
    queryFn: () => operationRoomingAPIs.getRoomingList(queryParams),
    select: (data) => data.result,
    enabled: enabled,
  });
};

export const useGetOperationThingTodoList = ({
  enabled = true,
  queryParams,
}: {
  enabled?: boolean;
  queryParams: OperationThingTodoQueryParams;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_THING_TODO_LIST, { ...queryParams }],
    queryFn: () => operationThingTodoAPIs.getList(queryParams),
    select: (data) => data.result,
    enabled: enabled,
  });
};
