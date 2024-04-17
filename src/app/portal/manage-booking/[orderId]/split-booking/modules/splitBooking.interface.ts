import { IInvoice } from "@/models/management/booking/invoice.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";

export interface ISplitBookingBase {
    bookingDetails: {
        booking?: {
            recId?: number;
        };
    }[];
    custName?: string; //name + phone bắt buộc
    custPhoneNumber?: string; //name + phone bắt buộc
    custEmail?: string;
    custAddress?: string;
    invoiceName?: string;
    invoiceCompanyName?: string;
    invoiceAddress?: string;
    invoiceTaxCode?: string;
    invoiceEmail?: string;
    rmk?: string; //ghi chu.
}
export interface SplitBookingOrder {
    recId?: number;
    rmk3?: string;
    fop: {
        type: FOP_TYPE.CHARGE_SPLIT | FOP_TYPE.SPLIT; //important
        amount: number;
        rmk: string;
    }[];
}
export interface ISplitBookingPayload extends ISplitBookingBase {
    bookingOrder: SplitBookingOrder;
}

export class SplitBookingFormData implements ISplitBookingPayload {
    bookingOrder: SplitBookingOrder;
    bookingDetails: IOrderDetail["bookingDetails"];
    customerInfo: {
        custName?: string;
        custPhoneNumber?: string;
        custEmail?: string;
        custAddress?: string;
        rmk?: string;
    };
    invoiceInfo: Partial<IInvoice>;
    constructor(
        bookingOrder: SplitBookingOrder,
        customerInfo: {
            custName?: string;
            custPhoneNumber?: string;
            custEmail?: string;
            custAddress?: string;
            rmk?: string;
        },

        invoiceInfo: Partial<IInvoice>,
    ) {
        this.bookingOrder = bookingOrder;
        this.bookingDetails = [];
        this.customerInfo = customerInfo;
        this.invoiceInfo = invoiceInfo;
    }
}
