import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { CustomerInformation } from "@/models/management/booking/customer.interface";

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
