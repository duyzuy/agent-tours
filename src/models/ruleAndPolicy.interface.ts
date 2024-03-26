import { BaseResponse } from "./management/common.interface";

export interface IRuleAndPolicy {
    id: number;
    cat: string;
    catName: string;
    rule: string;
    ruleName: string;
    maTour: string;
    soNgay: number;
    soTien: number;
    soGio: number;
    destId: number;
}

export interface IRuleAndPolicyListRs extends BaseResponse<IRuleAndPolicy[]> {}
export interface IRuleAndPolicyRs extends BaseResponse<IRuleAndPolicy> {}
