import { bookingReducer, initBookingState } from "./booking/bookingReducer";

import { initLanguageState, languageReducer } from "./language/languageReducer";
import { customerReducer, initCustomerState } from "./customer/customerReducer";
import { initModalState, modalReducer } from "./modal/modalReduer";
import { CustomerAuthAction } from "./customer/customerActions";
import { BookingActions } from "./booking/bookingActions";
import { LanguageActions } from "./language/languageActions";
import { ModalManagerActions } from "./modal/modalActions";

export type AppActions = CustomerAuthAction | BookingActions | LanguageActions | ModalManagerActions;

const combineReducers = (slices: Record<ReducerKeys, Function>) => (state: RootStateType, action: AppActions) => {
  return Object.keys(slices).reduce((acc, current) => {
    return {
      ...acc,
      [current]: slices[current as keyof typeof slices](state[current as keyof typeof slices], action),
    };
  }, rootState);
};

export const rootState = {
  booking: initBookingState,
  language: initLanguageState,
  customer: initCustomerState,
  modals: initModalState,
};
const rootReducer = combineReducers({
  booking: bookingReducer,
  language: languageReducer,
  customer: customerReducer,
  modals: modalReducer,
});

export default rootReducer;

export type RootStateType = typeof rootState;
export type ReducerKeys = keyof RootStateType;
