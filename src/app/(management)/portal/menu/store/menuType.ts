import { Locale } from "@/models/management/cms/language.interface";
import { IMenuItem, MenuPositionType } from "@/models/management/cms/menu.interface";

type MenuPositionTypeList = Record<MenuPositionType, IMenuItem[]>;
export interface IMenuManager {
  locale: Locale;
  menuPositionList: { menuPosition: MenuPositionType; items: IMenuItem[] }[];
  menuPosition: MenuPositionTypeList;
}

export class MenuManagerData implements IMenuManager {
  locale: Locale;
  menuPositionList: { menuPosition: MenuPositionType; items: IMenuItem[] }[];
  menuPosition: MenuPositionTypeList;

  constructor(
    locale: Locale,
    menuPositionList: { menuPosition: MenuPositionType; items: IMenuItem[] }[],
    menuPosition: MenuPositionTypeList,
  ) {
    this.locale = locale;
    this.menuPositionList = menuPositionList;
    this.menuPosition = menuPosition;
  }
}
