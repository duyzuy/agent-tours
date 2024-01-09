import { BaseResponse, Status } from "../common.interface";
import { IDestination } from "../region.interface";
import { IInventory } from "./inventory.interface";
import { EInventoryType } from "./inventoryType.interface";
import { EProductType } from "./productType.interface";

export interface ITemplateSellable {
    cmsIdentity: string;
    sellableTemplateId: number;
    type: string; //1.2 producttype
    code: string;
    name: string;
    inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
    destListJson: string; //json cửa mảng [DestList], có thể có nhiều Destlist
    status: Status;
}

export interface ITemplateSellablePayload {
    cmsIdentity: string;
    type: string; //1.2 producttype
    code: string;
    name: string;
    inventoryTypeList: string; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
    destListJson: string; //json cửa mảng [DestList], có thể có nhiều Destlist
    status: Status;
}

export class TemplateSellableFormData {
    cmsIdentity: string;

    type?: EProductType; //1.2 producttype
    code: string;
    name: string;
    inventoryTypeList: EInventoryType[]; //1.1 inventoryType: chuỗi split bởi ||, ví dụ: AIR||HOTEL||GUIDE
    destListJson: IDestination[]; //json cửa mảng [DestList], có thể có nhiều Destlist
    status: Status;

    constructor(
        cmsIdentity: string,

        type: EProductType | undefined,
        code: string,
        name: string,
        inventoryTypeList: EInventoryType[],
        destListJson: IDestination[],
        status: Status,
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
    extends BaseResponse<ITemplateSellable> {}
