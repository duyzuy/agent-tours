import { useQuery } from "@tanstack/react-query";
import { queryCore } from "../var";

import { ruleAndPolicyAPIs } from "@/services/management/cores/ruleAndPolicy";

export const useGetRuleAndPolicyDepositCatListCoreQuery = (options?: {
    enabled?: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_RULE_POLICY_DEPOSIT_CAT_LIST],
        queryFn: () => ruleAndPolicyAPIs.getDepoCatList(),
        select: (data) => data.result,
        enabled: options?.enabled || false,
    });
};

export const useGetRuleAndPolicyDepositRuleListCoreQuery = (options?: {
    enabled?: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_RULE_POLICY_DEPOSIT_RULE_LIST],
        queryFn: () => ruleAndPolicyAPIs.getDepoRuleList(),
        select: (data) => data.result,
        enabled: options?.enabled || false,
    });
};

export const useGetRuleAndPolicyLimitTimeCatListCoreQuery = (options?: {
    enabled?: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_RULE_POLICY_LIMIT_TIME_CAT_LIST],
        queryFn: () => ruleAndPolicyAPIs.getLimitTimeCatList(),
        select: (data) => data.result,
        enabled: options?.enabled || false,
    });
};

export const useGetRuleAndPolicyLimitTimeRuleListCoreQuery = (options?: {
    enabled?: boolean;
}) => {
    return useQuery({
        queryKey: [queryCore.GET_RULE_POLICY_LIMIT_TIME_RULE_LIST],
        queryFn: () => ruleAndPolicyAPIs.getLimitTimeRuleList(),
        select: (data) => data.result,
        enabled: options?.enabled || false,
    });
};
