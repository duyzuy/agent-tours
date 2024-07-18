import { FeBookingFormData } from "../../(booking)/modules/booking.interface";
import { ModalManagerData } from "../type/modal.type";
import { ModalManagerActions, EModalManagerActions } from "../actions/modalActions";
export const initModalManager = new ModalManagerData({
  open: false,
  content: "",
});

export const modalManagerReducer = (state = initModalManager, action: ModalManagerActions) => {
  switch (action.type) {
    case EModalManagerActions.SHOW_AUTH_MODAL: {
      state = {
        ...state,
        authModal: {
          open: true,
          content: "",
        },
      };
      return state;
    }
    case EModalManagerActions.HIDE_AUTH_MODAL: {
      state = {
        ...state,
        authModal: {
          open: false,
          content: "",
        },
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
