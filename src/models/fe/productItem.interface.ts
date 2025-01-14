import { LangCode } from "../management/cms/language.interface";
import { PriceConfig } from "../management/core/priceConfig.interface";
import { ITemplateSellable, ITemplateSellableDetail } from "../management/core/templateSellable.interface";
import { IPromotion } from "../management/core/promotion.interface";
import { ISellable } from "../management/core/sellable.interface";
import { BaseResponse } from "../common.interface";
import { IThumbnail } from "../thumbnail.interface";
import { EProductType } from "../management/core/productType.interface";
import { IInventoryDetail } from "../management/core/inventory.interface";
import { EInventoryType } from "../management/core/inventoryType.interface";
import { IStock } from "../management/core/stock.interface";
export interface FeProductItem extends ISellable {
  sellableTemplateCode: string;
  configs: PriceConfig[];
  promotions: IPromotion[];
  sellableDetails: {
    inventories: IInventoryDetail[];
    stocks: (IStock & { inventory: IInventoryDetail })[];
    extras: IInventoryDetail[];
    extraStocks: (IStock & { inventory: IInventoryDetail })[];
  };
}

export interface ProductListResponse extends BaseResponse<FeProductItem[]> {}

export type IFeTemplateProductItem = Pick<
  ITemplateSellableDetail,
  "recId" | "cmsIdentity" | "type" | "code" | "name" | "inventoryTypeList"
> & {
  cms: {
    name: string;
    code: string;
    thumbnail: IThumbnail;
    promotionReferencePrice: number;
    promotionLabel: string;
    promotionImage: string;
    promotionLabelType: "text" | "image" | "";
    promotionValidFrom: string;
    promotionValidTo: string;
    slug: string;
    lang: LangCode;
    metaData: {
      key: string;
      value: string;
      icon: string;
    }[];
  }[];
  depart: {
    id: number;
    key: string;
    name_vi: string;
    name_en: string;
  };
  sellables: (ISellable & {
    configs: PriceConfig[];
    promotions: IPromotion[];
    sellableDetails: {
      inventories: IInventoryDetail[];
      stocks: (IStock & { inventory: IInventoryDetail })[];
      extras: IInventoryDetail[];
      extraStocks: (IStock & { inventory: IInventoryDetail })[];
    };
  })[];
};

export interface TemplateProductListResponse extends BaseResponse<IFeTemplateProductItem[]> {}
