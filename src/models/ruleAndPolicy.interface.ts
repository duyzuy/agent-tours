import { BaseResponse } from "./management/common.interface";
import {
    PolicyCat,
    PolicyRule,
    PolicyType,
} from "@/models/management/core/ruleAndPolicy.interface";
export interface IRuleAndPolicy {
    id: number;
    cat: PolicyCat;
    type: PolicyType;
    typeName: string;
    catName: string;
    rule: PolicyRule;
    ruleName: string;
    maTour: string;
    soNgay: number;
    soTien: number;
    soGio: number;
    destId: number;
    destJson: string;
}

export interface IRuleAndPolicyListRs extends BaseResponse<IRuleAndPolicy[]> {}
export interface IRuleAndPolicyRs extends BaseResponse<IRuleAndPolicy> {}
