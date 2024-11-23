import { PassengerType } from "@/models/common.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import {
  AddNewSSRByPaxPayload,
  AddNewSSRNoPaxPayload,
  DeleteSSRPayload,
} from "@/models/management/booking/order.interface";
import { IProductService } from "@/models/management/booking/service.interface";
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
    configItem: IProductService["configs"][number];
    qty: number;
    amount: number;
    type: PassengerType;
  }[];
  constructor(
    bookingOrderId: number,
    ssrList: {
      paxId: number;
      configItem: IProductService["configs"][number];
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
    configItem: IProductService["configs"][number];
    qty: number;
    amount: number;
    type: PassengerType.ADULT;
  }[];
  constructor(
    bookingOrderId: number,
    ssrList: {
      configItem: IProductService["configs"][number];
      qty: number;
      amount: number;
      type: PassengerType.ADULT;
    }[],
  ) {
    this.bookingOrderId = bookingOrderId;
    this.ssrList = ssrList;
  }
}

// export interface IEditOrderSSRPayload {
//   bookingOrder?: {
//     recId?: number;
//   };
//   bookingDetails?: {
//     booking: {
//       recId: number;
//       bookingRefId: number;
//       ssr: {
//         sellableConfigId: number;
//         qty: number;
//         amount: number;
//         type: PassengerType;
//       }[];
//     };
//   }[];
//   bookingSsrDelete?: {
//     bookingId: number;
//     sellableConfigId: number;
//   }[];
// }
