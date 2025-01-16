import { IOrderDetail } from "@/models/management/booking/order.interface";
import { BookingDetailSSRItemType, BookingSSRItemType } from "./modules/manageBooking.interface";

export type ManageBookingAction =
  | { type: "INIT_ORDER_DETAIL"; payload: IOrderDetail }
  | { type: "SPLIT_BOOKING" }
  | { type: "RESET_EDIT_BOOKING" }
  | {
      type: "ADD_SSR_ORDER";
      payload: {
        ssrAdd: {
          serviceId: number;
          items: BookingSSRItemType[];
        };
        ssrRemove: BookingDetailSSRItemType[];
      };
    };

export function initManageOrderDetail(data: IOrderDetail): ManageBookingAction {
  return {
    type: "INIT_ORDER_DETAIL",
    payload: data,
  };
}

export function resetEditBooking(): ManageBookingAction {
  return {
    type: "RESET_EDIT_BOOKING",
  };
}

export function addSSROrder(payload: {
  ssrAdd: {
    serviceId: number;
    items: BookingSSRItemType[];
  };
  ssrRemove: BookingDetailSSRItemType[];
}): ManageBookingAction {
  return {
    type: "ADD_SSR_ORDER",
    payload: payload,
  };
}
