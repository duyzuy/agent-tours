import { BaseResponse, Status } from "./common.interface";

export interface IVendor {
    recId: number;
    shortName: string;
    typeList: string;
    fullName: string;
    address: string;
    contact: string;
    email: string;
    taxCode: string;
    rmk: string;
    bankName: string;
    bankAccountNumber: string;
    bankAddress: string;
    paymentType: "CASH";
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
}

export interface VendorPayload {
    shortName?: string; //MANDATORY - viết hoa ko dấu, UNIQUE
    typeList?: string; //giống typeList của sellableTemplate: vd TRANSPORT||AIR||LANDPACKAGE||HOTEL||GUIDE
    fullName?: string; //optional
    contact?: string; //optional
    address?: string; //optional
    email?: string; //optional
    taxCode?: string; //optional
    rmk?: string; //optional
    bankName?: string; //optional
    bankAccountNumber?: string; //optional
    bankAddress?: string; //optional
    paymentType: "CASH"; //PREPAID  POSTPAID
    createDefaultSupplier: boolean; //optional => true =  tự động tạo Supplier với thông tin như trên
    status: Status.OK | Status.QQ; //optional - mặc định QQ => cần duyệt
}
export interface VendorUpdatePayload {
    recId?: number;
    shortName?: string;
    typeList?: string;
    fullName?: string;
    contact?: string;
    address?: string;
    email?: string;
    taxCode?: string;
    rmk?: string;
    bankName?: string;
    bankAccountNumber?: string;
    bankAddress?: string;
    paymentType: "CASH";
}

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
export interface VendorRs extends BaseResponse<IVendor> {}
