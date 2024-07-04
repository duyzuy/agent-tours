import { localRuleAndPolicyAPIs } from "@/services/management/ruleAndPolicy";
import { IRuleAndPolicyPayload } from "@/app/(management)/portal/rule-policy/modules/ruleAndPolicy.interface";
import { IRuleAndPolicyRs } from "@/models/ruleAndPolicy.interface";
import { useCustomMutation } from "../useCustomMutation";

//create folder in public/uploads folder.

export const useCreateRuleAndPolicyMutation = () => {
  return useCustomMutation<IRuleAndPolicyRs, IRuleAndPolicyPayload>({
    mutationFn: (payload) => localRuleAndPolicyAPIs.create(payload),
  });
};

export const useDeleteRuleAndPolicyMutation = () => {
  return useCustomMutation<any, number>({
    mutationFn: (id) => localRuleAndPolicyAPIs.delete(id),
  });
};
