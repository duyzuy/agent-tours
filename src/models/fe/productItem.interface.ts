import { LangCode } from "../management/cms/language.interface";
import { PriceConfig } from "../management/core/priceConfig.interface";
import { ITemplateSellable } from "../management/core/templateSellable.interface";
import { IPromotion } from "../management/core/promotion.interface";
import { ISellable } from "../management/core/sellable.interface";
import { BaseResponse } from "../common.interface";

export interface FeProductItem extends ISellable {
    configs: PriceConfig[];
    template: ITemplateSellable & {
        cms: {
            name: string;
            thumb: string;
            slug: string;
            metaData: [];
            lang: LangCode;
        }[];
    };
    promotions: IPromotion[];
}

export interface ProductListResponse extends BaseResponse<FeProductItem[]> {}
