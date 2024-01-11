import { BaseResponse, Status } from "../common.interface";

export enum EStockInventoryType {
    AIR = "AIR",
    VISA = "VISA",
    HOTEL = "HOTEL",
    GUIDE = "GUIDE",
    TRANSPORT = "TRANSPORT",
    RESTAURANT = "RESTAURANT",
    LANDPACKAGE = "LANDPACKAGE",
    INSURANCE = "INSURANCE",
}

export interface IStockInventoryTypeRs extends BaseResponse<string[]> {}

export interface IStockInventoryQueryParams {
    type: string;
    valid: string | Date;
    validTo: string | Date;
    start: string | Date;
    end: string | Date;
}

export class StockInventoryQueryparams implements IStockInventoryQueryParams {
    type: string;
    valid: string | Date;
    validTo: string | Date;
    start: string | Date;
    end: string | Date;

    constructor(
        type: string,
        valid: string | Date,
        validTo: string | Date,
        start: string | Date,
        end: string | Date,
    ) {
        this.type = type;
        this.valid = valid;
        this.validTo = validTo;
        this.start = start;
        this.end = end;
    }
}

export interface IStock {
    recId: number;
    type: string;
    code: string;
    inventoryId: number;
    inventoryType: string;
    cap: number;
    used: number;
    avaiable: number;
    description: string;
    validFrom: string | Date;
    validTo: string | Date;
    startDate: string | Date;
    endDate: string | Date;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string | Date;
    sysLstUser: string;
    sysLstUpdate: string | Date;
    sysBelongTo: string;
    logStatus: string;
}
export interface IStockListOfInventoryRs extends BaseResponse<IStock[]> {}
export interface IStockPayload {
    inventoryId: number;
    type: string; //api 1.3
    code: string;
    cap: number;
    valid: string; //ddMMMyy HH:mm (global/us locale)
    validTo: string;
    start: string;
    end: string;
    fromValidTo?: string; //<<========= có truyền giá trị chỗ này trở xuống = add Serial
    everyDayofweek: string[]; //Sunday Monday Tuesday Wednesday Thursday Friday Saturday (global/us locale)
    repeatAfter: number;
    exclusives: {
        from: string | undefined;
        to: string | undefined;
    }[];
}

export class StockInventoryFormData implements Partial<IStockPayload> {
    inventoryId: number;
    type: string;
    code: string;
    description: string;
    cap: number;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
    fromValidTo?: string;
    everyDayofweek: string[];
    repeatAfter: number;
    exclusives: {
        from: string | undefined;
        to: string | undefined;
    }[];
    constructor(
        inventoryId: number,
        type: string,
        code: string,
        description: string,
        cap: number,
        valid: string | undefined,
        validTo: string | undefined,
        start: string | undefined,
        end: string | undefined,
        fromValidTo: string | undefined,
        everyDayofweek: string[],
        repeatAfter: number,
        exclusives: {
            from: string;
            to: string;
        }[],
    ) {
        this.inventoryId = inventoryId;
        this.type = type;
        this.code = code;
        this.description = description;
        this.cap = cap;
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
export interface IStockConfirmPayload {
    recId: number;
    cap: number;
    description?: string;
    valid: string;
    validTo: string;
    start: string;
    end: string;
}

export class StockInventoryConfirmFormData
    implements Partial<IStockConfirmPayload>
{
    recId: number;
    description: string;
    cap: number;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;

    constructor(
        recId: number,
        description: string,
        cap: number,
        valid: string | undefined,
        validTo: string | undefined,
        start: string | undefined,
        end: string | undefined,
    ) {
        this.recId = recId;
        this.description = description;
        this.cap = cap;
        this.valid = valid;
        this.validTo = validTo;
        this.start = start;
        this.end = end;
    }
}

export interface IStockAdjustment {
    cat: "ADJUST" | "INIT";
    inventoryStockId: number;
    logStatus: string;
    quantity: number;
    recId: number;
    rmk: string;
    sellableDetailsId: 0;
    sellableId: 0;
    status: Status;
    sysBelongTo: string;
    sysFstUpdate: string | Date;
    sysFstUser: string;
    sysLstUpdate: string | Date;
    sysLstUser: string;
}
export interface IStockAdjustPayload {
    inventoryStockId: number;
    quantity: number;
    rmk: string;
}

export class StockInventoryAdjustFormData
    implements Partial<IStockAdjustPayload>
{
    inventoryStockId: number;
    rmk: string;
    quantity: number;

    constructor(inventoryStockId: number, rmk: string, quantity: number) {
        this.inventoryStockId = inventoryStockId;
        this.rmk = rmk;
        this.quantity = quantity;
    }
}
