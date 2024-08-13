import { FeProductItem } from "@/models/fe/productItem.interface";
import { FeBookingInformation, IBookingSsrItemWithPax } from "../../(booking)/modules/booking.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";
import { FeReservation } from "@/models/fe/reservation.interface";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";

export enum EBookingActions {
  SET_PRODUCT = "SET_PRODUCT",
  INIT_PRODUCT = "INIT_PRODUCT",
  SET_PASSENGER_QUANTITY = "SET_PASSENGER_QUANTITY",
  RESET_PASSENGER_QUANTITY = "RESET_PASSENGER_QUANTITY",
  INIT_PASSENGERS_INFORMATION_FORMDATA = "INIT_PASSENGERS_INFORMATION_FORMDATA",
  SET_PASSENGER_INFORMATION = "SET_PASSENGER_INFORMATION",
  SET_PRODUCT_DETAIL_ITEMS = "SET_PRODUCT_DETAIL_ITEMS",
  ADD_COUPON_POLICY = "SET_COUPON_POLICY",
  REMOVE_COUPON_POLICY = "REMOVE_COUPON_POLICY",
  ADD_COUPONS = "ADD_COUPONS",
  REMOVE_COUPONS = "REMOVE_COUPONS",
  SET_SERVICE_LIST = "SET_SERVICE_LIST",
  ADD_BOOKING_SERVICE_LIST = "ADD_BOOKING_SERVICE_LIST",
  SET_RESERVATION = "SET_RESERVATION",
  RESET_BOOKING = "RESET_BOOKING",
}

export type BookingActions =
  | {
      type: EBookingActions.INIT_PRODUCT;
      payload?: {
        product: FeProductItem;
        cmsTemplate: FeCMSTemplateContent;
      };
    }
  | {
      type: EBookingActions.SET_PRODUCT;
      payload?: FeProductItem;
    }
  | {
      type: EBookingActions.SET_PASSENGER_QUANTITY;
      payload: FeBookingInformation["bookingPassenger"];
    }
  | {
      type: EBookingActions.SET_PRODUCT_DETAIL_ITEMS;
      payload: FeBookingInformation["bookingInfo"]["bookingDetails"];
    }
  | {
      type: EBookingActions.RESET_PASSENGER_QUANTITY;
    }
  | {
      type: EBookingActions.ADD_COUPONS;
      payload: IPromotion;
    }
  | {
      type: EBookingActions.REMOVE_COUPONS;
    }
  | {
      type: EBookingActions.ADD_COUPON_POLICY;
      payload: IPromotion;
    }
  | {
      type: EBookingActions.REMOVE_COUPON_POLICY;
    }
  | {
      type: EBookingActions.SET_SERVICE_LIST;
      payload: FePriceConfig[];
    }
  | {
      type: EBookingActions.ADD_BOOKING_SERVICE_LIST;
      payload: IBookingSsrItemWithPax[];
    }
  | {
      type: EBookingActions.INIT_PASSENGERS_INFORMATION_FORMDATA;
      payload: FeBookingInformation["bookingInfo"]["passengers"];
    }
  | {
      type: EBookingActions.SET_PASSENGER_INFORMATION;
      payload: FeBookingInformation["bookingInfo"]["passengers"];
    }
  | {
      type: EBookingActions.SET_RESERVATION;
      payload: FeReservation;
    }
  | {
      type: EBookingActions.SET_RESERVATION;
      payload: FeReservation;
    }
  | {
      type: EBookingActions.RESET_BOOKING;
    };
