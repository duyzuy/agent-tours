import { ObjectSchema, object, string, array, number, mixed, ref } from "yup";

import { ChangePasswordFormData, LocalUserProfileFormData } from "./adminProfile.types";

export const adminUpdateProfileSchema: ObjectSchema<LocalUserProfileFormData> = object({
  infoCompanyName: string().default(""),
  infoLegalRepresentative: string().default(""),
  infoPosition: string().default(""),
  infoPhoneNumber: string()
    .required("Số điện thoại không bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  infoEmail: string().required("Email không được bỏ trống.").email("Email không chính xác"),
  infoAddress: string().default(""),
  infoTaxcode: string().default(""),
  infoBanking: string().default(""),
  infoSpecialNote: string().default(""),
  fullname: string().default(""),
});

export const adminChangePasswordSchema: ObjectSchema<ChangePasswordFormData> = object({
  username: string().required("Tên tài khoản không bỏ trống."),
  newPassword: string().required("Mật khẩu không để trống.").min(8, "Mật khẩu ít nhất 8 ký tự."),
  confirmPassword: string()
    .required("Vui lòng xác nhận lại mật khẩu.")
    .oneOf([ref("newPassword")], "Mật khẩu không khớp."),
});
