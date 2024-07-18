import { defaultLocale } from "@/configs/locale";
import { MenuManagerData } from "./menuType";
import { localeDefault } from "@/constants/locale.constant";
import { MenuManagerActionsType } from "./actions";

export const initMenuManagerState = new MenuManagerData(localeDefault, [], { primary: [], secondary: [], footer: [] });

export const menuManagerReducer = (state = initMenuManagerState, action: MenuManagerActionsType) => {
  switch (action.type) {
    case "SET_MENU_POSITION_LIST": {
      const {
        payload: { position, items },
      } = action;
      return {
        ...state,
        menuPosition: {
          ...state.menuPosition,
          [position]: items,
        },
      };
    }
    case "SWITCH_LANGUAGE": {
      const { payload: locale } = action;
      return {
        ...state,
        locale: locale,
      };
    }
    default:
      return state;
  }
};
