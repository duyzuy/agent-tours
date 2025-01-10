import { PriceConfig } from "../core/priceConfig.interface";
import { ISellable } from "../core/sellable.interface";
import { BaseResponse, Status } from "../../common.interface";
import { ITemplateSellableDetail } from "../core/templateSellable.interface";
import { IPromotion } from "../core/promotion.interface";
import { EProductType } from "../core/productType.interface";
import { IInventory } from "../core/inventory.interface";
import { IStock } from "../core/stock.interface";

export type IProductTour = Pick<
  ISellable,
  | "sellableTemplateId"
  | "cap"
  | "code"
  | "closeDate"
  | "validFrom"
  | "validTo"
  | "startDate"
  | "endDate"
  | "open"
  | "used"
  | "available"
  | "limitPerBooking"
> & {
  sellableId: number;
  type: EProductType.TOUR;
  status: Status.OK;
  template: Pick<ITemplateSellableDetail, "type" | "code" | "name"> & {
    templateId: number;
  };
  sellableDetails: {
    inventories: (Pick<
      IInventory,
      "recId" | "type" | "code" | "name" | "airItinerary" | "tourItinerary" | "supplier" | "status"
    > & { productType: EProductType.TOUR; isStock: false })[];
    stocks: (Pick<
      IStock,
      "recId" | "available" | "type" | "inventoryType" | "code" | "description" | "cap" | "open" | "used"
    > & {
      inventory: Pick<
        IInventory,
        "recId" | "type" | "code" | "name" | "airItinerary" | "tourItinerary" | "supplier" | "status"
      > & { productType: EProductType.TOUR; isStock: true };
    })[];
  };
  configs: PriceConfig[];
  promotions: IPromotion[];
};

export interface ProductTouListResponse extends BaseResponse<IProductTour[]> {}
