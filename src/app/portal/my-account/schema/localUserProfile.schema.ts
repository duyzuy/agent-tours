import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { LocalUserProfileFormData } from "../modules/userProfileInfo.interface";

export const localUserProfileSchema: ObjectSchema<LocalUserProfileFormData> =
    object({
        infoCompanyName: string().default(""),
        infoLegalRepresentative: string().default(""),
        infoPosition: string().default(""),
        infoPhoneNumber: string()
            .required("Số điện thoại không bỏ trống.")
            .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
            .min(10, "Số điện thoại tối thiểu 10 số.")
            .max(11, "Số điện thoại không quá 11 số."),
        infoEmail: string()
            .required("Email không được bỏ trống.")
            .email("Email không chính xác"),
        infoAddress: string().default(""),
        infoTaxcode: string().default(""),
        infoBanking: string().default(""),
        infoSpecialNote: string().default(""),
        fullname: string().default(""),
    });
