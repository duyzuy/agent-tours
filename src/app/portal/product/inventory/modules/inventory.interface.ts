import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/management/common.interface";
import { IInventoryPayload } from "@/models/management/core/inventory.interface";

export class InventoryFormData implements IInventoryPayload {
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
