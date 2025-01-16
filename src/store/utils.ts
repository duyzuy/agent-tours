import { RootStateType, ReducerKeys } from "./reducers/rootReducer";
import { AppActions } from "./type";

export const combineReducers =
  (slices: Record<ReducerKeys, Function>) => (state: RootStateType, action: AppActions) => {
    return Object.keys(slices).reduce<Partial<RootStateType>>((acc, current) => {
      return {
        ...acc,
        [current]: slices[current as keyof typeof slices](state[current as keyof typeof slices], action),
      };
    }, {});
  };
