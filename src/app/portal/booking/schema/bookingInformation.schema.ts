import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { BookingInformationPayload } from "@/models/management/booking/bookingPayload.interface";
import { PassengerType } from "@/models/management/common.interface";

export const bookingInformationSchema: ObjectSchema<BookingInformationPayload> =
    object({
        sellableId: number().required("Thiếu ID sản phẩm"),
        bookingDetails: array(
            object({
                index: number().required("Thiếu Index booking detail."),
                indexRef: number().required("Thiếu indeRef").default(0),
                sellableConfigId: number().required("Thiếu ID pricing config."),
                bookingRefId: number().default(0),
                qty: number()
                    .required("Số lượng hành khách không bỏ trống.")
                    .default(0),
                amount: number().required("Amount không bỏ trống").default(0),
                type: string()
                    .oneOf<PassengerType>([
                        PassengerType.ADULT,
                        PassengerType.CHILD,
                        PassengerType.INFANT,
                    ])
                    .required("Loại hành khách không bỏ trống"),
                pax: object({}).default({}),
            }),
        ).default([]),
        custName: string().required("cusName không bỏ trống."),
        custPhoneNumber: string().required("phone number không bỏ trống."),
        custEmail: string().required("Email không bỏ trống."),
        custAddress: string().default(""),
        rmk: string().default(""),
    });
