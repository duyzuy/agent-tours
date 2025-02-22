import { object, string, ObjectSchema, boolean, ref } from "yup";

import { ELocalUserType } from "@/models/management/localUser.interface";
import { LocalUserFormData, LocalUserChangePasswordFormData } from "./user.interface";

type TLocalUserObjectSchema = LocalUserFormData & {
  isRequirePassword?: boolean;
  isCreate?: boolean;
};

const vietnameseNamePattern =
  /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const localUserSchema: ObjectSchema<TLocalUserObjectSchema> = object({
  isRequirePassword: boolean().default(true),
  isCreate: boolean().default(true),
  fullname: string().required("Họ và tên không bỏ trống."),
  email: string().when("isCreate", {
    is: true,
    then: (schema) => schema.required("Email không được bỏ trống.").email("Email không chính xác"),
    otherwise: (schema) => schema.optional(),
  }),
  userType: string()
    .required("Loại tài khoản không bỏ trống.")
    .oneOf<ELocalUserType>(
      [ELocalUserType.ADMIN, ELocalUserType.AGENT, ELocalUserType.AGENT_STAFF, ELocalUserType.STAFF],
      "Loại tài khoản không đúng.",
    ),
  phoneNumber: string()
    .required("Số điện thoại không được bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  username: string()
    .test((value, ctx) => {
      // console.log(value, ctx);
      return true;
    })
    .when("isCreate", {
      is: true,
      then: (schema) => schema.required("Tên tài khoản không bỏ trống."),
      otherwise: (schema) => schema.optional(),
    }),
  password: string().when("isRequirePassword", {
    is: true,
    then: (schema) => schema.required("Mật khẩu không bỏ trống"),
    otherwise: (schema) => schema.optional(),
  }),
  infoEmail: string().email("Email không chính xác"),
  mainRole: string().required("Quyền của tài khoản không bỏ trống."),
  mainRoleName: string(),
  descriptions: string(),
  infoPhoneNumber: string()
    .nullable()
    .transform((v, o) => (o === "" ? null : v))
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),

  infoCompanyName: string(),
  infoAddress: string(),
  infoBanking: string(),
  infoTaxcode: string(),
  infoSpecialNote: string(),
  infoPosition: string(),
  infoLegalRepresentative: string(),
  status: string().required().oneOf(["OK", "XX", "OX"]).default("OK"),
});

export const localUserChangePasswordSchema: ObjectSchema<LocalUserChangePasswordFormData> = object({
  username: string().required("Tên tài khoản không bỏ trống."),
  newPassword: string().required("Mật khẩu không để trống.").min(8, "Mật khẩu ít nhất 8 ký tự."),
  confirmPassword: string()
    .required("Vui lòng xác nhận lại mật khẩu.")
    .oneOf([ref("newPassword")], "Mật khẩu không khớp."),
});
