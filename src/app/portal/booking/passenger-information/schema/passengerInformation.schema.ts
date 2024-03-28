import {
    ObjectSchema,
    object,
    string,
    array,
    number,
    mixed,
    ArraySchema,
    AnyObject,
} from "yup";
import { PassengerInformationFormData } from "../../modules/passenger.interface";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";

export const passengerInformationSchema: ArraySchema<
    PassengerInformationFormData[],
    AnyObject,
    never[],
    "d"
> = array()
    .of(
        object({
            paxTitle: string()
                .oneOf<EPassengerTitle>([
                    EPassengerTitle.MISS,
                    EPassengerTitle.MR,
                    EPassengerTitle.MRS,
                ])
                .required("Chọn danh xưng."),
            paxLastname: string().required("Họ không bỏ trống."),
            paxMiddleFirstName: string().required(
                "Tên đệm và tên không bỏ trống.",
            ),
            paxGender: string()
                .oneOf<EPassengerGender>(
                    [
                        EPassengerGender.FEMALE,
                        EPassengerGender.MALE,
                        EPassengerGender.OTHER,
                    ],
                    "Giới tính không đúng.",
                )
                .required("Chọn giới tính."),
            paxBirthDate: string().required("Ngày sinh không bỏ trống."),
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
        }),
    )
    .required()
    .default([]);

// export const validateBeneficiaryItems = array().of(
//     object().shape({
//       itemId: number().required(
//         defineMessage("Error.orderItemMissinfo", "Thông tin chưa đầy đủ")
//       ),
//       quantity: number().required(
//         defineMessage("Error.quantity.product", "Số lượng sản phẩm bị thiếu")
//       ),
//       // type: mixed().oneOf(Object.values(PRODUCT_TYPE)).required(),
//       type: string()
//         .required()
//         .oneOf([PRODUCT_TYPE.PRODUCT, PRODUCT_TYPE.CAMPAIGN]),

//       passengers: array()
//         .required(
//           defineMessage("Error.passengerDataformat", "Dữ liệu không đúng")
//         )
//         .of(
//           object().shape({
//             itemId: number().required(),
//             passengersInfo: object().shape({
//               email: string()
//                 .required(
//                   defineMessage("Error.emailRequired", "*Vui lòng nhập email")
//                 )
//                 .email(
//                   defineMessage(
//                     "Error.emailInvalid",
//                     "Email không đúng định dạng"
//                   )
//                 ),

//               firstName: string()
//                 .required(
//                   defineMessage("Error.firstNameRequired", "*Vui lòng nhập tên")
//                 )
//                 .matches(
//                   vietnameseNamePattern,
//                   defineMessage("Error.firstNameInvalid", "Tên không hợp lệ")
//                 ),

//               lastName: string()
//                 .required(
//                   defineMessage(
//                     "Error.lastNameRequired",
//                     "*Vui lòng nhập tên đệm"
//                   )
//                 )
//                 .matches(
//                   vietnameseNamePattern,
//                   defineMessage("Error.lastNameInvalid", "Tên đệm không hợp lệ")
//                 ),

//               phone: string()
//                 .required(
//                   defineMessage(
//                     "Error.phoneNumberRequired",
//                     "*Vui lòng nhập số điện thoại"
//                   )
//                 )
//                 .matches(
//                   /^[0-9]+$/,
//                   defineMessage(
//                     "Error.phoneNumberInvalid",
//                     "*Số điện thoại không hợp lệ"
//                   )
//                 )
//                 .max(
//                   11,
//                   defineMessage(
//                     "Error.phoneNumberLimit",
//                     "Số điện thoại không quá 11 số"
//                   )
//                 ),
//             }),
//           })
//         ),
//     })
//   );
