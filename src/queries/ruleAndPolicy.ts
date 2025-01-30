import { useQuery } from "@tanstack/react-query";
import { queryCMS } from "./var";
import { localRuleAndPolicyAPIs } from "@/services/management/ruleAndPolicy";

export const useLocalGetRuleAndPolicyQuery = () => {
  return useQuery({
    queryKey: [queryCMS.GET_LOCAL_RULE_AND_POLICY_LIST],
    queryFn: () => localRuleAndPolicyAPIs.getList(),
    select(data) {
      return data.result;
    },
  });
};
