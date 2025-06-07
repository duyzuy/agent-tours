import { BaseResponse } from "../../common.interface";
export enum EProductType {
  EXTRA = "EXTRA",
  TOUR = "TOUR",
}
export type TProductType = EProductType[];

export interface IProductTypeRs extends BaseResponse<TProductType> {}
