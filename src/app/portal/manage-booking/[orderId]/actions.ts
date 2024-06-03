import { IOrderDetail } from "@/models/management/booking/order.interface";
import {
    BookingDetailItemType,
    BookingDetailSSRItemType,
    BookingSSRItemType,
    ManageBookingDetail,
} from "./modules/manageBooking.interface";

export enum ManageBookingActionType {
    SPLIT_BOOKING = "SPLIT_BOOKING",
    INIT_ORDER_DETAIL = "INIT_ORDER_DETAIL",
    RESET_EDIT_BOOKING = "RESET_EDIT_BOOKING",
    ADD_SSR_ORDER = "ADD_SSR_ORDER",
}

export const manageBookingActions = {
    [ManageBookingActionType.SPLIT_BOOKING]: "SPLIT_BOOKING",
    [ManageBookingActionType.INIT_ORDER_DETAIL]: "INIT_ORDER_DETAIL",
    [ManageBookingActionType.RESET_EDIT_BOOKING]: "RESET_EDIT_BOOKING",
    [ManageBookingActionType.ADD_SSR_ORDER]: "ADD_SSR_ORDER",
};

export type ManageBookingAction =
    | { type: ManageBookingActionType.INIT_ORDER_DETAIL; payload: IOrderDetail }
    | { type: ManageBookingActionType.SPLIT_BOOKING }
    | { type: ManageBookingActionType.RESET_EDIT_BOOKING }
    | {
          type: ManageBookingActionType.ADD_SSR_ORDER;
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
        type: ManageBookingActionType.INIT_ORDER_DETAIL,
        payload: data,
    };
}

export function resetEditBooking(): ManageBookingAction {
    return {
        type: ManageBookingActionType.RESET_EDIT_BOOKING,
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
        type: ManageBookingActionType.ADD_SSR_ORDER,
        payload: payload,
    };
}
