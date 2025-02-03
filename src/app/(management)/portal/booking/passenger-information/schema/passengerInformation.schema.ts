import { ObjectSchema, object, string, array, number, mixed, ArraySchema, AnyObject, lazy } from "yup";
import { PassengerInformationFormData } from "../../modules/passenger.interface";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";

export const passengerInformationSchema: ArraySchema<
  PassengerInformationFormData[] | undefined,
  PassengerInformationFormData,
  "",
  ""
> = array().of(
  object<PassengerInformationFormData>({
    paxTitle: string()
      .oneOf<EPassengerTitle>(
        [EPassengerTitle.MISS, EPassengerTitle.MR, EPassengerTitle.MRS],
        "Danh xưng không hợp lệ.",
      )
      .required("Chưa chọn danh xưng"),
    paxLastname: string().required("Họ không bỏ trống."),
    paxMiddleFirstName: string().required("Tên đệm và tên không bỏ trống."),
    paxGender: string()
      .oneOf<EPassengerGender>(
        [EPassengerGender.FEMALE, EPassengerGender.MALE, EPassengerGender.OTHER],
        "Giới tính không hợp lệ.",
      )
      .required("Chưa chọn giới tính."),
    paxBirthDate: string().required("Ngày sinh không bỏ trống."),
    paxPhoneNumber: string()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ.")
      .min(10, "Số điện thoại tối thiểu 10 số.")
      .max(11, "Số điện thoại không quá 11 số."),
    paxAddress: string().optional().default(""),
    paxIdNumber: string().default(""),
    paxNationality: string().default(""),
    paxPassportNumber: string().default(""),
    paxPassortExpiredDate: string().default(""),
  }),
);
