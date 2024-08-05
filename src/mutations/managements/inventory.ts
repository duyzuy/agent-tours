import { inventoryAPIs } from "@/services/management/cores/inventory";
import { IInventoryListRs, IInventoryPayload } from "@/models/management/core/inventory.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateInventoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IInventoryPayload) => inventoryAPIs.create(payload),
  });
};

export const useUpdateInventoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number; name: string }) => inventoryAPIs.update(payload.recId, payload.name),
  });
};

export const useApprovalInventoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number }) => inventoryAPIs.approve(payload.recId),
  });
};

export const useDeleteInventoryMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number }) => inventoryAPIs.delete(payload.recId),
  });
};
