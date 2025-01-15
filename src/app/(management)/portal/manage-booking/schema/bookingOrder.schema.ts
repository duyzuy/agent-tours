import { ObjectSchema, object, string, array, number, mixed } from "yup";

import {
  BookingOrderCustomerFormData,
  BookingOrderInvoiceFormData,
  BookingOrderPassengerFormData,
} from "../modules/bookingOrder.interface";
import { EPassengerGender } from "@/constants/common";

export const bookingPassengerInfoSchema: ObjectSchema<BookingOrderPassengerFormData> = object({
  recId: number().required("Thiếu ID sản phẩm."),
  paxTitle: string().required("Danh xưng không bỏ trống."),
  paxLastname: string().required("Họ không bỏ trống."),
  paxMiddleFirstName: string().required("Tên đệm và tên không bỏ trống."),
  paxGender: string()
    .oneOf<EPassengerGender>(
      [EPassengerGender.FEMALE, EPassengerGender.MALE, EPassengerGender.OTHER],
      "Giới tính không đúng.",
    )
    .required("Chọn giới tính."),
  paxBirthDate: string().required("Ngày sinh không bỏ trống."),
  paxBirthYear: number().default(1900),
  paxPhoneNumber: string()
    .required("Số điện thoại ko bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  paxAddress: string().default(""),
  paxIdNumber: string().default(""),
  paxNationality: string().default(""),
  paxPassportNumber: string().default(""),
  paxPassortExpiredDate: string().default(""),
  paxInfoJson: string().default(""),
});

export const bookingCustomerInfoSchema: ObjectSchema<BookingOrderCustomerFormData> = object({
  recId: number().required("Thiếu ID order sản phẩm."),
  custName: string().required("Họ tên không bỏ trống."),
  custPhoneNumber: string().required("Số điện thoại không bỏ trống."),
  custEmail: string().email("Email không đúng").required("Email không bỏ trống."),
  custAddress: string().default(""),
  rmk: string().default(""),
});

export const bookingInvoiceInfoSchema: ObjectSchema<BookingOrderInvoiceFormData> = object({
  recId: number().required("Thiếu ID order sản phẩm."),
  invoiceAddress: string(),
  invoiceCompanyName: string(),
  invoiceEmail: string().email("Email không đúng."),
  invoiceName: string(),
  invoiceTaxCode: string(),
});
