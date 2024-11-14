import { BaseResponse, Status } from "../../common.interface";
import { ISupplier, ISupplierDetail } from "../supplier.interface";
import { EInventoryType } from "./inventoryType.interface";
import { EProductType } from "./productType.interface";

export interface IInventoryDetail {
  recId: number;
  cmsIdentity: string;
  type: EInventoryType;
  code: string;
  name: string;
  // supplierId: number;
  // vendorId: number;
  productType: EProductType;
  tourItinerary: string;
  airItinerary: string;
  isStock: boolean;
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  // logStatus: string;
  // vendor: IVendor;
  supplier: ISupplierDetail;
}

export type IInventory = Pick<
  IInventoryDetail,
  | "recId"
  | "cmsIdentity"
  | "type"
  | "code"
  | "name"
  | "productType"
  | "tourItinerary"
  | "airItinerary"
  | "sysFstUpdate"
  | "isStock"
  | "status"
  | "sysFstUser"
  | "sysLstUser"
  | "sysLstUpdate"
> & {
  supplier: Pick<
    ISupplier,
    | "recId"
    | "shortName"
    | "fullName"
    | "typeList"
    | "contact"
    | "email"
    | "address"
    | "taxCode"
    | "status"
    | "sysFstUser"
    | "sysFstUpdate"
  >;
};

export interface IInventoryListRs extends BaseResponse<IInventory[]> {}
export interface IInventoryDetailRs extends BaseResponse<IInventoryDetail> {}
export interface IInventoryPayload {
  cmsIdentity?: string;
  supplierId?: number;
  type?: EInventoryType;
  code?: string;
  name?: string;
  productType?: EProductType;
  isStock?: boolean;
  status?: Status;
}

export interface InventoryRequestObject {
  type?: EInventoryType[];
  productType?: EProductType[];
  isStock?: boolean;
  status?: Status;
  supplierId?: number;
}
export class InventoryQueryParams {
  requestObject?: InventoryRequestObject;
  pageCurrent?: number;
  pageSize?: number;
  constructor(
    requestObject: InventoryRequestObject | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
