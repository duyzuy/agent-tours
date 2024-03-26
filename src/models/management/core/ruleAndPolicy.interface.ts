import { BaseResponse } from "../common.interface";

export interface IRuleAndPolicyCat {
    cat: string;
    key: string;
    name: string;
    priority: number;
}

export interface IRuleAndPolicyRule {
    cat: string;
    key: string;
    name: string;
    note: string;
}

export interface RuleAndPolicyCatListRs
    extends BaseResponse<IRuleAndPolicyCat[]> {}
export interface RuleAndPolicyRuleListRs
    extends BaseResponse<IRuleAndPolicyRule[]> {}
