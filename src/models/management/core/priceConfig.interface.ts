import { BaseResponse, Status } from "../common.interface";

export interface PriceConfig {
    recId: number;
    sellableId: number;
    channel: string;
    class: string;
    maxAvaiable: number;
    open: number;
    sold: number;
    avaiable: number;
    adult: number;
    child: number;
    infant: number;
    settings: "" | "B2C";
    otherPrice01: number;
    otherPrice02: number;
    otherPrice03: number;
    otherPriceNoSeat01: number;
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
        adult?: number;
        child?: number;
        infant?: number;
        otherPrice01?: number;
        otherPrice02?: number;
        otherPrice03?: number;
        otherPriceNoSeat01?: number;
    }[];
}

export class SellablePriceConfigFormData {
    sellableRecId?: number;
    configs: {
        recId?: number;
        sellableId?: number;
        channel?: string;
        class?: string;
        maxAvaiable?: number;
        adult?: number;
        child?: number;
        infant?: number;
        otherPrice01?: number;
        otherPrice02?: number;
        otherPrice03?: number;
        otherPriceNoSeat01?: number;
    }[];

    constructor(
        sellableRecId: number | undefined,
        configs: SellablePriceConfigPayload["configs"],
    ) {
        this.sellableRecId = sellableRecId;
        this.configs = configs;
    }
}
