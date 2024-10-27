import { BaseResponse } from "../../common.interface";

export enum EInventoryType {
  AIR = "AIR",
  VISA = "VISA",
  HOTEL = "HOTEL",
  GUIDE = "GUIDE",
  TRANSPORT = "TRANSPORT",
  RESTAURANT = "RESTAURANT",
  LANDPACKAGE = "LANDPACKAGE",
  INSURANCE = "INSURANCE",
}

export enum EStockType {
  AIRTICKET = "AIRTICKET",
  INSURANCE = "INSURANCE",
  PACKAGE = "PACKAGE",
  TOURPACKAGE = "TOURPACKAGE",
  GUIDE = "GUIDE",
  OTHER = "OTHER",
  VISASERVICES = "VISASERVICES",
  VEHICLE = "VEHICLE",
  CRUISE = "CRUISE",
  TABLE = "TABLE",
  ROOM = "ROOM",
}
// export type TInventoryType = EInventoryType[];
export interface IInventoryTypeRs extends BaseResponse<EInventoryType[]> {}
