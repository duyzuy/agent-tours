import { BaseResponse, Status } from "./common.interface";
import { IVendor } from "./vendor.interface";

export interface ISupplier {
    recId: number;
    shortName: string;
    fullName: string;
    vendorId: number;
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
    vendor: IVendor;
}

export interface SupplierPayload {
    recId?: number;
    shortName?: string; //MANDATORY - viết hoa ko dấu, UNIQUE
    fullName?: string; //optional
    contact?: string; //optional
    address?: string; //optional
    email?: string; //optional
    taxCode?: string; //optional
    rmk?: string; //optional
    bankName?: string; //optional
    bankAccountNumber?: string; //optional
    bankAddress?: string; //optional
    status: Status.OK | Status.QQ; //optional - mặc định QQ => cần duyệt
}

export class SupplierQueryParams {
    requestObject?: {
        status?: Status.OK | Status.QQ;
        shortName?: string;
        fullName?: string;
        vendorId?: number;
    };
    pageCurrent: number;
    pageSize: number;
    constructor(
        requestObject:
            | {
                  status?: Status.OK | Status.QQ;
                  shortName?: string;
                  fullName?: string;
                  vendorId?: number;
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

export interface SupplierListRs extends BaseResponse<ISupplier[]> {}
export interface SupplierRs extends BaseResponse<ISupplier> {}
