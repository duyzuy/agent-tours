import { BaseQueryParams, BaseResponse, Status } from "../../common.interface";

export interface IFormOfPayment {
  recId: number;
  orderId: number;
  type: EFopType;
  fopType: EFopPaymentType;
  fopDocument: string;
  amount: number;
  payer: string;
  rmk: string;
  status: Status;
  sysFstUser: string;
  sysFstUpdate: string;
  sysLstUser: string;
  sysLstUpdate: string;
  sysBelongTo: string;
  logStatus: string;
  infoTId: string;
  infoMId: string;
  infoTnxId: string;
  infoTrace: string;
  infoNote: string;
  infoNumber: string;
}

export enum EFopType {
  PAYMENT = "PAYMENT",
  REFUND = "REFUND",
  EXCHANGE = "EXCHANGE",
  SPLIT = "SPLIT",
  CHARGE = "CHARGE",
  CHARGE_SPLIT = "CHARGE_SPLIT",
  CHARGE_CANCEL = "CHARGE_CANCEL",
  DISCOUNT = "DISCOUNT",
  DISCOUNT_COUPON = "DISCOUNT_COUPON",
  DISCOUNT_POLICY = "DISCOUNT_POLICY",
}

export enum EFopPaymentType {
  CASH = "CASH",
  BANKTRANSFER = "BANKTRANSFER",
  CREDITCARD = "CREDITCARD",
  COUPON = "COUPON",
  SYSTEM = "SYSTEM", // từ hệ thống sinh ra
}

export interface FormOfPaymentPayload {
  orderId?: number;
  type?: EFopType; //"PAYMENT(IN)"; REFUND(OUT), CHARGE(IN-KOTRAKHACH), DISCOUNT(OUT-KOTRAKHACH)
  fopType?: EFopPaymentType; //"CASH"; BANKTRANSFER, CREDITCARD, COUPON
  fopDocument?: string;
  amount?: number;
  payer?: string;
  rmk?: string;
  status?: Status; //OK không được xoá - chỉ QQ mới được xoá
}

export class FormOfPaymmentQueryParams
  implements
    BaseQueryParams<{
      orderId?: number;
      types?: EFopType[];
      fopTypes?: EFopPaymentType[];
      requestId?: number;
      status?: Status;
    }>
{
  requestObject;
  pageCurrent;
  pageSize;
  constructor(
    requestObject:
      | { orderId?: number; types?: EFopType[]; fopTypes?: EFopPaymentType[]; requestId?: number; status?: Status }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}

export interface FormOfPaymentListRs extends BaseResponse<IFormOfPayment[]> {}
export interface FormOfPaymentRs extends BaseResponse<IFormOfPayment> {}
