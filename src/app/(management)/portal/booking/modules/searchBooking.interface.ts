import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import { PassengerType } from "@/models/common.interface";
import { SearchProductTourPayload } from "@/models/management/booking/searchProduct.interface";

export class SearchBookingFormData implements SearchProductTourPayload {
  byMonth?: string;
  byCode?: string;
  byDest?: ILocalSearchDestination[];
  byProductType?: [EProductType.TOUR];
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
    byInventoryType: EInventoryType[] | undefined,
  ) {
    this.byMonth = byMonth;
    this.byCode = byCode;
    this.byDest = byDest;
    this.byProductType = [EProductType.TOUR];
    this.byInventoryType = byInventoryType;
    this.passengers = {
      [PassengerType.ADULT]: 1,
      [PassengerType.CHILD]: 0,
      [PassengerType.INFANT]: 0,
    };
  }
}
