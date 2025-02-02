import { ObjectSchema, object, string, array, number } from "yup";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { PassengerType } from "@/models/common.interface";
import { CustomerContactInformationFormData, PassengerInformationFormData } from "./manageBooking.type";
import { CustomerProfileFormData } from "@/models/fe/profile.interface";
import { InvoinceFormData } from "@/modules/fe/manageBooking/manageBooking.type";

export const contactInformationSchema: ObjectSchema<CustomerContactInformationFormData> = object({
  recId: number().required("Thiếu ID"),
  custName: string().required("Họ và tên không bỏ trống.").min(6, "Tối thiểu 6 ký tự"),
  custPhoneNumber: string().required("Số điện thoại không bỏ trống"),
  custEmail: string().required("Email không bỏ trống").email("email không hợp lệ"),
  custAddress: string().required("Địa chỉ Không bỏ trống").default(""),
  rmk: string().required("Ghi chú Không bỏ trống").default(""),
});

export const invoiceSchema: ObjectSchema<InvoinceFormData> = object({
  recId: number().required("Thiếu ID"),
  invoiceName: string().default(""),
  invoiceCompanyName: string().default(""),
  invoiceAddress: string().default(""),
  invoiceTaxCode: string().default(""),
  invoiceEmail: string().default(""),
});

export const customerProfileSchema = object<CustomerProfileFormData>({
  fullname: string().required("ko bo tróng"),
});

export const passengerUpdateSchema: ObjectSchema<PassengerInformationFormData> = object({
  recId: number().required("Thiếu ID"),
  paxTitle: string()
    .oneOf<EPassengerTitle>([EPassengerTitle.MISS, EPassengerTitle.MR, EPassengerTitle.MRS])
    .required("title không bỏ trống."),
  paxLastname: string()
    .required("paxLastname.required")
    .matches(/^[A-Za-z\s]+$/, "paxLastname.inValid"),
  paxMiddleFirstName: string()
    .required("paxMiddleFirstName.required")
    .matches(/^[A-Za-z\s]+$/, "paxMiddleFirstName.inValid"),
  paxGender: string()
    .oneOf<EPassengerGender>([
      EPassengerGender.FEMALE,
      EPassengerGender.MALE,
      EPassengerGender.UNISEX,
      EPassengerGender.OTHER,
    ])
    .required("paxGender.required"),
  paxBirthDate: string().required("paxBirthDay.required"),
  paxBirthYear: number().default(0),
  paxPhoneNumber: string(),
  paxAddress: string(),
  paxIdNumber: string(),
  paxNationality: string().default(""),
  paxPassportNumber: string().default(""),
  paxPassortExpiredDate: string(),
  paxInfoJson: string().default(""),
});
