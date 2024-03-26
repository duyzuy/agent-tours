export interface IRuleAndPolicyPayload {
    cat?: string; //lấy từ core
    catName?: string; //lấy từ core
    rule?: string; //lấy từ core
    ruleName?: string; //lấy từ core
    maTour?: string;
    soNgay?: number;
    soTien?: number;
    soGio?: number;
    destId?: number;
}

export class RuleAndPolicyFormData {
    cat?: string;
    catName?: string;
    rule?: string;
    ruleName?: string; //lấy từ core
    maTour?: string;
    soNgay?: number;
    soTien?: number;
    soGio?: number;
    destId?: number;
    constructor(
        cat: string | undefined,
        catName: string | undefined,
        rule: string | undefined,
        ruleName: string | undefined,
        maTour: string | undefined,
        soNgay: number | undefined,
        soTien: number | undefined,
        soGio: number | undefined,
        destId: number | undefined,
    ) {
        this.cat = cat;
        this.catName = catName;
        this.rule = rule;
        this.ruleName = ruleName;
        this.maTour = maTour;
        this.soNgay = soNgay;
        this.soTien = soTien;
        this.soGio = soGio;
        this.destId = destId;
    }
}
