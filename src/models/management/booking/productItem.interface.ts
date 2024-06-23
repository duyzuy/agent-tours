import { PriceConfig } from "../core/priceConfig.interface";
import { ISellable } from "../core/sellable.interface";
import { BaseResponse } from "../../common.interface";
import { ITemplateSellable } from "../core/templateSellable.interface";
import { IPromotion } from "../core/promotion.interface";
export interface IProductItem extends ISellable {
    template: ITemplateSellable;
    configs: PriceConfig[];
    promotions: IPromotion[];
}

export interface IProductListRs extends BaseResponse<IProductItem[]> {}
