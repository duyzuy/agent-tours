import { CustomerAuthAction } from "./customerActions";
import { UserManagerData } from "./user.type";

export const initCustomerState = new UserManagerData(undefined);

export const customerReducer = (state = initCustomerState, action: CustomerAuthAction) => {
  switch (action.type) {
    case "SET_PROFILE": {
      const { payload } = action;
      state = {
        ...state,
        profile: payload,
      };
      return state;
    }
    case "CLEAR_PROFILE": {
      state = {
        ...state,
        profile: undefined,
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
