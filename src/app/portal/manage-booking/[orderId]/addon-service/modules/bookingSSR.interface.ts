import { PassengerType } from "@/models/management/common.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { BookingDetailItemType, BookingDetailSSRItemType } from "../page";

export type BookingSSRItemType = {
    booking: BookingDetailItemType;
    ssr: { quantity: number; priceConfig: PriceConfig; type: PassengerType }[];
};

export class BookingSSRData {
    bookingOrder?: {
        recId?: number;
    };
    bookingDetails?: {
        [key: string]: {
            serviceId: number;
            items: BookingSSRItemType[];
        };
    };
    bookingSsrDelete: BookingDetailSSRItemType[];

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
                      items: BookingSSRItemType[];
                  };
              }
            | undefined,
        bookingSsrDelete: BookingDetailSSRItemType[],
    ) {
        this.bookingOrder = bookingOrder;
        this.bookingDetails = bookingDetails;
        this.bookingSsrDelete = bookingSsrDelete;
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
    bookingSsrDelete?: {
        bookingId: number;
        sellableConfigId: number;
    }[];
}
