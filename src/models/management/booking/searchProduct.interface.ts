import { EInventoryType } from "../core/inventoryType.interface";
import { EProductType } from "../core/productType.interface";
import { ProductServiceListResponse, ProductTourListResponse } from "./product.interface";

type SearhProductBasePayload = {
  byMonth?: string;
  byCode?: string;
  byDest?: {
    countryKey: string;
    keyType: string;
    regionKey: string;
    stateProvinceKey: string;
    subRegionKey: string;
  }[];
  byInventoryType?: EInventoryType[];
};

type SearchProductExtraPayload = SearhProductBasePayload & {
  byProductType?: [EProductType.EXTRA];
};
type SearchProductTourPayload = SearhProductBasePayload & {
  byProductType?: [EProductType.TOUR];
};

export type SearchProductPayload = SearchProductTourPayload | SearchProductExtraPayload;

export type ProductListResponse<T> = T extends SearchProductExtraPayload
  ? ProductServiceListResponse
  : T extends SearchProductTourPayload
  ? ProductTourListResponse
  : never;
