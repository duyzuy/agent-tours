import {
    PolicyCat,
    PolicyRule,
} from "@/models/management/core/ruleAndPolicy.interface";
export interface IRuleAndPolicyPayload {
    cat?: PolicyCat; //lấy từ core
    catName?: string; //lấy từ core
    rule?: PolicyRule; //lấy từ core
    ruleName?: string; //lấy từ core
    maTour?: string;
    soNgay?: number;
    soTien?: number;
    soGio?: number;
    destId?: number;
}

export class DepositRuleAndPolicyFormData implements IRuleAndPolicyPayload {
    cat?: PolicyCat;
    catName?: string;
    rule?: PolicyRule;
    ruleName?: string; //lấy từ core
    maTour?: string;
    soNgay?: number;
    soTien?: number;
    destId?: number;
    constructor(
        cat: PolicyCat | undefined,
        catName: string | undefined,
        rule: PolicyRule | undefined,
        ruleName: string | undefined,
        maTour: string | undefined,
        soNgay: number | undefined,
        soTien: number | undefined,
        destId: number | undefined,
    ) {
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

export class LimitTimeBookingRuleAndPolicyFormData
    implements IRuleAndPolicyPayload
{
    cat?: PolicyCat;
    catName?: string;
    rule?: PolicyRule;
    ruleName?: string; //lấy từ core
    maTour?: string;
    soGio?: number;
    destId?: number;
    constructor(
        cat: PolicyCat | undefined,
        catName: string | undefined,
        rule: PolicyRule | undefined,
        ruleName: string | undefined,
        maTour: string | undefined,
        soGio: number | undefined,
        destId: number | undefined,
    ) {
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
    cat?: PolicyCat;
    catName?: string;
    rule?: PolicyRule;
    ruleName?: string; //lấy từ core
    maTour?: string;
    soTien?: number;
    soNgay?: number;
    destId?: number;
    constructor(
        cat: PolicyCat | undefined,
        catName: string | undefined,
        rule: PolicyRule | undefined,
        ruleName: string | undefined,
        maTour: string | undefined,
        soNgay: number | undefined,
        soTien: number | undefined,
        destId: number | undefined,
    ) {
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
