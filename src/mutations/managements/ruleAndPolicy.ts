import { useMutation } from "@tanstack/react-query";
import { BaseResponse } from "@/models/common.interface";
import { localRuleAndPolicyAPIs } from "@/services/management/ruleAndPolicy";
import { IRuleAndPolicyPayload } from "@/app/(management)/portal/rule-policy/modules/ruleAndPolicy.interface";
import { IRuleAndPolicyRs } from "@/models/ruleAndPolicy.interface";

//create folder in public/uploads folder.

export const useCreateRuleAndPolicyMutation = () => {
    return useMutation<
        IRuleAndPolicyRs,
        BaseResponse<null>,
        IRuleAndPolicyPayload
    >({
        mutationFn: (payload) => localRuleAndPolicyAPIs.create(payload),
    });
};

export const useDeleteRuleAndPolicyMutation = () => {
    return useMutation<any, BaseResponse<null>, number>({
        mutationFn: (id) => localRuleAndPolicyAPIs.delete(id),
    });
};
