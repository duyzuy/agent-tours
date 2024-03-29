import { SellablePriceConfigPayload } from "@/models/management/core/priceConfig.interface";
export class SellablePriceConfigFormData {
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

    constructor(
        sellableRecId: number | undefined,
        configs: SellablePriceConfigPayload["configs"],
    ) {
        this.sellableRecId = sellableRecId;
        this.configs = configs;
    }
}
