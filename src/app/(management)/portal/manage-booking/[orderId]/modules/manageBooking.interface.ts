import { PassengerType } from "@/models/common.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IServiceItem } from "@/models/management/booking/service.interface";
export type BookingDetailItemType = Exclude<IOrderDetail["ssrBookings"], null>[number];
export type BookingDetailSSRItemType = Exclude<IOrderDetail["ssrBookings"], null>[number];

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

export class EditBookingSSRByPassenger {
  bookingOrderId: number;
  ssrList: {
    paxId: number;
    configItem: IServiceItem["configs"][number];
    qty: number;
    amount: number;
    type: PassengerType;
  }[];
  constructor(
    bookingOrderId: number,
    ssrList: {
      paxId: number;
      configItem: IServiceItem["configs"][number];
      qty: number;
      amount: number;
      type: PassengerType;
    }[],
  ) {
    this.bookingOrderId = bookingOrderId;
    this.ssrList = ssrList;
  }
}

export class EditBookingSSRNoPassenger {
  bookingOrderId: number;
  ssrList: {
    configItem: IServiceItem["configs"][number];
    qty: number;
    amount: number;
    type: PassengerType.ADULT;
  }[];
  constructor(
    bookingOrderId: number,
    ssrList: {
      configItem: IServiceItem["configs"][number];
      qty: number;
      amount: number;
      type: PassengerType.ADULT;
    }[],
  ) {
    this.bookingOrderId = bookingOrderId;
    this.ssrList = ssrList;
  }
}
