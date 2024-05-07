import { discountAPIs } from "@/services/management/cores/discount";
import { useMutation } from "@tanstack/react-query";

import { IDiscountPolicyPayload } from "@/models/management/core/discountPolicy.interface";

//create folder in public/uploads folder.

export const useCreateDiscountPolicyMutation = () => {
    return useMutation({
        mutationFn: (payload: IDiscountPolicyPayload) =>
            discountAPIs.create(payload),
    });
};

export const useDeactiveDiscountPolicyMutation = () => {
    return useMutation({
        mutationFn: (
            payload: { recId: number } | { code: string } | undefined,
        ) => discountAPIs.deActive(payload),
    });
};

export const useActiveDiscountPolicyMutation = () => {
    return useMutation({
        mutationFn: (
            payload: { recId: number } | { code: string } | undefined,
        ) => discountAPIs.confirm(payload),
    });
};
