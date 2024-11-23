import { BaseResponse } from "./common.interface";
import { PolicyCat, PolicyRule, PolicyType } from "@/models/management/core/ruleAndPolicy.interface";
import { IStateProvince } from "./management/region.interface";
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
  destList: IStateProvince[];
}

export interface IRuleAndPolicyListRs extends BaseResponse<IRuleAndPolicy[]> {}
export interface IRuleAndPolicyRs extends BaseResponse<IRuleAndPolicy> {}
