import { PassengerType } from "@/models/common.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { FeBookingInformation } from "../../(booking)/modules/booking.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";

export enum EBookingActions {
    SET_PRODUCT = "SET_PRODUCT",
    SET_PASSENGER_QUANTITY = "SET_PASSENGER_QUANTITY",
    SET_PRODUCT_DETAIL_ITEMS = "SET_PRODUCT_DETAIL_ITEMS",
    RESET_PASSENGER_QUANTITY = "RESET_PASSENGER_QUANTITY",
    ADD_COUPON_POLICY = "SET_COUPON_POLICY",
    REMOVE_COUPON_POLICY = "REMOVE_COUPON_POLICY",
    ADD_COUPONS = "ADD_COUPONS",
    REMOVE_COUPONS = "REMOVE_COUPONS",
}

export type BookingActions =
    | {
          type: EBookingActions.SET_PRODUCT;
          payload?: FeProductItem;
      }
    | {
          type: EBookingActions.SET_PASSENGER_QUANTITY;
          payload: { passengerType: PassengerType; quantity: number };
      }
    | {
          type: EBookingActions.SET_PRODUCT_DETAIL_ITEMS;
          payload: FeBookingInformation["bookingDetails"];
      }
    | {
          type: EBookingActions.RESET_PASSENGER_QUANTITY;
      }
    | {
          type: EBookingActions.RESET_PASSENGER_QUANTITY;
      }
    | {
          type: EBookingActions.ADD_COUPONS;
          payload: IPromotion[];
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
      };
