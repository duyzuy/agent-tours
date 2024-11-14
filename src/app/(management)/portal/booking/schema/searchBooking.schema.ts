import { ObjectSchema, object, string, array, number, mixed } from "yup";
import dayjs from "dayjs";

import { SearchBookingFormData } from "../modules/searchBooking.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { PassengerType } from "@/models/common.interface";
import { MONTH_FORMAT } from "@/constants/common";
import { ILocalSeachDestination } from "@/models/management/localSearchDestination.interface";
const isValidDateFormat = (value: string) => {
  return dayjs(value, { format: MONTH_FORMAT }, true).isValid(); // Adjust the format as needed
};

export const searchBookingSchema: ObjectSchema<SearchBookingFormData> = object({
  byMonth: string().required("Chọn thời gian đi").test("is-valid-date", "Ngày đi không hợp lệ", isValidDateFormat),
  byDest: array<ILocalSeachDestination>(
    object({
      regionKey: string(),
      countryKey: string(),
      stateProvinceKey: string(),
      subRegionKey: string(),
      keyType: string(),
    }),
  )
    .required("Chọn điểm đến")
    .default([]),
  byCode: string().default(""),
  byProductType: array(
    mixed<EProductType>().oneOf(Object.values(EProductType)).required("Không bỏ trống type."),
  ).default([EProductType.EXTRA]),
  byInventoryType: array(mixed<EInventoryType>().oneOf(Object.values(EInventoryType)).required()).default([
    EInventoryType.AIR,
  ]),
  passengers: object({
    [PassengerType.ADULT]: number().default(1),
    [PassengerType.CHILD]: number().default(0),
    [PassengerType.INFANT]: number().default(0),
  }),
});
