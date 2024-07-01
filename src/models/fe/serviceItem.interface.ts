import { PriceConfig } from "../management/core/priceConfig.interface";
import { BaseResponse } from "../common.interface";
import { ISupplier } from "../management/supplier.interface";

export interface FePriceConfig extends PriceConfig {
    supplier: ISupplier | null;
}

export interface PriceConfigServiceListResponse
    extends BaseResponse<FePriceConfig[]> {}
