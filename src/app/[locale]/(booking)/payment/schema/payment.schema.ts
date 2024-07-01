import { ObjectSchema, object, string, array, number } from "yup";
import { EPassengerGender, EPassengerTitle } from "@/constants/common";
import { IPaymentInformation } from "../modules/payment.interface";
import { PassengerType } from "@/models/common.interface";

export const paymentSchema: ObjectSchema<IPaymentInformation> = object({
    customerInformation: object({
        custName: string().required("ko bo trong").min(6, "Tối thiểu 6 ký tự"),
        custPhoneNumber: string().required(),
        custEmail: string()
            .required("Email không bỏ trống")
            .email("email không hợp lệ"),
        custAddress: string(),
        rmk: string(),
        referenceId: string(),
    }),
    invoice: object({
        invoiceName: string(),
        invoiceCompanyName: string(),
        invoiceAddress: string(),
        invoiceTaxCode: string(),
        invoiceEmail: string(),
    }),
});
