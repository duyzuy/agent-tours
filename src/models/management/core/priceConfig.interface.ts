import { BaseResponse, Status } from "../../common.interface";
import { IInventory, IInventoryDetail } from "./inventory.interface";
import { IStock } from "./stock.interface";

export interface PriceConfig {
  recId: number;
  sellableId: number;
  sellableDetailsIds: number[];
  channel: string;
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
  // oldSold: number;
  // descriptions: string;
  // supplier: ISupplier | null;
  // sysFstUser: string;
  // sysFstUpdate: string;
  // sysLstUser: string;
  // sysLstUpdate: string;
  // sysBelongTo: string;
  // logStatus: string;
  status: Status;
}

export interface SellablePriceConfigRs
  extends BaseResponse<{
    tourConfigs: PriceConfig[];
    extraConfigs: PriceConfig[];
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
