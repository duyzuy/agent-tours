import { EUserActions, UserActions } from "../actions/userAction";
import { UserManagerData } from "../type/user.type";

export const initUserManagerState = new UserManagerData(undefined);

export const userManagerReducer = (state = initUserManagerState, action: UserActions) => {
  switch (action.type) {
    case EUserActions.INIT_PROFILE: {
      const { payload } = action;
      state = {
        ...state,
        profile: payload,
      };
      return state;
    }
    case EUserActions.CLEAR_PROFILE: {
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
