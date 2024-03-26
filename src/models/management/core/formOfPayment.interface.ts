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
}

export enum FOP_TYPE {
    PAYMENT = "PAYMENT",
    REFUND = "REFUND",
    CHARGE = "CHARGE",
    DISCOUNT = "DISCOUNT",
}

export enum FOP_PAYMENT_TYPE {
    CASH = "CASH",
    BANKTRANSFER = "BANKTRANSFER",
    CREDITCARD = "CREDITCARD",
    COUPON = "COUPON",
}

export interface IFormOfPaymentListRs extends BaseResponse<IFormOfPayment[]> {}
