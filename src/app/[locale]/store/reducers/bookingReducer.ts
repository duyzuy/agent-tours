import { BookingActions, EBookingActions } from "../actions/bookingActions";
import { FeBookingFormData } from "../../(booking)/modules/booking.interface";
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
    case EBookingActions.SET_PRODUCT: {
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
    case EBookingActions.INIT_PRODUCT: {
      const { payload } = action;
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          cmsTemplate: payload?.cmsTemplate,
          product: payload?.product,
        },
      };
      return state;
    }
    case EBookingActions.SET_PASSENGER_QUANTITY: {
      const { payload } = action;
      state = {
        ...state,
        bookingPassenger: {
          ...payload,
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
    case EBookingActions.INIT_PASSENGERS_INFORMATION_FORMDATA: {
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
    case EBookingActions.SET_PASSENGER_INFORMATION: {
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
    case EBookingActions.SET_PRODUCT_DETAIL_ITEMS: {
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
    case EBookingActions.ADD_COUPON_POLICY: {
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
    case EBookingActions.ADD_COUPONS: {
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
    case EBookingActions.REMOVE_COUPON_POLICY: {
      state = {
        ...state,
        bookingInfo: {
          ...state.bookingInfo,
          couponPolicy: undefined,
        },
      };
      return state;
    }
    case EBookingActions.SET_SERVICE_LIST: {
      const { payload: serviceList } = action;
      state = {
        ...state,
        servicePriceConfigs: serviceList,
      };
      return state;
    }
    case EBookingActions.ADD_BOOKING_SERVICE_LIST: {
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
    case EBookingActions.SET_RESERVATION: {
      const { payload: reservation } = action;
      state = {
        ...state,
        reservation: reservation,
      };
      return state;
    }
    case EBookingActions.RESET_BOOKING: {
      state = {
        ...state,
        bookingInfo: initBookingState.bookingInfo,
        bookingPassenger: initBookingState.bookingPassenger,
        servicePriceConfigs: initBookingState.servicePriceConfigs,
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
