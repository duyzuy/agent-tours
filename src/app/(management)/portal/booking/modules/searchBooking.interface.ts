import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import { PassengerType } from "@/models/common.interface";

type SearBookingBasePayload = {
  byMonth?: string;
  byCode?: string;
  byDest?: {
    countryKey: string;
    keyType: string;
    regionKey: string;
    stateProvinceKey: string;
    subRegionKey: string;
  }[];
  byInventoryType?: EInventoryType[];
};

type SearchProductExtraPayload = SearBookingBasePayload & {
  byProductType?: [EProductType.EXTRA];
};
type SearchProductTourPayload = SearBookingBasePayload & {
  byProductType?: [EProductType.TOUR];
};

export type SearchBookingPayload = SearchProductTourPayload | SearchProductExtraPayload;

export class SearchBookingFormData {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byProductType?: EProductType[];
  byInventoryType?: EInventoryType[];
  passengers: {
    [PassengerType.ADULT]: number;
    [PassengerType.CHILD]: number;
    [PassengerType.INFANT]: number;
  };
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
    this.passengers = {
      [PassengerType.ADULT]: 1,
      [PassengerType.CHILD]: 0,
      [PassengerType.INFANT]: 0,
    };
  }
}
