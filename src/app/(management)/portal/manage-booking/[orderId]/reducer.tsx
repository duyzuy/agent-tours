import { ManageBookingAction } from "./actions";
import { ManageBookingDetail } from "./modules/manageBooking.interface";

export const initManageBookingState = new ManageBookingDetail(undefined, {
  bookingDetails: undefined,
  bookingSsrDelete: [],
});

export const manageBookingReducer = (state = initManageBookingState, action: ManageBookingAction) => {
  switch (action.type) {
    case "INIT_ORDER_DETAIL": {
      const { payload } = action;
      return {
        ...state,
        order: payload,
      };
    }
    case "SPLIT_BOOKING": {
      return state;
    }
    case "RESET_EDIT_BOOKING": {
      state = {
        ...state,
        editSSROrder: {
          bookingSsrDelete: [],
          bookingDetails: undefined,
        },
      };
      return state;
    }
    case "ADD_SSR_ORDER": {
      const { payload } = action;
      const { ssrAdd, ssrRemove } = payload;
      state = {
        ...state,
        editSSROrder: {
          bookingSsrDelete: [...ssrRemove],
          bookingDetails: {
            ...state.editSSROrder.bookingDetails,
            [ssrAdd.serviceId]: {
              serviceId: ssrAdd.serviceId,
              items: ssrAdd.items,
            },
          },
        },
      };
      return state;
    }
    default:
      return state;
  }
};
