import { LangCode } from "../management/cms/language.interface";
import { PriceConfig } from "../management/core/priceConfig.interface";
import { ITemplateSellable } from "../management/core/templateSellable.interface";
import { IPromotion } from "../management/core/promotion.interface";
import { ISellable } from "../management/core/sellable.interface";
import { BaseResponse } from "../common.interface";
import { IThumbnail } from "../thumbnail.interface";
import { EProductType } from "../management/core/productType.interface";

export interface FeProductItem extends ISellable {
  configs: PriceConfig[];
  template: ITemplateSellable & {
    cms: {
      name: string;
      thumbnail: IThumbnail;
      slug: string;
      metaData: [];
      lang: LangCode;
    }[];
  };
  promotions: IPromotion[];
}

export interface ProductListResponse extends BaseResponse<FeProductItem[]> {}

export interface IFeTemplateProductItem {
  recId: number;
  cmsIdentity: string;
  type: EProductType;
  code: string;
  name: string;
  inventoryTypeList: string;
  cms: {
    name: string;
    code: string;
    thumbnail: IThumbnail;
    slug: string;
    lang: LangCode;
    metaData: {
      key: string;
      value: string;
      icon: string;
    }[];
  }[];
  sellables: {
    recId: number;
    sellableTemplateId: number;
    type: EProductType;
    code: string;
    cap: number;
    open: number;
    used: number;
    avaiable: number;
    closeDate: string;
    validFrom: string;
    validTo: string;
    startDate: string;
    endDate: string;
    promotions: IPromotion[];
    configs: PriceConfig[];
    sellableDetails: {
      inventories: [];
      stocks: [];
      extras: [];
      extraStocks: [];
    };
  }[];
}

export interface TemplateProductListResponse extends BaseResponse<IFeTemplateProductItem[]> {}
