import { Status } from "@/models/management/common.interface";
import {
    FOP_TYPE,
    FOP_PAYMENT_TYPE,
} from "@/models/management/core/formOfPayment.interface";

export class FOPFormData {
    orderId: number;
    type?: FOP_TYPE;
    fopType?: FOP_PAYMENT_TYPE;
    fopDocument?: string;
    amount?: number;
    payer?: string;
    rmk?: string;
    status?: Status;
    constructor(
        orderId: number,
        type: FOP_TYPE | undefined,
        fopType: FOP_PAYMENT_TYPE | undefined,
        fopDocument: string,
        amount: number,
        payer: string,
        rmk: string,
    ) {
        this.orderId = orderId;
        this.type = type;
        this.fopType = fopType;
        this.fopDocument = fopDocument;
        this.amount = amount;
        this.payer = payer;
        this.rmk = rmk;
        this.status = Status.QQ;
    }
}

export const FOP_PAYMENT_TYPE_LIST = [
    { label: "Tiền mặt", value: FOP_PAYMENT_TYPE.CASH },
    { label: "Chuyển khoản ngân hàng", value: FOP_PAYMENT_TYPE.BANKTRANSFER },
    { label: "Thẻ tín dụng", value: FOP_PAYMENT_TYPE.CREDITCARD },
    { label: "Phiếu giảm giá", value: FOP_PAYMENT_TYPE.COUPON },
];

export const FOP_TYPE_LIST = [
    { label: "Thanh toán", value: FOP_TYPE.PAYMENT },
    { label: "Hoàn tiền", value: FOP_TYPE.REFUND },
    { label: "Phí thuế", value: FOP_TYPE.CHARGE },
    { label: "Giảm giá", value: FOP_TYPE.DISCOUNT },
];
