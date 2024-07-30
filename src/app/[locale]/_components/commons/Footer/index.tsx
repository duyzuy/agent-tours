import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { getFooterMenu, getFooterMenuInformation } from "@/app/[locale]/_actions/menu";
import FooterWraper from "@/components/frontend/FooterWraper";
import { MenuObjectType } from "@/models/management/cms/menu.interface";
import { getMenuListFomatedTypes, MenuItemType } from "@/utils/menu";
export type MenuFooterItem = {
  id: number;
  title: string;
  slug: string;
  objectType: MenuObjectType;
  depth: number;
  children?: MenuFooterItem[];
};
export default async function Footer() {
  const locale = await getLocale();

  const menuFooter = await getFooterMenu(locale as LangCode);
  const menuFooterInfo = await getFooterMenuInformation(locale as LangCode);

  const menuItemFormated = getMenuListFomatedTypes(menuFooter?.menuItems || []);

  const menuInfo = getMenuListFomatedTypes(menuFooterInfo?.menuItems || []);

  const getFormatFooterMenuItems = (items: MenuItemType[], depth = 0) => {
    return items.reduce<MenuFooterItem[]>((acc, item) => {
      let childItems: MenuFooterItem[] = [];
      if (item.children && item.children.length) {
        childItems = getFormatFooterMenuItems(item.children, depth + 1);
      }

      return [
        ...acc,
        {
          id: item.id,
          title: item.name,
          objectType: item.objectType,
          slug: item.slug,
          depth: depth,
          children: childItems,
        },
      ];
    }, []);
  };

  return (
    <FooterWraper
      menuItems={menuItemFormated ? getFormatFooterMenuItems(menuItemFormated, 0) : []}
      informationItems={menuInfo ? getFormatFooterMenuItems(menuInfo, 0) : []}
    />
  );
}
