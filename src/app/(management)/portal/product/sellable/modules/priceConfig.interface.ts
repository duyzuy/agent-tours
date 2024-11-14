import { SellablePriceConfigPayload } from "@/models/management/core/priceConfig.interface";
export class SellablePriceConfigFormData {
  sellableRecId?: number;
  extraConfigs?: SellablePriceConfigPayload["extraConfigs"];
  tourConfigs?: SellablePriceConfigPayload["tourConfigs"];
  constructor(
    sellableRecId: number,
    extraConfigs: SellablePriceConfigPayload["extraConfigs"] | undefined,
    tourConfigs: SellablePriceConfigPayload["extraConfigs"] | undefined,
  ) {
    this.sellableRecId = sellableRecId;
    this.extraConfigs = extraConfigs;
    this.tourConfigs = tourConfigs;
  }
}
