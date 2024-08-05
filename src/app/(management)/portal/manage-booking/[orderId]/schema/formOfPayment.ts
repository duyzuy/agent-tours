import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { FOPFormData } from "../modules/formOfPayment.interface";
import { FOP_TYPE, FOP_PAYMENT_TYPE } from "@/models/management/core/formOfPayment.interface";
import { Status } from "@/models/common.interface";

export const formOfPaymentSchema: ObjectSchema<FOPFormData> = object({
  orderId: number().required("Thiếu order Id"),
  type: string()
    .oneOf<FOP_TYPE>([FOP_TYPE.CHARGE, FOP_TYPE.DISCOUNT, FOP_TYPE.PAYMENT, FOP_TYPE.REFUND], "Không đúng loại.")
    .required("Chọn loại phiếu thu"),
  fopType: string()
    .oneOf<FOP_PAYMENT_TYPE>(
      [FOP_PAYMENT_TYPE.BANKTRANSFER, FOP_PAYMENT_TYPE.CASH, FOP_PAYMENT_TYPE.COUPON, FOP_PAYMENT_TYPE.CREDITCARD],
      "Không đúng loại.",
    )
    .required("Chọn hình thức thanh toán."),
  status: string()
    .oneOf<Status>([Status.OK, Status.OX, Status.XX, Status.QQ], "Không đúng loại.")
    .required("Trạng thái."),
  fopDocument: string(),
  infoTId: string(),
  infoMId: string(),
  infoTnxId: string(),
  infoTrace: string(),
  infoNote: string(),
  infoNumber: string(),
  amount: number().min(1, "Tối thiểu lớn hơn 1."),
  rmk: string().default(""),
  payer: string().required("Không bỏ trống."),
});
