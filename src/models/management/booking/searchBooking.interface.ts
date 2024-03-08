import { Dayjs } from "dayjs";
import { TInventoryType } from "../core/inventoryType.interface";
import { TProductType } from "../core/productType.interface";

export interface IDestinationSearch {
    countryKey: string;
    keyType: string;
    regionKey: string;
    stateProvinceKey: string;
    subRegionKey: string;
}

export interface SearchBookingPayload {
    byMonth: string; //ddMMMyy - bắt buộc
    byCode: string;
    byDest: IDestinationSearch[];
    byProductType: TProductType;
    byInventoryType: TInventoryType;
}
