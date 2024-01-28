import { BaseResponse, Status } from "../common.interface";
import { IInventory } from "./inventory.interface";
import { IStock } from "./stockInventory.interface";

export class SellableQueryParams {
    sellableTemplateId?: number;
    andType?: string;
    andCodeLike?: string;
    pageCurrent?: number;
    pageSize?: number;
    status?: Status;
    constructor(
        sellableTemplateId: number | undefined,
        andType: string | undefined,
        andCodeLike: string | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
        status: Status | undefined,
    ) {
        this.sellableTemplateId = sellableTemplateId;
        this.andType = andType;
        this.andCodeLike = andCodeLike;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
        this.status = status;
    }
}

export interface ISellable {
    recId: number;
    sellableTemplateId: number;
    type: string;
    code: string;
    avaiable: number;
    cap: number;
    open: number;
    closeDate: string;
    deadlineJson: string;
    endDate: string;
    logStatus: string;
    startDate: string;
    status: Status;
    sysBelongTo: string;
    sysFstUpdate: string;
    sysFstUser: string;
    sysLstUpdate: string;
    sysLstUser: string;
    used: number;
    validFrom: string;
    validTo: string;
}
export interface ISellablePayload {
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
    sellableTemplateId?: number;
    type?: string;
    codeAffix?: string;
    cap?: number;
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
        sellableTemplateId: number | undefined,
        type: string | undefined,
        codeAffix: string | undefined,
        cap: number | undefined,
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
export interface SellableListRs extends BaseResponse<ISellable[]> {}

export interface SellableConfirmPayload {
    recId?: number;
    cap?: number;
    closeDate?: string;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
    inventories: {
        recId?: number;
        qty?: number;
    }[];

    stocks: {
        recId?: number;
        qty?: number;
    }[];

    extraInventories: {
        recId?: number;
        qty?: number;
    }[];
    extraStocks: {
        recId?: number;
        qty?: number;
    }[];

    otherSellables: {
        recId?: number;
        qty?: number;
    }[];
}

export class SellableConfirmFormData {
    recId?: number;
    cap?: number;
    closeDate?: string;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
    inventories: { inventory: Partial<IInventory>; qty: number }[];
    stocks: { stock: Partial<IStock>; qty: number }[];
    extraInventories: { inventory: Partial<IInventory>; qty: number }[];
    extraStocks: { stock: Partial<IStock>; qty: number }[];
    otherSellables: { sellable: Partial<ISellable>; qty: number }[];

    constructor(
        recId: number | undefined,
        cap: number | undefined,
        closeDate: string | undefined,
        valid: string | undefined,
        validTo: string | undefined,
        start: string | undefined,
        end: string | undefined,
        inventories: { inventory: Partial<IInventory>; qty: number }[],
        stocks: { stock: Partial<IStock>; qty: number }[],
        extraInventories: { inventory: Partial<IInventory>; qty: number }[],
        extraStocks: { stock: Partial<IStock>; qty: number }[],
        otherSellables: { sellable: Partial<ISellable>; qty: number }[],
    ) {
        this.recId = recId;
        this.cap = cap;
        this.closeDate = closeDate;
        this.valid = valid;
        this.validTo = validTo;
        this.start = start;
        this.end = end;
        this.inventories = inventories;
        this.stocks = stocks;
        this.extraInventories = extraInventories;
        this.extraStocks = extraStocks;
        this.otherSellables = otherSellables;
    }
}

export interface InventoryOfSellableItem {
    recId: number;
    qty: number;
    item: IInventory;
}
export interface StockOfSellableItem {
    recId: number;
    qty: number;
    item: IStock;
}
export interface SellableOfSellableItem {
    recId: number;
    qty: number;
    item: ISellable;
}
export interface SellableDetail {
    sellable: ISellable;
    inventories: InventoryOfSellableItem[];
    stocks: StockOfSellableItem[];
    extraInventories: InventoryOfSellableItem[];
    extraStocks: StockOfSellableItem[];
    otherSellables: SellableOfSellableItem[];
}
