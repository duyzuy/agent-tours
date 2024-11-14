import { supplierAPIs } from "@/services/management/cores/supplier";
import { SupplierPayload } from "@/models/management/supplier.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: SupplierPayload) => supplierAPIs.create(payload),
  });
};

export const useUpdateSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: SupplierPayload) => supplierAPIs.update(payload),
  });
};

export const useApprovalSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => supplierAPIs.approval(recId),
  });
};

export const useDeleteSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => supplierAPIs.delete(recId),
  });
};

export const useDeactiveSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => supplierAPIs.deactive(recId),
  });
};

export const useActiveSupplierMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => supplierAPIs.active(recId),
  });
};
