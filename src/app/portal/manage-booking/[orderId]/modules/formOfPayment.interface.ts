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
    infoTId?: string;
    infoMId?: string;
    infoTnxId?: string;
    infoTrace?: string;
    infoNote?: string;
    infoNumber?: string;
    status?: Status;
    constructor(
        orderId: number,
        type: FOP_TYPE | undefined,
        fopType: FOP_PAYMENT_TYPE | undefined,
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
    { label: "Tiền mặt", value: FOP_PAYMENT_TYPE.CASH },
    { label: "Chuyển khoản ngân hàng", value: FOP_PAYMENT_TYPE.BANKTRANSFER },
    { label: "Thẻ tín dụng", value: FOP_PAYMENT_TYPE.CREDITCARD },
    { label: "Phiếu giảm giá", value: FOP_PAYMENT_TYPE.COUPON },
    { label: "Hệ thống", value: FOP_PAYMENT_TYPE.SYSTEM },
];

export const FOP_TYPE_LIST = [
    { label: "Thanh toán", value: FOP_TYPE.PAYMENT },
    { label: "Hoàn tiền", value: FOP_TYPE.REFUND },
    { label: "Phí thuế", value: FOP_TYPE.CHARGE },
    { label: "Giảm giá", value: FOP_TYPE.DISCOUNT },
];
