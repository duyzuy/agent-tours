import { ELanguageActionType, LanguageActions } from "./actions";
import { LanguageContentContainer } from "./type";
export const initLanguageContextState = new LanguageContentContainer(
    undefined,
    [],
    [],
);

export const languageReducer = (
    state = initLanguageContextState,
    action: LanguageActions,
) => {
    switch (action.type) {
        case ELanguageActionType.INIT_LANGUAGE: {
            state = {
                ...state,
                locale: action.payload,
            };
            return state;
        }
        case ELanguageActionType.FETCH_CONTENT_TYPE: {
            state = {
                ...state,
                page: action.payload,
            };
            return state;
        }
        default: {
            return state;
        }
    }
};
