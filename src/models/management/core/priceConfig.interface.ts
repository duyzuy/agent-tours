import { BaseResponse, Status } from "../../common.interface";
import { IInventory, IInventoryDetail } from "./inventory.interface";
import { IStock } from "./stock.interface";

export interface PriceConfig {
  recId: number;
  sellableId: number;
  sellableDetailsIds: number[];
  channel: "DUTY" | "CUSTOMER" | "AGENT";
  class: string;
  maxAvailable: number;
  open: number;
  sold: number;
  available: number;
  details: string;
  limitPerBooking: number;
  adult: number;
  child: number;
  infant: number;
  settings: "B2C" | string;
  inventory: Pick<
    IInventoryDetail,
    "recId" | "type" | "productType" | "code" | "name" | "airItinerary" | "tourItinerary" | "status" | "supplier"
  > | null;
  stock:
    | (Pick<IStock, "recId" | "inventoryId" | "type" | "inventoryType" | "code" | "description"> & {
        invenroty: Pick<
          IInventoryDetail,
          "recId" | "type" | "productType" | "code" | "name" | "airItinerary" | "tourItinerary" | "status" | "supplier"
        >;
      })
    | null;
  status: Status;
}

export interface SellablePriceConfigRs
  extends BaseResponse<{
    tourConfigs: PriceConfig[];
    extraConfigs: (Omit<PriceConfig, "inventory" | "stock"> & {
      inventory: Exclude<PriceConfig["inventory"], null>;
      stock: PriceConfig["stock"];
    })[];
  }> {}

export interface SellablePriceConfigPayload {
  sellableRecId?: number;
  tourConfigs?: Partial<
    Pick<
      PriceConfig,
      | "recId"
      | "sellableDetailsIds"
      | "channel"
      | "class"
      | "maxAvailable"
      | "available"
      | "limitPerBooking"
      | "details"
      | "adult"
      | "child"
      | "infant"
      | "details"
      | "settings"
    >
  >[];
  extraConfigs?: Partial<
    Pick<
      PriceConfig,
      | "recId"
      | "sellableDetailsIds"
      | "channel"
      | "class"
      | "maxAvailable"
      | "available"
      | "limitPerBooking"
      | "details"
      | "adult"
      | "child"
      | "infant"
      | "details"
      | "settings"
    >
  >[];
}
