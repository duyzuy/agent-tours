import { BaseResponse } from "../common.interface";

export interface SellablePayload {
    sellableTemplateId: number;
    type: string; //1.2 productType = SellableTemplate
    codeAffix: string; //templateCode + Affix(nếu có) + validDate.Tostring(): chỉ cần nhập affix
    cap: number;
    closeDate: string; //   valid < close < validto
    valid: string;
    validTo: string;
    start: string;
    end: string; // end < validto
    fromValidTo: string;
    everyDayofweek: string[];
    repeatAfter: number;
    exclusives: {
        from: string;
        to: string;
    }[];
}

export class SellableFormData {
    sellableTemplateId: number;
    type: string;
    codeAffix: string;
    cap: number;
    closeDate?: string;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
    fromValidTo?: string;
    everyDayofweek: string[];
    repeatAfter: number;
    exclusives: {
        from?: string;
        to?: string;
    }[];

    constructor(
        sellableTemplateId: number,
        type: string,
        codeAffix: string,
        cap: number,
        closeDate: string | undefined,
        valid: string | undefined,
        validTo: string | undefined,
        start: string | undefined,
        end: string | undefined,
        fromValidTo: string | undefined,
        everyDayofweek: string[],
        repeatAfter: number,
        exclusives: {
            from: string | undefined;
            to: string | undefined;
        }[],
    ) {
        this.sellableTemplateId = sellableTemplateId;
        this.type = type;
        this.codeAffix = codeAffix;
        this.cap = cap;
        this.closeDate = closeDate;
        this.valid = valid;
        this.validTo = validTo;
        this.start = start;
        this.end = end;
        this.fromValidTo = fromValidTo;
        this.everyDayofweek = everyDayofweek;
        this.repeatAfter = repeatAfter;
        this.exclusives = exclusives;
    }
}
export interface SellableListRs extends BaseResponse<any> {}

export interface SellableConfirmPayload {
    recId: number;
    cap: number;
    closeDate: "string";
    valid: "string";
    validTo: "string";
    start: "string";
    end: "string";
    //stocks, extrasStokcs, otherSellables
    //khi Cfm 1 Sellable để mở bán => cần select các Inventory/Stock tương ứng
    inventories: //(Stocks.count + Inventories.count) là bắt buộc > 1.
    //ở inventory, pick các inventory KHÔNG CÓ STOCK
    //InventoryType phải match với list trong template: vd AIR||HOTEL||VISA
    {
        recId: number; //recId của Inventory
        qty: number; //qty của stock luôn = cap bên trên
    }[];

    stocks: //(Stocks.count + Inventories.count) là bắt buộc > 1.
    //ở stocks, cần pick InventoryStock cụ thể
    //InventoryType của stock phải match với list trong template: vd AIR||HOTEL||VISA
    {
        recId: number; //recId của InventoryStock
        qty: number; //qty của stock luôn = cap bên trên
    }[];

    extraInventories: //optional, quy tắc như trên, đây là phần SSR
    {
        recId: number; //InventoryRecId
        qty: number; //qty có thể nhập, cần < CAP bên trên
    }[];

    extraStocks: //optional
    {
        recId: number; //InventoryStockRecId
        qty: number; //qty có thể nhập, cần < CAP bên trên
    }[];

    otherSellables: //optional
    //gắn SSR là 1 Sellable khác, để bán kèm Sellable hiện tại
    {
        recId: number; //SellableRecId
        qty: number; //qty có thể nhập, cần < CAP bên trên
    }[];
}
