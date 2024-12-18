import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { IBookingTourPayload } from "../modules/bookingInformation.interface";
import { PassengerType } from "@/models/common.interface";
import { ESellChannel } from "@/constants/channel.constant";

export const bookingInformationSchema: ObjectSchema<IBookingTourPayload> = object({
  sellableId: number().required("Thiếu ID sản phẩm"),
  bookingDetails: array(
    object({
      index: number().required("Thiếu Index booking detail."),
      sellableConfigId: number().required("Thiếu ID pricing config."),
      qty: number().required("Số lượng hành khách không bỏ trống.").default(0),
      amount: number().required("Amount không bỏ trống").default(0),
      type: string()
        .oneOf<PassengerType>([PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT])
        .required("Loại hành khách không bỏ trống"),
      pax: object({}).default({}),
      ssr: array(
        object({
          sellableConfigId: number().required("Thiếu ID sản phẩm."),
          qty: number().required("Thiếu số lượng sản phẩm"),
          amount: number().required("Thiếu giá tiền"),
          type: string()
            .oneOf<PassengerType>([PassengerType.ADULT, PassengerType.CHILD, PassengerType.INFANT])
            .required("Loại hành khách không bỏ trống"),
        }),
      ).default([]),
    }),
  ).default([]),
  custName: string().required("cusName không bỏ trống."),
  bookingSsr: array(
    object({
      sellableConfigId: number().required("Thiếu ID dịch vụ."),
      qty: number().required("Thiếu số lượng dịch vụ."),
      amount: number().required("Thiếu giá tiền dịch vụ."),
      type: string().oneOf<PassengerType.ADULT>([PassengerType.ADULT]).required("Loại hành khách không bỏ trống"),
    }),
  ).default([]),
  custPhoneNumber: string().required("phone number không bỏ trống."),
  custEmail: string().required("Email không bỏ trống."),
  custAddress: string().default(""),
  rmk: string().default(""),
  referenceId: string(),
  channel: string().oneOf([ESellChannel.B2B, ESellChannel.B2C]),
  agentUserId: number(),
  invoiceName: string().default(""),
  invoiceCompanyName: string().default(""),
  invoiceAddress: string().default(""),
  invoiceTaxCode: string().default(""),
  invoiceEmail: string().default(""),
});
