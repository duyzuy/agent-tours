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
import { OperationCostingParams } from "@/models/management/core/operationCosting.interface";
import { OperationStatusPayload } from "@/models/management/core/operation.interface";
import { OperationThingTodoQueryParams } from "@/models/management/core/operationThingTodo.interface";

export const useGetOperationListQuery = () => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_LIST],
    queryFn: () => operationAPIs.getList(),
    select: (data) => {
      return data.result;
    },
  });
};

export const useGetOperationStatusQuery = ({
  queryParams,
  enabled = true,
}: {
  queryParams: OperationStatusPayload;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_STATUS, { ...queryParams }],
    queryFn: () => operationAPIs.getStatus(queryParams),
    retry: false,
    select: (data) => {
      return data.result;
    },
    enabled: enabled,
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

export const useGetOperationDeadlineListQuery = ({
  operationId,
  enabled = true,
}: {
  operationId?: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_DEADLINE_LIST, operationId],
    queryFn: () => operationDeadlineAPIs.getList(operationId),
    select: (data) => {
      return data.result;
    },
    enabled: enabled,
  });
};

export const useGetOperationCostingListQuery = (options?: {
  queryParams?: OperationCostingParams;
  enabled?: boolean;
}) => {
  const { queryParams, enabled } = options || {};
  return useQuery({
    queryKey: [queryCore.GET_OPERATION_COSTING_LIST, queryParams],
    queryFn: () => operationCostingAPIs.getList(queryParams),
    select: (data) => {
      return data.result;
    },
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
  queryParams: { sellableId?: number } | { operationId?: number };
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
