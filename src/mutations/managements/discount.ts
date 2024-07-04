import { discountAPIs } from "@/services/management/cores/discount";

import { IDiscountPolicyPayload } from "@/models/management/core/discountPolicy.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateDiscountPolicyMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: IDiscountPolicyPayload) => discountAPIs.create(payload),
  });
};

export const useDeactiveDiscountPolicyMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number } | { code: string } | undefined) => discountAPIs.deActive(payload),
  });
};

export const useActiveDiscountPolicyMutation = () => {
  return useCustomMutation({
    mutationFn: (payload: { recId: number } | { code: string } | undefined) => discountAPIs.confirm(payload),
  });
};
