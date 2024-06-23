import { FeProductItem } from "@/models/fe/productItem.interface";

export enum EBookingActions {
    SET_PRODUCT = "SET_PRODUCT",
}

export type BookingActions = {
    type: EBookingActions.SET_PRODUCT;
    payload?: FeProductItem;
};
