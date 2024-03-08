import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

import { IDestinationSearch } from "@/models/management/booking/searchBooking.interface";

export class SearchBookingFormData {
    byMonth?: string;
    byCode: string;
    byDest: IDestinationSearch[];
    byProductType: EProductType[];
    byInventoryType: EInventoryType[];
    constructor(
        byMonth: string | undefined,
        byCode: string,
        byDest: [],
        byProductType: EProductType[],
        byInventoryType: EInventoryType[],
    ) {
        this.byMonth = byMonth;
        this.byCode = byCode;
        this.byDest = byDest;
        this.byProductType = byProductType;
        this.byInventoryType = byInventoryType;
    }
}
