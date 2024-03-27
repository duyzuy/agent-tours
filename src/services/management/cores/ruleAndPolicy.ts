import { BaseResponse } from "@/models/management/common.interface";
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
                localUsername: "99",
            },
        );
    },
    getDepoCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetDeposit_Cat",
            {
                requestObject: {},
                localUsername: "99",
            },
        );
    },

    getLimitTimeCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetBookingTimeLimit_Cat",
            {
                requestObject: {},
                localUsername: "99",
            },
        );
    },
    getLimitTimeRuleList: async () => {
        return await coreApi.post<RuleAndPolicyRuleListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetBookingTimeLimit_Rule",
            {
                requestObject: {},
                localUsername: "99",
            },
        );
    },
    getPenaltyCatList: async () => {
        return await coreApi.post<RuleAndPolicyCatListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetPenalty_Cat",
            {
                requestObject: {},
                localUsername: "99",
            },
        );
    },
    getPenaltyRuleList: async () => {
        return await coreApi.post<RuleAndPolicyRuleListRs, BaseResponse<null>>(
            "core/RuleAndPolicy_GetPenalty_Rule",
            {
                requestObject: {},
                localUsername: "99",
            },
        );
    },
};
