import { BaseResponse, Status } from "../../common.interface";

export interface PriceConfig {
    recId: number;
    sellableId: number;
    sellableDetailsId: number;
    channel: string;
    class: string;
    maxAvaiable: number;
    open: number;
    sold: number;
    oldSold: number;
    avaiable: number;
    details: string;
    limitPerBooking: number;
    adult: number;
    child: number;
    infant: number;
    settings: "B2C" | string;
    descriptions: string;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    status: Status;
}

export interface SellablePriceConfigRs extends BaseResponse<PriceConfig[]> {}

export interface SellablePriceConfigPayload {
    sellableRecId?: number;
    configs: {
        recId?: number;
        sellableId?: number;
        channel?: string;
        class?: string;
        maxAvaiable?: number;
        limitPerBooking?: number;
        details?: string;
        adult?: number;
        child?: number;
        infant?: number;
    }[];
}
