import { object, string, ObjectSchema, boolean, ref } from "yup";

import {
    ILocalUserPayload,
    ILocalUserChangePasswordPayLoad,
    ELocalUserType,
} from "@/model/Management/localUser.interface";

type TLocalUserObjectSchema = ILocalUserPayload & {
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
        then: (schema) =>
            schema
                .required("Email không được bỏ trống.")
                .email("Email không chính xác"),
        otherwise: (schema) => schema.optional(),
    }),
    userType: string()
        .required("Loại tài khoản không bỏ trống.")
        .oneOf<ELocalUserType>(
            [
                ELocalUserType.ADMIN,
                ELocalUserType.AGENT,
                ELocalUserType.AGENT_STAFF,
            ],
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
    mainRoleName: string().default(""),
    descriptions: string().default(""),
    infoPhoneNumber: string()
        .min(10, "Số điện thoại tối thiểu 10 số.")
        .max(11, "Số điện thoại không quá 11 số.")
        .default(""),
    infoCompanyName: string().default(""),
    infoAddress: string().default(""),
    infoBanking: string().default(""),
    infoTaxcode: string().default(""),
    infoSpecialNote: string().default(""),
    infoPosition: string().default(""),
    infoLegalRepresentative: string().default(""),
    status: string().required().oneOf(["OK", "XX", "OX"]).default("OK"),
});

export const localUserChangePasswordSchema: ObjectSchema<ILocalUserChangePasswordPayLoad> =
    object({
        username: string().required("Tên tài khoản không bỏ trống."),
        newPassword: string()
            .required("Mật khẩu không để trống.")
            .min(8, "Mật khẩu ít nhất 8 ký tự."),
        confirmPassword: string()
            .required("Vui lòng xác nhận lại mật khẩu.")
            .oneOf([ref("newPassword")], "Mật khẩu không khớp."),
    });

// export const registerSchema = object({
//     first_name: string()
//         .required("Tên đệm và tên không được bỏ trống.")
//         .min(2, "Tên đệm và tên tối thiểu 2 ký tự"),
//     last_name: string().required("Họ không được bỏ trống"),
//     email: string()
//         .required("Email không được bỏ trống")
//         .email("Email không chính xác"),
//     password: string()
//         .required("Mật khẩu không được bỏ trống.")
//         .min(8, "Mật khẩu tối thiểu 8 ký tự."),
//     passwordConfirm: string()
//         .required("Vui lòng xác nhận lại mật khẩu.")
//         .oneOf([ref("password")], "Mật khẩu không khớp."),
// });
