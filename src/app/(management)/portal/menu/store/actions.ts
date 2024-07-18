import { Locale } from "@/models/management/cms/language.interface";
import { IMenuItem, MenuPositionType } from "@/models/management/cms/menu.interface";

export type MenuManagerActionsType =
  | {
      type: "INIT_LOCALE";
      payload: any;
    }
  | {
      type: "SWITCH_LANGUAGE";
      payload: Locale;
    }
  | {
      type: "SET_MENU_POSITION_LIST";
      payload: {
        position: MenuPositionType;
        items: IMenuItem[];
      };
    };
