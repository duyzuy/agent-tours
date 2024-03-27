import { BaseResponse } from "./management/common.interface";
import {
    PolicyCat,
    PolicyRule,
} from "@/models/management/core/ruleAndPolicy.interface";
export interface IRuleAndPolicy {
    id: number;
    cat: PolicyCat;
    catName: string;
    rule: PolicyRule;
    ruleName: string;
    maTour: string;
    soNgay: number;
    soTien: number;
    soGio: number;
    destId: number;
}

export interface IRuleAndPolicyListRs extends BaseResponse<IRuleAndPolicy[]> {}
export interface IRuleAndPolicyRs extends BaseResponse<IRuleAndPolicy> {}
