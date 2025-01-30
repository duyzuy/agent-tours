import { ObjectSchema, object, string, array, number, date } from "yup";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { PassengerType } from "@/models/common.interface";
import { FePassengerInformationFormData } from "./passegner.interface";
import { PassengerFormValues } from "@/app/[locale]/(booking)/passenger/page";

export const passengerInformationSchema: ObjectSchema<PassengerFormValues> = object({
  passengerItem: array()
    .of(
      object({
        index: number().required("Missing Index."),
        type: string()
          .oneOf<PassengerType>(
            [PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT],
            "Danh xưng không hợp lệ.",
          )
          .required("Missing paxType"),
        info: object({
          paxTitle: string().oneOf<EPassengerTitle>([EPassengerTitle.MISS, EPassengerTitle.MR, EPassengerTitle.MRS]),
          paxLastname: string()
            .required("paxLastname.required")
            .matches(/^[A-Za-z\s]+$/, "paxLastname.inValid"),
          paxMiddleFirstName: string()
            .required("paxMiddleFirstName.required")
            .matches(/^[A-Za-z\s]+$/, "paxMiddleFirstName.inValid"),
          paxGender: string()
            .oneOf<EPassengerGender>(
              [EPassengerGender.MALE, EPassengerGender.FEMALE, EPassengerGender.OTHER],
              "Giới tính không hợp lệ",
            )
            .required("paxGender.required"),
          paxBirthDate: string().required("paxBirthDay.required"),
          paxPhoneNumber: string(),
          paxAddress: string(),
          paxIdNumber: string(),
          paxNationality: string(),
          paxPassportNumber: string(),
          paxPassortExpiredDate: string(),
        }),
      }),
    )
    .required()
    .default([]),
});

export const passengerSchema: ObjectSchema<FePassengerInformationFormData> = object({
  recId: number(),
  paxTitle: string().oneOf<EPassengerTitle>([EPassengerTitle.MISS, EPassengerTitle.MR, EPassengerTitle.MRS]),
  paxLastname: string()
    .required("paxLastname.required")
    .matches(/^[A-Za-z\s]+$/, "paxLastname.inValid"),
  paxMiddleFirstName: string()
    .required("paxMiddleFirstName.required")
    .matches(/^[A-Za-z\s]+$/, "paxMiddleFirstName.inValid"),
  paxGender: string()
    .oneOf<EPassengerGender>(
      [EPassengerGender.MALE, EPassengerGender.FEMALE, EPassengerGender.OTHER],
      "Giới tính không hợp lệ",
    )
    .required("paxGender.required"),
  paxBirthDate: string().required("paxBirthDay.required"),
  paxBirthYear: number(),
  paxPhoneNumber: string(),
  paxAddress: string(),
  paxIdNumber: string(),
  paxNationality: string(),
  paxPassportNumber: string(),
  paxPassortExpiredDate: string(),
});
