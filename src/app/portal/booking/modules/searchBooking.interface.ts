import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

import { IDestinationSearch } from "@/models/management/booking/searchBooking.interface";
import { PassengerType } from "@/models/management/common.interface";

export class SearchBookingFormData {
    byMonth?: string;
    byCode?: string;
    byDest?: IDestinationSearch[];
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
        byDest: IDestinationSearch[] | undefined,
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
