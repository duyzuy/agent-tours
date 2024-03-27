import { BaseResponse } from "../common.interface";

export enum PolicyTypeCat {
    BOOKING_TIMELIMIT_CAT = "BOOKING_TIMELIMIT_CAT",
    DEPOSIT_CAT = "DEPOSIT_CAT",
    PENALTY_CAT = "PENALTY_CAT",
}

export enum PolicyTypeRule {
    BOOKING_TIMELIMIT_CAT = "DEPOSIT_RULE",
    DEPOSIT_CAT = "BOOKING_TIMELIMIT_RULE",
    PENALTY_RULE = "PENALTY_RULE",
}

export enum PolicyCat {
    BYAGENT = "BYAGENT",
    BYTOURCODE = "BYTOURCODE",
    BYDESTINATION = "BYDESTINATION",
}
export enum PolicyRule {
    "30BEFOR_DEPART" = "30BEFOR_DEPART",
    "50BEFOR_DEPART" = "50BEFOR_DEPART",
    "70BEFOR_DEPART" = "70BEFOR_DEPART",
    "100BEFOR_DEPART" = "100BEFOR_DEPART",
    AMOUNTBEFOR_DEPART = "AMOUNTBEFOR_DEPART",
    HOURSAFTER_BOOK = "HOURSAFTER_BOOK",
    FIXAMOUNT = "FIXAMOUNT",
    "100TOTAL" = "100TOTAL",
    "70TOTAL" = "70TOTAL",
    "50TOTAL" = "50TOTAL",
    "30TOTAL" = "30TOTAL",
}

export interface IRuleAndPolicyCat {
    cat: PolicyTypeCat;
    key: PolicyCat;
    name: string;
    priority: number;
}

export interface IRuleAndPolicyRule {
    cat: PolicyTypeRule;
    key: PolicyRule;
    name: string;
    note: string;
}

export interface RuleAndPolicyCatListRs
    extends BaseResponse<IRuleAndPolicyCat[]> {}
export interface RuleAndPolicyRuleListRs
    extends BaseResponse<IRuleAndPolicyRule[]> {}
