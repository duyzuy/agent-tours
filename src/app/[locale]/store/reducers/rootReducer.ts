import { bookingReducer, initBookingState } from "./bookingReducer";
// import { combineReducers } from "../utils";
import { AppActions } from "../type";

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
};
const rootReducer = combineReducers({
  booking: bookingReducer,
});

export default rootReducer;

export type RootStateType = typeof rootState;
export type ReducerKeys = keyof RootStateType;
