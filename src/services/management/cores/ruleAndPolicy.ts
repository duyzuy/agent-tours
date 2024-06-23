import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import {
    RuleAndPolicyCatListRs,
    RuleAndPolicyRuleListRs,
} from "@/models/management/core/ruleAndPolicy.interface";
export const ruleAndPolicyAPIs = {
    getDepoRuleList: async () => {
        return await coreApi.post<RuleAndPolicyRuleListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetDeposit_Rule",
            {
                requestObject: {},
            },
        );
    },
    getDepoCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetDeposit_Cat",
            {
                requestObject: {},
            },
        );
    },

    getLimitTimeCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetBookingTimeLimit_Cat",
            {
                requestObject: {},
            },
        );
    },
    getLimitTimeRuleList: async () => {
        return await coreApi.post<RuleAndPolicyRuleListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetBookingTimeLimit_Rule",
            {
                requestObject: {},
            },
        );
    },
    getPenaltyCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetPenalty_Cat",
            {
                requestObject: {},
            },
        );
    },
    getPenaltyRuleList: async () => {
        return await coreApi.post<RuleAndPolicyRuleListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetPenalty_Rule",
            {
                requestObject: {},
            },
        );
    },
};
