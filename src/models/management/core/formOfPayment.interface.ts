import { BaseQueryParams, BaseResponse, Status } from "../../common.interface";
import { IMediaFile } from "../media.interface";

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
  attachedMedias:
    | {
        id: number;
        objectType: "MEDIA";
        path: string;
        slug: string;
        mediaType: IMediaFile["mediaType"];
        extension: IMediaFile["extension"];
        fullPath: string;
      }[]
    | null;
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

/**
 * payload for create form of payment
 * @orderId: number;
 * @type: EFopType; "PAYMENT(IN)"; REFUND(OUT), CHARGE(IN-KOTRAKHACH), DISCOUNT(OUT-KOTRAKHACH)
 * @FopType: EFopPaymentType; "CASH"; BANKTRANSFER, CREDITCARD, COUPON
 */
export interface CreateFormOfPaymentPayload {
  orderId?: number;
  requestId?: number;
  type?: EFopType;
  fopType?: EFopPaymentType;
  fopDocument?: string;
  amount?: number;
  payer?: string;
  infoTId?: string;
  infoMId?: string;
  infoTnxId?: string;
  infoTrace?: string;
  infoNote?: string;
  infoNumber?: string;

  attachedMedias: {
    id: number;
    objectType: "MEDIA";
    path: string;
    slug: string;
    mediaType: IMediaFile["mediaType"];
    extension: IMediaFile["extension"];
    fullPath: string;
  }[];
  rmk?: string;
  status?: Status; //OK không được xoá - chỉ QQ mới được xoá
}
export interface ApprovalFormOfPaymentPayload {
  recId?: number;
  attachedMedias: {
    id: number;
    objectType: "MEDIA";
    path: string;
    slug: string;
    mediaType: IMediaFile["mediaType"];
    extension: IMediaFile["extension"];
    fullPath: string;
  }[];
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
