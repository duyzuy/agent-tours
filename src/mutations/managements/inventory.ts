import { inventoryAPIs } from "@/services/management/cores/inventory";
import { IInventoryListRs, IInventoryPayload } from "@/models/management/core/inventory.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateInventoryMutation = () => {
  return useCustomMutation<IInventoryListRs, IInventoryPayload>({
    mutationFn: (payload) => inventoryAPIs.create(payload),
  });
};

export const useUpdateInventoryMutation = () => {
  return useCustomMutation<IInventoryListRs, { recId: number; name: string }>({
    mutationFn: (payload) => inventoryAPIs.update(payload.recId, payload.name),
  });
};

export const useApprovalInventoryMutation = () => {
  return useCustomMutation<IInventoryListRs, { recId: number }>({
    mutationFn: (payload) => inventoryAPIs.approve(payload.recId),
  });
};

export const useDeleteInventoryMutation = () => {
  return useCustomMutation<IInventoryListRs, { recId: number }>({
    mutationFn: (payload) => inventoryAPIs.delete(payload.recId),
  });
};
