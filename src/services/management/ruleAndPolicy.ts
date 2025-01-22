import { client } from "../api";
import { IRuleAndPolicyPayload } from "@/models/management/core/ruleAndPolicy.interface";
import { IRuleAndPolicyListRs, IRuleAndPolicyRs } from "@/models/ruleAndPolicy.interface";
export const localRuleAndPolicyAPIs = {
  create: async (payload: IRuleAndPolicyPayload) => {
    return await client.post<IRuleAndPolicyRs>("local/RuleAndPolicy_Addnew", {
      isAuth: true,
      params: {
        requestObject: { ...payload },
      },
    });
  },
  getList: async () => {
    return await client.post<IRuleAndPolicyListRs>("local/RuleAndPolicy_List", {
      isAuth: true,
      params: {
        requestObject: {},
      },
    });
  },
  delete: async (id?: number) => {
    return await client.post<any>("local/RuleAndPolicy_Delete", {
      isAuth: true,
      params: {
        requestObject: {
          id,
        },
      },
    });
  },
};
