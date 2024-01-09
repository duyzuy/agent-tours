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
    valid: string | Date; //ddMMMyy HH:mm (global/us locale)
    validTo: string | Date;
    start: string | Date;
    end: string | Date;
    fromValidTo?: string | Date; //<<========= có truyền giá trị chỗ này trở xuống = add Serial
    everyDayofweek: string[]; //Sunday Monday Tuesday Wednesday Thursday Friday Saturday (global/us locale)
    repeatAfter: number;
    exclusives: {
        from: string | Date | undefined;
        to: string | Date | undefined;
    }[];
}
export interface IStockConfirmPayload {
    recId: number;
    cap: number;
    description?: string;
    valid: string | Date;
    validTo: string | Date;
    start: string | Date;
    end: string | Date;
}

export class StockInventoryFormData implements Partial<IStockPayload> {
    inventoryId: number;
    type: string;
    code: string;
    description: string;
    cap: number;
    valid: string | Date | undefined;
    validTo: string | Date | undefined;
    start: string | Date | undefined;
    end: string | Date | undefined;
    fromValidTo: string;
    everyDayofweek: string[];
    repeatAfter: number;
    exclusives: {
        from: string | Date | undefined;
        to: string | Date | undefined;
    }[];
    constructor(
        inventoryId: number,
        type: string,
        code: string,
        description: string,
        cap: number,
        valid: string | Date | undefined,
        validTo: string | Date | undefined,
        start: string | Date | undefined,
        end: string | Date | undefined,
        fromValidTo: string,
        everyDayofweek: string[],
        repeatAfter: number,
        exclusives: {
            from: Date;
            to: Date;
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

export class StockInventoryConfirmFormData
    implements Partial<IStockConfirmPayload>
{
    recId: number;
    description: string;
    cap: number;
    valid: string | Date | undefined;
    validTo: string | Date | undefined;
    start: string | Date | undefined;
    end: string | Date | undefined;

    constructor(
        recId: number,
        description: string,
        cap: number,
        valid: string | Date | undefined,
        validTo: string | Date | undefined,
        start: string | Date | undefined,
        end: string | Date | undefined,
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
