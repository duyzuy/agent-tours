import { PriceConfig } from "../management/core/priceConfig.interface";
import { BaseResponse } from "../common.interface";
import { ISupplier } from "../management/supplier.interface";
import { IInventoryDetail } from "../management/core/inventory.interface";
import { IStock } from "../management/core/stock.interface";

export interface FeProductService {
  configs: PriceConfig[];
  inventory: Pick<
    IInventoryDetail,
    "airItinerary" | "recId" | "code" | "name" | "productType" | "type" | "tourItinerary"
  > & {
    supplier: ISupplier;
  };
  stock:
    | (Pick<IStock, "code" | "description" | "inventoryId" | "inventoryType" | "recId" | "type"> & {
        inventory: Pick<
          IInventoryDetail,
          "recId" | "name" | "code" | "status" | "type" | "productType" | "supplier" | "tourItinerary"
        >;
      })
    | null;
}

export interface ProductServiceListResponse extends BaseResponse<{ extraConfigs: FeProductService[] }> {}
