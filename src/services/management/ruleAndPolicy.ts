import { getAgToken } from "@/utils/common";
import { client } from "../api";

import { BaseResponse } from "@/models/management/common.interface";
import { IRuleAndPolicyPayload } from "@/app/portal/rule-policy/deposite/modules/ruleAndPolicy.interface";
import {
    IRuleAndPolicyListRs,
    IRuleAndPolicyRs,
} from "@/models/ruleAndPolicy.interface";
export const localRuleAndPolicyAPIs = {
    create: async (payload: IRuleAndPolicyPayload) => {
        return await client.post<IRuleAndPolicyRs, BaseResponse<null>>(
            "local/RuleAndPolicy_Addnew",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: { ...payload },
                },
            },
        );
    },
    getList: async () => {
        return await client.post<IRuleAndPolicyListRs, BaseResponse<null>>(
            "local/RuleAndPolicy_List",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {},
                },
            },
        );
    },
    delete: async (id?: number) => {
        return await client.post<any, BaseResponse<null>>(
            "local/RuleAndPolicy_Delete",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(
                        getAgToken() || "",
                    )}`,
                },
                params: {
                    requestObject: {
                        id,
                    },
                },
            },
        );
    },
};
