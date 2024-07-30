import { ELanguageActionType, LanguageActions } from "../actions/languageActions";
import { LanguageContentContainer } from "../type";
export const initLanguageState = new LanguageContentContainer(undefined, [], [], [], []);

export const languageReducer = (state = initLanguageState, action: LanguageActions) => {
  switch (action.type) {
    case ELanguageActionType.INIT_LANGUAGE: {
      state = {
        ...state,
        locale: action.payload,
      };
      return state;
    }
    // case ELanguageActionType.FETCH_CONTENT_TYPE: {
    //   state = {
    //     ...state,
    //     page: action.payload,
    //   };
    //   return state;
    // }
    case ELanguageActionType.SET_CMSCONTENT_TOUR: {
      const { payload } = action;
      state = {
        ...state,
        tour: payload,
      };
      return state;
    }
    case ELanguageActionType.SET_POST_CONTENT: {
      const { payload } = action;
      state = {
        ...state,
        post: payload,
      };
      return state;
    }
    case ELanguageActionType.SET_CATEGORY_CONTENT: {
      const { payload } = action;
      state = {
        ...state,
        category: payload,
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
