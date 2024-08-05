import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/common.interface";
import { IInventoryPayload } from "@/models/management/core/inventory.interface";

export class InventoryFormData implements IInventoryPayload {
  recId?: number;
  cmsIdentity: string;
  supplierId?: number;
  code: string;
  name: string;
  type?: EInventoryType;
  productType?: EProductType;
  isStock?: boolean;
  status?: Status;
  constructor(
    recId: number | undefined,
    name: string,
    code: string,
    cmsIdentity: string,
    type?: EInventoryType,
    productType?: EProductType,
    supplierId?: number,
    isStock?: boolean,
    status?: Status,
  ) {
    this.recId = recId;
    this.cmsIdentity = cmsIdentity;
    this.type = type;
    this.code = code;
    this.name = name;
    this.productType = productType;
    this.supplierId = supplierId;
    this.isStock = isStock;
    this.status = status;
  }
}
