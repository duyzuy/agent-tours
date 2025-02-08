import { SplitBookingFormData } from "./splitBooking.interface";

import { ObjectSchema, object, string } from "yup";

const vietnameseNamePattern =
  /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

export const customerInformationSchema: ObjectSchema<SplitBookingFormData["customerInfo"]> = object({
  custName: string().required("Họ tên không bỏ trống."),
  custPhoneNumber: string()
    .required("Số điện thoại không bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  custEmail: string().required("Email không bỏ trống.").email("Email không hợp lệ."),
  custAddress: string().default(""),
  rmk: string(),
});

export const invoiceSchema: ObjectSchema<SplitBookingFormData["invoiceInfo"]> = object({
  invoiceAddress: string(),
  invoiceCompanyName: string().default(""),
  invoiceEmail: string().email("Email không hợp lệ."),
  invoiceName: string().default(""),
  invoiceTaxCode: string().default(""),
});
