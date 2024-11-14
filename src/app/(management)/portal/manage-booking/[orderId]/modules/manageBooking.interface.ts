import { PassengerType } from "@/models/common.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";

export type BookingDetailItemType = IOrderDetail["bookingDetails"][0]["booking"];
export type BookingDetailSSRItemType = IOrderDetail["ssr"][0]["booking"];

export type BookingSSRItemType = {
  booking: BookingDetailItemType;
  ssr: { quantity: number; priceConfig: PriceConfig; type: PassengerType }[];
};

export class ManageBookingDetail {
  order?: IOrderDetail;
  editSSROrder: {
    bookingDetails?: {
      [key: string]: {
        serviceId: number;
        items: BookingSSRItemType[];
      };
    };
    bookingSsrDelete: BookingDetailSSRItemType[];
  };

  constructor(
    order: IOrderDetail | undefined,
    editSSROrder: {
      bookingDetails?: {
        [key: string]: {
          serviceId: number;
          items: BookingSSRItemType[];
        };
      };
      bookingSsrDelete: BookingDetailSSRItemType[];
    },
  ) {
    this.editSSROrder = editSSROrder;
    this.order = order;
  }
}

export interface IEditOrderSSRPayload {
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
