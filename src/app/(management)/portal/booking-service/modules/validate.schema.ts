import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { BookingServicePayload } from "../modules/bookingInformation.interface";
import { PassengerType } from "@/models/common.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { SearchBookingFormData } from "../modules/searchBooking.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { MONTH_FORMAT } from "@/constants/common";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import dayjs from "dayjs";

export const bookingInformationSchema: ObjectSchema<BookingServicePayload> = object({
  sellableId: number().required("Thiếu ID sản phẩm"),
  bookingDetails: array(
    object({
      index: number().required("Thiếu Index booking detail."),
      sellableConfigId: number().required("Thiếu ID pricing config."),
      qty: number().required("Số lượng hành khách không bỏ trống.").default(0),
      amount: number().required("Amount không bỏ trống").default(0),
      type: string()
        .oneOf<PassengerType>([PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT])
        .required("Loại hành khách không bỏ trống"),
      pax: object({}).default({}),
      ssr: array(
        object({
          sellableConfigId: number().required("Thiếu ID sản phẩm."),
          qty: number().required("Thiếu số lượng sản phẩm"),
          amount: number().required("Thiếu giá tiền"),
          type: string()
            .oneOf<PassengerType>([PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT])
            .required("Loại hành khách không bỏ trống"),
        }),
      ).default([]),
    }),
  ).default([]),
  custName: string().required("cusName không bỏ trống."),
  bookingSsr: array(
    object({
      sellableConfigId: number().required("Thiếu ID dịch vụ."),
      qty: number().required("Thiếu số lượng dịch vụ."),
      amount: number().required("Thiếu giá tiền dịch vụ."),
      type: string().oneOf<PassengerType.ADULT>([PassengerType.ADULT]).required("Loại hành khách không bỏ trống"),
    }),
  ).default([]),
  custPhoneNumber: string().required("phone number không bỏ trống."),
  custEmail: string().required("Email không bỏ trống."),
  custAddress: string().default(""),
  rmk: string().default(""),
  referenceId: string(),
  channel: string().oneOf([ESellChannel.B2B, ESellChannel.B2C]),
  agentUserId: number(),
  invoiceName: string().default(""),
  invoiceCompanyName: string().default(""),
  invoiceAddress: string().default(""),
  invoiceTaxCode: string().default(""),
  invoiceEmail: string().default(""),
});

export const customerInformationSchema: ObjectSchema<CustomerInformation> = object({
  custName: string().required("Họ tên không bỏ trống."),
  referenceId: string(),
  custPhoneNumber: string()
    .required("Số điện thoại không bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  custEmail: string().required("Email không bỏ trống.").email("Email không hợp lệ."),
  custAddress: string(),
  rmk: string(),
});

const isValidDateFormat = (value: string) => {
  return dayjs(value, { format: MONTH_FORMAT }, true).isValid(); // Adjust the format as needed
};

export const searchPortalBookingSchema: ObjectSchema<SearchBookingFormData> = object({
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
  passengers: object({
    [PassengerType.ADULT]: number().default(1),
    [PassengerType.CHILD]: number().default(0),
    [PassengerType.INFANT]: number().default(0),
  }),
});
