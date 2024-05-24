import { vendorAPIs } from "@/services/management/cores/vendor";

import { useMutation } from "@tanstack/react-query";
import {
    VendorPayload,
    VendorUpdatePayload,
} from "@/models/management/vendor.interface";

//create folder in public/uploads folder.

export const useCreateVendorMutation = () => {
    return useMutation({
        mutationFn: (payload: VendorPayload) => vendorAPIs.create(payload),
    });
};

export const useUpdateVendorMutation = () => {
    return useMutation({
        mutationFn: (payload: VendorUpdatePayload) =>
            vendorAPIs.update(payload),
    });
};

export const useApprovalVendorMutation = () => {
    return useMutation({
        mutationFn: (recId?: number) => vendorAPIs.approval(recId),
    });
};

export const useDeleteVendorMutation = () => {
    return useMutation({
        mutationFn: (recId?: number) => vendorAPIs.delete(recId),
    });
};

export const useDeactiveVendorMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => vendorAPIs.deactive(recId),
    });
};

export const useActiveVendorMutation = () => {
    return useMutation({
        mutationFn: (recId: number) => vendorAPIs.active(recId),
    });
};
