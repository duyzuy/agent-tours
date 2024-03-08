import { ObjectSchema, object, string, array, number, mixed } from "yup";
import dayjs from "dayjs";

import { SearchBookingFormData } from "../modules/searchBooking.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { IDestinationSearch } from "@/models/management/booking/searchBooking.interface";

const isValidDateFormat = (value: string) => {
    return dayjs(value, "MMMYY", true).isValid(); // Adjust the format as needed
};

export const searchBookingSchema: ObjectSchema<SearchBookingFormData> = object({
    byMonth: string()
        .required("Chọn thời gian đi")
        .test("is-valid-date", "Invalid date", isValidDateFormat),
    byDest: array<IDestinationSearch>(
        object({
            regionKey: string(),
            countryKey: string(),
            countryName: string(),
            stateProvinceKey: string(),
            subRegionKey: string(),
            keyType: string(),
        }),
    )
        .required("Vui lòng chọn tỉnh thành")
        .default([]),
    byCode: string().default(""),
    byProductType: array(
        mixed<EProductType>().oneOf(Object.values(EProductType)).required(),
    ).default([EProductType.EXTRA]),
    byInventoryType: array(
        mixed<EInventoryType>().oneOf(Object.values(EInventoryType)).required(),
    ).default([EInventoryType.AIR]),
});
