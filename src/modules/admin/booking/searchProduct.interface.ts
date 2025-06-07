import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
export class SearchProductExtraFormData {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byInventoryType?: EInventoryType[];
  byProductType?: [EProductType.EXTRA];
  constructor(
    byMonth: string | undefined,
    byCode: string | undefined,
    byDest: ILocalSearchDestination[] | undefined,
    byInventoryType: EInventoryType[] | undefined,
  ) {
    this.byMonth = byMonth;
    this.byCode = byCode;
    this.byDest = byDest;
    this.byProductType = [EProductType.EXTRA];
    this.byInventoryType = byInventoryType;
  }
}

export class SearchProductTourFormData {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byInventoryType?: EInventoryType[];
  byProductType?: [EProductType.TOUR];
  constructor(
    byMonth: string | undefined,
    byCode: string | undefined,
    byDest: ILocalSearchDestination[] | undefined,
    byInventoryType: EInventoryType[] | undefined,
  ) {
    this.byMonth = byMonth;
    this.byCode = byCode;
    this.byDest = byDest;
    this.byProductType = [EProductType.TOUR];
    this.byInventoryType = byInventoryType;
  }
}
