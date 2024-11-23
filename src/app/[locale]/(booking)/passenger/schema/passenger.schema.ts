import { ObjectSchema, object, string, array, number, date } from "yup";
import { EPassengerGender } from "@/constants/common";
import { PassengerFormValues } from "../_components/PassengerFormWraper";
import { PassengerType } from "@/models/common.interface";

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
          paxTitle: string(),
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
          paxBirthDate: date().required("paxBirthDay.required"),
          // .when("type", {
          //     is: PassengerType.ADULT,
          //     then: (schema) => {
          //         // schema.transform(function (
          //         //     value,
          //         //     originalValue,
          //         // ) {
          //         //     if (this.isType(value)) {
          //         //         return value;
          //         //     }
          //         //     // const result = parse(originalValue, "dd.MM.yyyy", new Date());
          //         //     // return result;
          //         // });
          //         return schema;
          //     },
          //     // otherwise: (schema) => schema.optional(),
          // })
          // .when("type", {
          //     is: PassengerType.CHILD,
          //     then: (schema) => {
          //         return schema;
          //     },
          //     // otherwise: (schema) => schema.optional(),
          // })
          // .when("type", {
          //     is: PassengerType.INFANT,
          //     then: (schema) => {
          //         return schema;
          //     },
          //     otherwise: (schema) => schema.optional(),
          // }),

          paxPhoneNumber: string(),
          //     .default("")
          //     .transform((curr, orig) =>
          //         orig === "" ? null : curr,
          //     )
          //     .matches(/^[0-9]+$/, "phoneNumber.invalid")
          //     .min(10, "phoneNumber.minLength")
          //     .max(11, "phoneNumber.maxLength"),
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
