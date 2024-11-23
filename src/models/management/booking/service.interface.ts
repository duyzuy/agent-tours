import { PriceConfig } from "../core/priceConfig.interface";
import { BaseResponse } from "../../common.interface";
import { IInventory, IInventoryDetail } from "../core/inventory.interface";
import { IStock } from "../core/stock.interface";
export interface IProductService {
  inventory: Pick<
    IInventoryDetail,
    "recId" | "type" | "productType" | "code" | "name" | "airItinerary" | "tourItinerary" | "supplier" | "status"
  >;
  stock:
    | (Pick<IStock, "recId" | "inventoryId" | "inventoryType" | "code" | "description"> & { inventory: IInventory })
    | null;
  configs: Omit<PriceConfig, "inventory" | "stock">[];
}

export interface ProductServiceListResponse extends BaseResponse<{ extraConfigs: IProductService[] }> {}
