import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { IDestination } from "@/models/management/region.interface";
import { Status } from "@/models/common.interface";
import { ITemplateSellablePayload } from "@/models/management/core/templateSellable.interface";

export class TemplateSellableFormData {
  cmsIdentity?: string;
  type?: EProductType;
  code?: string;
  name?: string;
  inventoryTypeList: EInventoryType[];
  destListJson: Partial<IDestination>[];
  checkListJson?: { name?: string; descriptions?: string; link?: string }[];
  status?: Status;

  constructor(
    cmsIdentity: string | undefined,
    type: EProductType | undefined,
    code: string | undefined,
    name: string | undefined,
    inventoryTypeList: EInventoryType[],
    destListJson: Partial<IDestination>[],
    checkListJson: { name?: string; descriptions?: string; link?: string }[] | undefined,
    status: Status | undefined,
  ) {
    this.cmsIdentity = cmsIdentity;
    this.type = type;
    this.code = code;
    this.name = name;
    this.inventoryTypeList = inventoryTypeList;
    this.destListJson = destListJson;
    this.status = status;
    this.checkListJson = checkListJson;
  }
  // public formatInventoryList(inventoryList: string[]) {
  //     return inventoryList.reduce((acc, inv) => {
  //         return acc.concat(acc.length ? "||" : "", inv);
  //     }, "");
  // }
}
