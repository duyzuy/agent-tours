import { LanguageActions } from "./languageActions";
import { LanguageContentContainer } from "./language.type";
export const initLanguageState = new LanguageContentContainer(undefined, [], [], [], []);

export const languageReducer = (state = initLanguageState, action: LanguageActions) => {
  switch (action.type) {
    case "INIT_LANGUAGE": {
      return {
        ...state,
        locale: action.payload,
      };
    }
    case "SET_CMSCONTENT_TOUR": {
      const { payload } = action;
      return {
        ...state,
        tour: payload,
      };
    }
    case "SET_POST_CONTENT": {
      const { payload } = action;
      return {
        ...state,
        post: payload,
      };
    }
    case "SET_CATEGORY_CONTENT": {
      const { payload } = action;
      return {
        ...state,
        category: payload,
      };
    }
    default: {
      return state;
    }
  }
};
