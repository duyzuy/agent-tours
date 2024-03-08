import { PriceConfig } from "../core/priceConfig.interface";
import { ISellable } from "../core/sellable.interface";
import { BaseResponse } from "../common.interface";
export interface IProductItem extends ISellable {
    configs: PriceConfig[];
}

export interface IProductListRs extends BaseResponse<IProductItem[]> {}
