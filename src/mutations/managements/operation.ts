import {
  operationAPIs,
  operationDeadlineAPIs,
  operationCostingAPIs,
  operationRoomingAPIs,
  operationCostingDetailAPIs,
} from "@/services/management/cores/operation";
import { useCustomMutation } from "../useCustomMutation";
import { IOperation, IOperationStatus, OperationPayload } from "@/models/management/core/operation.interface";
import { OperationCostingPayload } from "@/models/management/core/operationCosting.interface";
import { OperationCostingDetailPayload } from "@/models/management/core/operationCostingDetail.interface";
import { OperationDeadlinePayload } from "@/models/management/core/operationDeadline.interface";
import { RoomingPayload, RoomingHandOverPayload } from "@/models/management/booking/rooming.interface";

export const useCreateOperationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationPayload) => operationAPIs.create(payload),
  });
};

export const useUpdateOperationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationPayload) => operationAPIs.update(payload),
  });
};

export const useUpdateStatusOperationMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { id?: number; status?: IOperationStatus }) => operationAPIs.updateStatus(payload),
  });
};

export const useCreateOperationDeadlineMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationDeadlinePayload) => operationDeadlineAPIs.create(payload),
  });
};

export const useUpdateOperationDeadlineMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationDeadlinePayload) => operationDeadlineAPIs.update(payload),
  });
};

/**
 *
 * costing
 *
 */
export const useCreateOperationCostingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationCostingPayload) => operationCostingAPIs.create(payload),
  });
};

export const useDeleteOperationCostingMutation = () => {
  return useCustomMutation({
    mutationFn: (costingId?: number) => operationCostingAPIs.delete(costingId),
  });
};

export const useCreateOperationCostingDetailMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationCostingDetailPayload) => operationCostingDetailAPIs.create(payload),
  });
};

export const useToggleLockOperationCostingDetailMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { costingDetailsId?: number; isLocked?: boolean }) =>
      operationCostingDetailAPIs.toggleLock(payload),
  });
};

export const useUpdateOperationCostingDetailMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: OperationCostingDetailPayload) => operationCostingDetailAPIs.update(payload),
  });
};

export const useCompleteOperationCostingDetailMutation = () => {
  return useCustomMutation({
    mutationFn: (costingDetailsId?: number) => operationCostingDetailAPIs.complete(costingDetailsId),
  });
};

export const useDeleteOperationCostingDetailMutation = () => {
  return useCustomMutation({
    mutationFn: (costingDetailsId?: number) => operationCostingDetailAPIs.delete(costingDetailsId),
  });
};

/**
 * Rooming
 */
export const useUpdateRoomingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RoomingPayload) => operationRoomingAPIs.updateRoomingList(payload),
  });
};

export const useHandOverRoomingMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: RoomingHandOverPayload) => operationRoomingAPIs.handOver(payload),
  });
};
