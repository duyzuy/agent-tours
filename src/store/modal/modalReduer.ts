import { ModalManager } from "./modal.type";
import { ModalManagerActions } from "./modalActions";

export const initModalState = new ModalManager({
  open: false,
  content: "",
});

export const modalReducer = (state: ModalManager, action: ModalManagerActions) => {
  switch (action.type) {
    case "SHOW_AUTH_MODAL": {
      state = {
        ...state,
        authModal: {
          open: true,
          content: "",
        },
      };
      return state;
    }
    case "HIDE_AUTH_MODAL": {
      state = {
        ...state,
        authModal: {
          open: false,
          content: "",
        },
      };
      return state;
    }
    default:
      return state;
  }
};
