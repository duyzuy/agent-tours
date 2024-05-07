import { PassengerType } from "@/models/management/common.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { BookingDetailItem } from "../page";

export type BookingSSRItem = {
    booking: BookingDetailItem;
    ssr: { quantity: number; priceConfig: PriceConfig; type: PassengerType }[];
};

export class BookingSSRData {
    bookingOrder?: {
        recId?: number;
    };
    bookingDetails?: {
        [key: string]: {
            serviceId: number;
            items: BookingSSRItem[];
        };
    };

    constructor(
        bookingOrder:
            | {
                  recId?: number;
              }
            | undefined,
        bookingDetails:
            | {
                  [key: string]: {
                      serviceId: number;
                      items: BookingSSRItem[];
                  };
              }
            | undefined,
    ) {
        this.bookingOrder = bookingOrder;
        this.bookingDetails = bookingDetails;
    }
}

export interface IBookingSSRPayload {
    bookingOrder?: {
        recId?: number;
    };
    bookingDetails?: {
        booking: {
            recId: number;
            bookingRefId: number;
            ssr: {
                sellableConfigId: number;
                qty: number;
                amount: number;
                type: PassengerType;
            }[];
        };
    }[];
}
