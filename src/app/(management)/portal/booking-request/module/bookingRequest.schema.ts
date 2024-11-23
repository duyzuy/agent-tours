import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { BookingRequestFormData } from "./bookingRequest.interface";

export const bookingRequestSchema: ObjectSchema<BookingRequestFormData> = object({
  requestId: number(),
  requestName: string(),
  startDate: string(),
  endDate: string(),
  custName: string().required("Họ và tên không để trống."), //name + phone bắt buộc
  custPhoneNumber: string()
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "phoneNumber.minLength")
    .max(11, "phoneNumber.maxLength")
    .required("Số điện thoại không để trống"), //name + phone bắt buộc
  custEmail: string().email("Email không hợp lệ"),
  custAddress: string(),
  referenceId: string(),
  referenceName: string(), //chưa dùng tới
  tourPrice: number(),
  extraPrice: number(),
  invoiceName: string(),
  invoiceCompanyName: string(),
  invoiceAddress: string(),
  invoiceTaxCode: string(),
  invoiceEmail: string(),
  rmk: string().required("Ghi chú không bỏ trống."),
});
