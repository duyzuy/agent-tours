import { BaseResponse, Status } from "../common.interface";
import { IDestination } from "../region.interface";
import { EInventoryType } from "./inventoryType.interface";
import { EProductType } from "./productType.interface";

export interface ITemplateSellable {
    recId: number;
    cmsIdentity: string;
    sellableTemplateId: number;
    type: string; //1.2 producttype
    code: string;
    name: string;
    inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
    destListJson: string; //json cửa mảng [DestList], có thể có nhiều Destlist
    tourItinerary: string;
    airItinerary: string;
    counter: string;
    depart: string;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    status: Status;
}

export interface ITemplateSellableQueryParams {
    recId: number; //1 item theo Id
    andType: string; //3 biến and.... là điều kiện search AND, có thể truyền 1 trong 3 hoặc cả 3
    andCodeLike: string;
    andDestIn: string;
    pageCurrent: number; //default = 1
    pageSize: number; //defaut = 100/page
}

export class TemplateSellableQueryParams
    implements Partial<ITemplateSellableQueryParams>
{
    recId?: number;
    andType?: string;
    andCodeLike?: string;
    andDestIn?: string;
    pageCurrent?: number;
    pageSize?: number;
    status?: Status;
    constructor(
        recId: number | undefined,
        andType: string | undefined,
        andCodeLike: string | undefined,
        andDestIn: string | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
        status: Status | undefined,
    ) {
        this.recId = recId;
        this.andType = andType;
        this.andCodeLike = andCodeLike;
        this.andDestIn = andDestIn;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
        this.status = status;
    }
}
export interface ITemplateSellablePayload {
    cmsIdentity: string;
    type: string; //1.2 producttype
    code: string;
    name: string;
    inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
    destListJson: IDestination[]; //json cửa mảng [DestList], có thể có nhiều Destlist
    status: Status;
}
export interface ITemplateSellableUpdatePayload
    extends Pick<
        ITemplateSellablePayload,
        "cmsIdentity" | "name" | "inventoryTypeList" | "destListJson"
    > {}
export class TemplateSellableFormData {
    cmsIdentity?: string;
    type?: EProductType;
    code?: string;
    name?: string;
    inventoryTypeList: EInventoryType[];
    destListJson: IDestination[];
    status?: Status;

    constructor(
        cmsIdentity: string | undefined,
        type: EProductType | undefined,
        code: string | undefined,
        name: string | undefined,
        inventoryTypeList: EInventoryType[],
        destListJson: IDestination[],
        status: Status | undefined,
    ) {
        this.cmsIdentity = cmsIdentity;
        this.type = type;
        this.code = code;
        this.name = name;
        this.inventoryTypeList = inventoryTypeList;
        this.destListJson = destListJson;
        this.status = status;
    }
    // public formatInventoryList(inventoryList: string[]) {
    //     return inventoryList.reduce((acc, inv) => {
    //         return acc.concat(acc.length ? "||" : "", inv);
    //     }, "");
    // }
}
export interface ITemplateSaleableListRs
    extends BaseResponse<ITemplateSellable[]> {}
