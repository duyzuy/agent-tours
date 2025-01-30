import { FeProductItem } from "@/models/fe/productItem.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";
import { FeProductService } from "@/models/fe/serviceItem.interface";
import { FeReservation } from "@/models/fe/reservation.interface";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
import { FeBookingInformation } from "./booking.type";

export type BookingActions =
  | {
      type: "INIT_PRODUCT";
      payload?: {
        product: FeProductItem;
        cmsTemplate: FeCMSTemplateContent;
      };
    }
  | {
      type: "SET_PRODUCT";
      payload?: FeProductItem;
    }
  | {
      type: "SET_PASSENGER_QUANTITY";
      payload: FeBookingInformation["bookingPassenger"];
    }
  | {
      type: "SET_PRODUCT_DETAIL_ITEMS";
      payload: FeBookingInformation["bookingInfo"]["bookingDetails"];
    }
  | {
      type: "RESET_PASSENGER_QUANTITY";
    }
  | {
      type: "ADD_COUPONS";
      payload: IPromotion;
    }
  | {
      type: "REMOVE_COUPONS";
    }
  | {
      type: "ADD_COUPON_POLICY";
      payload: IPromotion;
    }
  | {
      type: "REMOVE_COUPON_POLICY";
    }
  | {
      type: "SET_SERVICE_LIST";
      payload: FeProductService[];
    }
  | {
      type: "ADD_SERVICE_LIST";
      payload: Exclude<FeBookingInformation["bookingInfo"]["bookingSsrWithPax"], undefined>;
    }
  | {
      type: "INIT_PASSENGERS_INFORMATION_FORMDATA";
      payload: FeBookingInformation["bookingInfo"]["passengers"];
    }
  | {
      type: "SET_PASSENGERS_INFORMATION";
      payload: FeBookingInformation["bookingInfo"]["passengers"];
    }
  | {
      type: "SET_PASSENGER_INFORMATION";
      payload: FeBookingInformation["bookingInfo"]["passengers"][number];
    }
  | {
      type: "SET_RESERVATION";
      payload: FeReservation;
    }
  | {
      type: "SET_RESERVATION";
      payload: FeReservation;
    }
  | {
      type: "RESET_BOOKING";
    };
