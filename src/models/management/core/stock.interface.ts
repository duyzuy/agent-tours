import { BaseResponse, Status } from "../common.interface";

export interface IStockTypeRs extends BaseResponse<string[]> {}

export interface IStockQueryParams {
    requestObject?: IRequestObject;
    pageCurrent?: number;
    pageSize?: number;
}
interface IRequestObject {
    inventoryId?: number;
    type?: string;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
    status?: Status;
}
export class StockQueryParams {
    requestObject?: IRequestObject;
    pageCurrent?: number;
    pageSize?: number;

    constructor(
        requestObject: IRequestObject | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
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
    open: number;
    avaiable: number;
    description: string;
    validFrom: string;
    validTo: string;
    startDate: string;
    endDate: string;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
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
    sysFstUpdate: string;
    sysFstUser: string;
    sysLstUpdate: string;
    sysLstUser: string;
}

export interface IStockListOfInventoryRs extends BaseResponse<IStock[]> {}
export interface IStockPayload {
    inventoryId?: number;
    type?: string; //api 1.3
    code?: string;
    cap?: number;
    valid?: string; //ddMMMyy HH:mm (global/us locale)
    validTo?: string;
    start?: string;
    end?: string;
    fromValidTo?: string; //<<========= có truyền giá trị chỗ này trở xuống = add Serial
    everyDayofweek: string[]; //Sunday Monday Tuesday Wednesday Thursday Friday Saturday (global/us locale)
    repeatAfter?: number;
    exclusives: {
        from?: string;
        to?: string;
    }[];
}

export interface IStockConfirmPayload {
    recId?: number;
    cap?: number;
    description?: string;
    valid?: string;
    validTo?: string;
    start?: string;
    end?: string;
}

export interface IStockAdjustPayload {
    inventoryStockId?: number;
    quantity?: number;
    rmk?: string;
}
