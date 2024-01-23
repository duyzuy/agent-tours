import { BaseResponse, Status } from "../common.interface";
import { EInventoryType, TInventoryType } from "./inventoryType.interface";
import { EProductType } from "./productType.interface";

export interface IInventory {
    recId: number;
    cmsIdentity: string;
    type: EInventoryType;
    code: string;
    name: string;
    supplierId: number;
    vendorId: number;
    productType: EProductType;
    tourItinerary: string;
    airItinerary: string;
    isStock: boolean;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: Date;
    sysLstUser: string;
    sysLstUpdate: Date;
    sysBelongTo: string;
    logStatus: string;
}
export interface IInventoryListRs extends BaseResponse<IInventory[]> {}
export interface IInventoryPayload {
    cmsIdentity: string;
    type: EInventoryType;
    code: string;
    name: string;
    productType: EProductType;
    isStock: boolean;
    status: Status;
}

export class InventoryFormData implements Partial<IInventoryPayload> {
    cmsIdentity: string;
    code: string;
    name: string;
    type?: EInventoryType;
    productType?: EProductType;
    isStock: boolean;
    status: Status;
    constructor(
        name: string,
        code: string,
        cmsIdentity: string,
        type?: EInventoryType,
        productType?: EProductType,
    ) {
        this.cmsIdentity = cmsIdentity;
        this.type = type;
        this.code = code;
        this.name = name;
        this.productType = productType;
        this.isStock = false;
        this.status = Status.QQ;
    }
}

export class IInventoryQueryParams {
    type?: string;
    isStock?: boolean;
    pageCurrent?: number;
    pageSize?: number;
    status?: Status;
    constructor(
        type: string | undefined,
        isStock: boolean | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
        status: Status | undefined,
    ) {
        this.type = type;
        this.isStock = isStock;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
        this.status = status;
    }
}
