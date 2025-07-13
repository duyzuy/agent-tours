import { getSecondaryMenu } from "@/actions/menu";

import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes, MenuItemType } from "@/utils/menu";
import { getLocale } from "next-intl/server";
import DrawerMenuItems from "./DrawerMenuItems";
import NavItem from "./NavItem";
import { ICON_LIST, getIcon } from "@/constants/icons.constant";
interface ButtonHamburgerSecondaryProps {}
const ButtonHamburgerSecondary = async ({}: ButtonHamburgerSecondaryProps) => {
  const locale = (await getLocale()) as LangCode;
  const secondaryMenu = await getSecondaryMenu(locale);
  const { menuItems, lang, menuPosition } = secondaryMenu || {};

  const itemsList = menuItems ? getMenuListFomatedTypes(menuItems) : [];

  return (
    <DrawerMenuItems>
      {itemsList.map((sItem) => (
        <NavItem
          key={sItem.id}
          name={sItem.name}
          icon={sItem.icon}
          isMega={sItem.isMega}
          items={sItem.children}
          slug={sItem.slug}
        />
      ))}
    </DrawerMenuItems>
  );
};
export default ButtonHamburgerSecondary;
