import { supplierAPIs } from "@/services/management/cores/supplier";
import { useMutation } from "@tanstack/react-query";
import { SupplierPayload } from "@/models/management/supplier.interface";

//create folder in public/uploads folder.

export const useCreateSupplierMutation = () => {
    return useMutation({
        mutationFn: (payload: SupplierPayload) => supplierAPIs.create(payload),
    });
};

export const useUpdateSupplierMutation = () => {
    return useMutation({
        mutationFn: (payload: SupplierPayload) => supplierAPIs.update(payload),
    });
};

export const useApprovalSupplierMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => supplierAPIs.approval(recId),
    });
};

export const useDeleteSupplierMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => supplierAPIs.delete(recId),
    });
};

export const useDeactiveSupplierMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => supplierAPIs.deactive(recId),
    });
};

export const useActiveSupplierMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => supplierAPIs.active(recId),
    });
};
