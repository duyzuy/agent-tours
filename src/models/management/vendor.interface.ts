import { BaseResponse, Status } from "../common.interface";
import { EInventoryType } from "./core/inventoryType.interface";
export enum EVendorPaymentType {
  CASH = "CASH",
  PREPAID = "PREPAID",
  POSTPAID = "POSTPAID",
}

export interface IVendorDetail {
  recId: number;
  shortName: string;
  typeList: EInventoryType[];
  fullName: string;
  address: string;
  contact: string;
  email: string;
  taxCode: string;
  rmk: string;
  bankName: string;
  bankAccountNumber: string;
  bankAddress: string;
  bankSwiftcode: string;
  paymentTerm: string;
  paymentType: EVendorPaymentType;
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
}

export type IVendor = Pick<
  IVendorDetail,
  | "recId"
  | "shortName"
  | "fullName"
  | "typeList"
  | "email"
  | "contact"
  | "address"
  | "taxCode"
  | "status"
  | "sysFstUser"
  | "sysFstUpdate"
>;

export interface VendorPayload {
  shortName?: string; //MANDATORY - viết hoa ko dấu, UNIQUE
  typeList?: EInventoryType[];
  fullName?: string; //optional
  contact?: string; //optional
  address?: string; //optional
  email?: string; //optional
  taxCode?: string; //optional
  rmk?: string; //optional
  bankName?: string; //optional
  bankAccountNumber?: string; //optional
  bankAddress?: string; //optional
  paymentType: EVendorPaymentType; //PREPAID  POSTPAID
  createDefaultSupplier: boolean; //optional => true =  tự động tạo Supplier với thông tin như trên
  status: Status.OK | Status.QQ; //optional - mặc định QQ => cần duyệt
  bankSwiftcode?: string;
  paymentTerm?: string;
}
export type VendorUpdatePayload = VendorPayload & {
  recId?: number;
};

export class VendorQueryParams {
  requestObject?: {
    status?: Status.OK | Status.QQ;
    shortName?: string;
    fullName?: string;
  };
  pageCurrent: number;
  pageSize: number;
  constructor(
    requestObject:
      | {
          status?: Status.OK | Status.QQ;
          shortName?: string;
          fullName?: string;
        }
      | undefined,
    pageCurrent: number,
    pageSize: number,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}

export interface VendorListRs extends BaseResponse<IVendor[]> {}
export interface VendorRs extends BaseResponse<IVendorDetail> {}
