import { EInventoryType, TInventoryType } from "./core/inventoryType.interface";
import { EProductType } from "./core/productType.interface";

export interface IInventoryPayload {
    cmsIdentity: string;
    type: EInventoryType;
    code: string;
    name: string;
    productType: EProductType;
    isStock: boolean;
}

export class InventoryFormData implements Partial<IInventoryPayload> {
    cmsIdentity: string;
    code: string;
    name: string;
    type?: EInventoryType;
    productType?: EProductType;
    isStock: boolean;

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
    }
}
