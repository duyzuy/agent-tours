import { array, mixed, object, ObjectSchema, string } from "yup";
import { SearchProductFormData } from "./searchProduct.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import dayjs from "dayjs";
import { MONTH_FORMAT } from "@/constants/common";

const isValidDateFormat = (value: string) => {
  return dayjs(value, { format: MONTH_FORMAT }, true).isValid(); // Adjust the format as needed
};

export const searchPortalBookingSchema: ObjectSchema<SearchProductFormData & { searchType: EProductType }> = object({
  byMonth: string().required("Chọn thời gian đi").test("is-valid-date", "Ngày đi không hợp lệ", isValidDateFormat),
  byCode: string().default(""),
  searchType: mixed<EProductType>().oneOf([EProductType.EXTRA, EProductType.TOUR]).required(),
  byDest: array<ILocalSearchDestination>(
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
  byProductType: mixed<EProductType>().when(["searchType"], {
    is: EProductType.EXTRA,
    then: (schema) => schema.oneOf([EProductType.EXTRA]).required(),
    otherwise: (schema) => schema.oneOf([EProductType.TOUR]).required(),
  }),
  byInventoryType: array(mixed<EInventoryType>().oneOf(Object.values(EInventoryType)).required()).default([]),
});
