import { BookingActions, EBookingActions } from "../actions/bookingActions";
import { FeBookingFormData } from "../../(booking)/modules/booking.interface";
export const initBookingState = new FeBookingFormData(
    undefined,
    [],
    undefined,
    undefined,
    undefined,
);

export const bookingReducer = (
    state = initBookingState,
    action: BookingActions,
) => {
    switch (action.type) {
        case EBookingActions.SET_PRODUCT: {
            state = {
                ...state,
                product: action.payload,
            };
            return state;
        }
        default: {
            return state;
        }
    }
};
