import { IOrderDetail } from "@/models/management/booking/order.interface";

export interface ISplitBookingPayload {
    bookingOrder?: {
        recId?: number;
        rmk3?: string;
    };
    bookingDetails: {
        booking?: {
            recId?: number;
        };
    }[];
    custName?: string; //name + phone bắt buộc
    custPhoneNumber?: string; //name + phone bắt buộc
    custEmail?: string;
    custAddress?: string;
    rmk?: string; //ghi chu.
}

export class SplitBookingData {
    bookingOrder?: { recId?: number; rmk3?: string };
    bookingDetails: IOrderDetail["bookingDetails"];
    customerInfo?: {
        custName?: string;
        custPhoneNumber?: string;
        custEmail?: string;
        custAddress?: string;
        rmk?: string;
    };

    constructor(
        bookingOrder: { recId?: number; rmk3?: string },
        customerInfo:
            | {
                  custName: string;
                  custPhoneNumber: string;
                  custEmail: string;
                  custAddress: string;
                  rmk: string;
              }
            | undefined,
    ) {
        this.bookingOrder = bookingOrder;
        this.bookingDetails = [];
        this.customerInfo = customerInfo;
    }
}
