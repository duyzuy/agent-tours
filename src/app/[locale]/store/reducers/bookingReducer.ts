import { BookingActions, EBookingActions } from "../actions/bookingActions";
import { FeBookingFormData } from "../../(booking)/modules/booking.interface";
export const initBookingState = new FeBookingFormData(
    undefined,
    undefined,
    [],
    { adult: 1, child: 0, infant: 0 },
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
        case EBookingActions.SET_PASSENGER_QUANTITY: {
            const { payload } = action;
            state = {
                ...state,
                bookingPassenger: {
                    ...state.bookingPassenger,
                    [payload.passengerType]: payload.quantity,
                },
            };
            return state;
        }
        case EBookingActions.RESET_PASSENGER_QUANTITY: {
            state = {
                ...state,
                bookingPassenger: {
                    ...initBookingState.bookingPassenger,
                },
            };
            return state;
        }
        case EBookingActions.SET_PRODUCT_DETAIL_ITEMS: {
            const { payload } = action;
            state = {
                ...state,
                bookingDetails: [...(payload || [])],
            };
            return state;
        }
        default: {
            return state;
        }
    }
};
