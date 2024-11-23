import { Status } from "@/models/common.interface";
import { EFopType, EFopPaymentType } from "@/models/management/core/formOfPayment.interface";

export class FOPFormData {
  orderId: number;
  type?: EFopType;
  fopType?: EFopPaymentType;
  fopDocument?: string;
  amount?: number;
  payer?: string;
  rmk?: string;
  infoTId?: string;
  infoMId?: string;
  infoTnxId?: string;
  infoTrace?: string;
  infoNote?: string;
  infoNumber?: string;
  status?: Status;
  constructor(
    orderId: number,
    type: EFopType | undefined,
    fopType: EFopPaymentType | undefined,
    fopDocument: string,
    amount: number,
    payer: string,
    infoTId: string | undefined,
    infoMId: string | undefined,
    infoTnxId: string | undefined,
    infoTrace: string | undefined,
    infoNote: string | undefined,
    infoNumber: string | undefined,
    rmk: string,
  ) {
    this.orderId = orderId;
    this.type = type;
    this.fopType = fopType;
    this.fopDocument = fopDocument;
    this.amount = amount;
    this.payer = payer;
    this.rmk = rmk;
    this.infoTId = infoTId;
    this.infoMId = infoMId;
    this.infoTnxId = infoTnxId;
    this.infoTrace = infoTrace;
    this.infoNote = infoNote;
    this.infoNumber = infoNumber;
    this.status = Status.QQ;
  }
}

export const FOP_PAYMENT_TYPE_LIST = [
  { label: "Tiền mặt", value: EFopPaymentType.CASH },
  { label: "Chuyển khoản ngân hàng", value: EFopPaymentType.BANKTRANSFER },
  { label: "Thẻ tín dụng", value: EFopPaymentType.CREDITCARD },
  { label: "Phiếu giảm giá", value: EFopPaymentType.COUPON },
  { label: "Hệ thống", value: EFopPaymentType.SYSTEM },
];

export const FOP_TYPE_LIST = [
  { label: "Thanh toán", value: EFopType.PAYMENT },
  { label: "Hoàn tiền", value: EFopType.REFUND },
  { label: "Phí thuế", value: EFopType.CHARGE },
  { label: "Giảm giá", value: EFopType.DISCOUNT },
];
