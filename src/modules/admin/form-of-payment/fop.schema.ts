import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { FOPFormData } from "./fop.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { EFopPaymentType, EFopType } from "@/models/management/core/formOfPayment.interface";
import { Status } from "@/models/common.interface";

export const createFopSchema: ObjectSchema<FOPFormData> = object({
  orderId: number().required("Thiếu orderId"),
  type: string().oneOf<EFopType>([EFopType.PAYMENT, EFopType.REFUND, EFopType.DISCOUNT]).required("Thiếu loại FOP"),
  fopType: string()
    .oneOf<EFopPaymentType>([
      EFopPaymentType.CASH,
      EFopPaymentType.BANKTRANSFER,
      EFopPaymentType.CREDITCARD,
      EFopPaymentType.COUPON,
      EFopPaymentType.SYSTEM,
    ])
    .required("Thiếu loại thanh toán"),
  fopDocument: string().default(""),
  //amount: string().matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/, "Số tiền không hợp lệ."),
  amount: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("Số tiền phải lớn hơn 0.")
    .required("Không bỏ trống."),
  payer: string().default(""),
  rmk: string().default(""),
  infoTId: string().default(""),
  infoMId: string().default(""),
  infoTnxId: string().default(""),
  infoTrace: string().default(""),
  infoNote: string().default(""),
  infoNumber: string().default(""),
  status: string().oneOf<Status>([Status.QQ, Status.OK, Status.XX, Status.OX]).default(Status.QQ),
});
