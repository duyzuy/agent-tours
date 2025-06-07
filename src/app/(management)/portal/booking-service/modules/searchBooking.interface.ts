import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";

export interface SearchBookingPayload {
  byMonth?: string;
  byCode?: string;
  byDest?: {
    countryKey: string;
    keyType: string;
    regionKey: string;
    stateProvinceKey: string;
    subRegionKey: string;
  }[];
  byProductType?: EProductType[];
  byInventoryType?: EInventoryType[];
}

export class SearchBookingFormData {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byProductType?: EProductType[];
  byInventoryType?: EInventoryType[];
  constructor(
    byMonth: string | undefined,
    byCode: string | undefined,
    byDest: ILocalSearchDestination[] | undefined,
    byProductType: EProductType[] | undefined,
    byInventoryType: EInventoryType[] | undefined,
  ) {
    this.byMonth = byMonth;
    this.byCode = byCode;
    this.byDest = byDest;
    this.byProductType = byProductType;
    this.byInventoryType = byInventoryType;
  }
}
