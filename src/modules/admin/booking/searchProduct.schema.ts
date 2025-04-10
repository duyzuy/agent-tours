import { array, mixed, object, ObjectSchema, string } from "yup";
import { SearchProductExtraFormData, SearchProductTourFormData } from "./searchProduct.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import dayjs from "dayjs";
import { MONTH_FORMAT } from "@/constants/common";

const isValidDateFormat = (value: string) => {
  return dayjs(value, { format: MONTH_FORMAT }, true).isValid(); // Adjust the format as needed
};

export const searchPortalBookingSchema: ObjectSchema<SearchProductExtraFormData | SearchProductTourFormData> = object({
  byMonth: string().required("Chọn thời gian đi").test("is-valid-date", "Ngày đi không hợp lệ", isValidDateFormat),
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
  byCode: string().default(""),
  byProductType: array(
    mixed<EProductType>().oneOf(Object.values(EProductType)).required("Không bỏ trống type."),
  ).default([EProductType.EXTRA]),
  byInventoryType: array(mixed<EInventoryType>().oneOf(Object.values(EInventoryType)).required()).default([
    EInventoryType.AIR,
  ]),
});

export const searchPortalBookingSchemaa = <T extends EProductType>(
  type: T,
): ObjectSchema<
  T extends EProductType.EXTRA
    ? SearchProductExtraFormData
    : T extends EProductType.TOUR
    ? SearchProductTourFormData
    : never
> => {
  return type === EProductType.EXTRA || type === EProductType.TOUR
    ? object({
        byMonth: string()
          .required("Chọn thời gian đi")
          .test("is-valid-date", "Ngày đi không hợp lệ", isValidDateFormat),
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
        byCode: string().default(""),
        byProductType: array(
          mixed<EProductType>().oneOf(Object.values(EProductType)).required("Không bỏ trống type."),
        ).default([EProductType.EXTRA]),
        byInventoryType: array(mixed<EInventoryType>().oneOf(Object.values(EInventoryType)).required()).default([
          EInventoryType.AIR,
        ]),
      })
    : undefined;
};
