import { BaseResponse } from "../common.interface";

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
export type TInventoryType = EInventoryType[];

export interface IInventoryTypeRs extends BaseResponse<TInventoryType> {}
