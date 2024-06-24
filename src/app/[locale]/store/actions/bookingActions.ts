import { PassengerType } from "@/models/common.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { FeBookingInformation } from "../../(booking)/modules/booking.interface";

export enum EBookingActions {
    SET_PRODUCT = "SET_PRODUCT",
    SET_PASSENGER_QUANTITY = "SET_PASSENGER_QUANTITY",
    SET_PRODUCT_DETAIL_ITEMS = "SET_PRODUCT_DETAIL_ITEMS",
    RESET_PASSENGER_QUANTITY = "RESET_PASSENGER_QUANTITY",
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
      };
