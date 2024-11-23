import { PolicyCat, PolicyRule, PolicyType } from "@/models/management/core/ruleAndPolicy.interface";
import { IRuleAndPolicyPayload } from "@/models/management/core/ruleAndPolicy.interface";

export class DepositRuleAndPolicyFormData implements IRuleAndPolicyPayload {
  type?: PolicyType;
  typeName?: string;
  cat?: PolicyCat;
  catName?: string;
  rule?: PolicyRule;
  ruleName?: string; //lấy từ core
  maTour?: string;
  soNgay?: number;
  soTien?: number;
  destId?: number;
  constructor(
    type: PolicyType | undefined,
    typeName: string | undefined,
    cat: PolicyCat | undefined,
    catName: string | undefined,
    rule: PolicyRule | undefined,
    ruleName: string | undefined,
    maTour: string | undefined,
    soNgay: number | undefined,
    soTien: number | undefined,
    destId: number | undefined,
  ) {
    this.type = type;
    this.typeName = typeName;
    this.cat = cat;
    this.catName = catName;
    this.rule = rule;
    this.ruleName = ruleName;
    this.maTour = maTour;
    this.soNgay = soNgay;
    this.soTien = soTien;
    this.destId = destId;
  }
}

export class LimitTimeBookingRuleAndPolicyFormData implements IRuleAndPolicyPayload {
  type?: PolicyType;
  typeName?: string;
  cat?: PolicyCat;
  catName?: string;
  rule?: PolicyRule;
  ruleName?: string; //lấy từ core
  maTour?: string;
  soGio?: number;
  destId?: number;
  constructor(
    type: PolicyType | undefined,
    typeName: string | undefined,
    cat: PolicyCat | undefined,
    catName: string | undefined,
    rule: PolicyRule | undefined,
    ruleName: string | undefined,
    maTour: string | undefined,
    soGio: number | undefined,
    destId: number | undefined,
  ) {
    this.type = type;
    this.typeName = typeName;
    this.cat = cat;
    this.catName = catName;
    this.rule = rule;
    this.ruleName = ruleName;
    this.maTour = maTour;
    this.soGio = soGio;
    this.destId = destId;
  }
}

export class PenaltyRuleAndPolicyFormData implements IRuleAndPolicyPayload {
  type?: PolicyType;
  typeName?: string;
  cat?: PolicyCat;
  catName?: string;
  rule?: PolicyRule;
  ruleName?: string; //lấy từ core
  maTour?: string;
  soTien?: number;
  soNgay?: number;
  destId?: number;
  constructor(
    type: PolicyType | undefined,
    typeName: string | undefined,
    cat: PolicyCat | undefined,
    catName: string | undefined,
    rule: PolicyRule | undefined,
    ruleName: string | undefined,
    maTour: string | undefined,
    soNgay: number | undefined,
    soTien: number | undefined,
    destId: number | undefined,
  ) {
    this.type = type;
    this.typeName = typeName;
    this.cat = cat;
    this.catName = catName;
    this.rule = rule;
    this.ruleName = ruleName;
    this.maTour = maTour;
    this.soNgay = soNgay;
    this.soTien = soTien;
    this.destId = destId;
  }
}
