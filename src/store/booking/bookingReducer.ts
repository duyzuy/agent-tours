import { BookingActions } from "./bookingActions";
import { FeBookingFormData } from "./booking.type";
export const initBookingState = new FeBookingFormData(
  {
    cmsTemplate: undefined,
    product: undefined,
    couponPolicy: undefined,
    coupons: undefined,
    bookingDetails: [],
    bookingSsrWithPax: undefined,
    bookingSsr: undefined,
    customerInformation: undefined,
    invoiceInformation: undefined,
    passengers: [],
  },
  undefined,
  { adult: 1, child: 0, infant: 0 },
  undefined,
);

export const bookingReducer = (state = initBookingState, action: BookingActions) => {
  switch (action.type) {
    case "SET_PRODUCT": {
      const { payload: product } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          product: product,
        },
      };
      return state;
    }
    case "INIT_PRODUCT": {
      const { payload } = action;
      state = {
        ...initBookingState,
        bookingInfo: {
          ...initBookingState.bookingInfo,
          cmsTemplate: payload?.cmsTemplate,
          product: payload?.product,
        },
      };
      return state;
    }
    case "SET_PASSENGER_QUANTITY": {
      const { payload } = action;
      state = {
        ...state,
        bookingPassenger: {
          ...payload,
        },
      };
      return state;
    }
    case "RESET_PASSENGER_QUANTITY": {
      state = {
        ...state,
        bookingPassenger: {
          ...initBookingState.bookingPassenger,
        },
      };
      return state;
    }
    case "INIT_PASSENGERS_INFORMATION_FORMDATA": {
      const { payload: passengersInformation } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          passengers: passengersInformation,
        },
      };
      return state;
    }
    case "SET_PASSENGER_INFORMATION": {
      const { payload: passengersInformation } = action;

      let newPassengers = [...state.bookingInfo.passengers];
      newPassengers.splice(passengersInformation.index, 1, { ...passengersInformation });
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          passengers: newPassengers,
        },
      };
      return state;
    }
    case "SET_PASSENGERS_INFORMATION": {
      const { payload: passengersInformation } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          passengers: passengersInformation,
        },
      };
      return state;
    }
    case "SET_PRODUCT_DETAIL_ITEMS": {
      const { payload } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          bookingDetails: [...(payload || [])],
        },
      };
      return state;
    }
    case "ADD_COUPON_POLICY": {
      const { payload: coupon } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          couponPolicy: coupon,
        },
      };
      return state;
    }
    case "ADD_COUPONS": {
      const { payload: coupon } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          coupons: [...(state.bookingInfo.coupons || []), coupon],
        },
      };
      return state;
    }
    case "REMOVE_COUPON_POLICY": {
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          couponPolicy: undefined,
        },
      };
      return state;
    }
    case "REMOVE_COUPONS": {
      return {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          coupons: [],
        },
      };
    }
    case "SET_SERVICE_LIST": {
      const { payload: serviceList } = action;
      state = {
        ...state,
        services: serviceList,
      };
      return state;
    }
    case "ADD_SERVICE_LIST": {
      const { payload: bookingSSRItems } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          bookingSsrWithPax: bookingSSRItems,
        },
      };
      return state;
    }
    case "SET_RESERVATION": {
      const { payload: reservation } = action;
      state = {
        ...state,
        reservation: reservation,
      };
      return state;
    }
    case "RESET_BOOKING": {
      state = {
        ...state,
        bookingInfo: initBookingState.bookingInfo,
        bookingPassenger: initBookingState.bookingPassenger,
        services: initBookingState.services,
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
