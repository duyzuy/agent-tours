import { vendorAPIs } from "@/services/management/cores/vendor";
import { VendorPayload, VendorUpdatePayload } from "@/models/management/vendor.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VendorPayload) => vendorAPIs.create(payload),
  });
};

export const useUpdateVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: VendorUpdatePayload) => vendorAPIs.update(payload),
  });
};

export const useApprovalVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (recId?: number) => vendorAPIs.approval(recId),
  });
};

export const useDeleteVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (recId?: number) => vendorAPIs.delete(recId),
  });
};

export const useDeactiveVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => vendorAPIs.deactive(recId),
  });
};

export const useActiveVendorMutation = () => {
  return useCustomMutation({
    mutationFn: (recId: number) => vendorAPIs.active(recId),
  });
};
