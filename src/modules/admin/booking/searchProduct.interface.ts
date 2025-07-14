import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";

export class SearchProductFormData {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byInventoryType?: EInventoryType[];
  byProductType?: EProductType;
  constructor(
    byMonth: string | undefined,
    byCode: string | undefined,
    byDest: ILocalSearchDestination[] | undefined,
    byProductType: EProductType | undefined,
    byInventoryType: EInventoryType[] | undefined,
  ) {
    this.byMonth = byMonth;
    this.byCode = byCode;
    this.byDest = byDest;
    this.byProductType = byProductType ? byProductType : EProductType.TOUR;
    this.byInventoryType = byInventoryType;
  }
}
