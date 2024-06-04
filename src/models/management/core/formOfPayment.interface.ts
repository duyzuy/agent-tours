import { BaseResponse, Status } from "../common.interface";

export interface IFormOfPayment {
    recId: number;
    orderId: number;
    type: FOP_TYPE;
    fopType: FOP_PAYMENT_TYPE;
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

export enum FOP_TYPE {
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
    COUPON = "COUPON",
}

export enum FOP_PAYMENT_TYPE {
    CASH = "CASH",
    BANKTRANSFER = "BANKTRANSFER",
    CREDITCARD = "CREDITCARD",
    COUPON = "COUPON",
    SYSTEM = "SYSTEM", // từ hệ thống sinh ra
}

export interface IFormOfPaymentPayload {
    orderId?: number;
    type?: FOP_TYPE; //"PAYMENT(IN)"; REFUND(OUT), CHARGE(IN-KOTRAKHACH), DISCOUNT(OUT-KOTRAKHACH)
    fopType?: FOP_PAYMENT_TYPE; //"CASH"; BANKTRANSFER, CREDITCARD, COUPON
    fopDocument?: string;
    amount?: number;
    payer?: string;
    rmk?: string;
    status?: Status; //OK không được xoá - chỉ QQ mới được xoá
}

export class FormOfPaymmentQueryParams {
    requestObject?: {
        orderId?: number;
        type?: FOP_TYPE;
    };
    pageCurrent?: number;
    pageSize?: number;
    constructor(
        requestObject:
            | { orderId: number | undefined; type: FOP_TYPE | undefined }
            | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}

export interface IFormOfPaymentListRs extends BaseResponse<IFormOfPayment[]> {}
