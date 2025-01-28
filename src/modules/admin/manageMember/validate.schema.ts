import { object, string, ObjectSchema, boolean, ref, number } from "yup";

import { MemberUpdateFormData } from "./member.interface";

const vietnameseNamePattern =
  /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$/;

export const memberUpdateSchema: ObjectSchema<MemberUpdateFormData> = object({
  recId: number().required("Thiếu Id Member."),
  email: string().when("isCreate", {
    is: true,
    then: (schema) => schema.required("Email không được bỏ trống.").email("Email không chính xác"),
    otherwise: (schema) => schema.optional(),
  }),
  phoneNumber: string()
    .required("Số điện thoại không được bỏ trống.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
    .min(10, "Số điện thoại tối thiểu 10 số.")
    .max(11, "Số điện thoại không quá 11 số."),
  username: string(),
});

// export const localUserChangePasswordSchema: ObjectSchema<LocalUserChangePasswordFormData> = object({
//   username: string().required("Tên tài khoản không bỏ trống."),
//   newPassword: string().required("Mật khẩu không để trống.").min(8, "Mật khẩu ít nhất 8 ký tự."),
//   confirmPassword: string()
//     .required("Vui lòng xác nhận lại mật khẩu.")
//     .oneOf([ref("newPassword")], "Mật khẩu không khớp."),
// });
