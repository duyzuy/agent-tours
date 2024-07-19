import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronUp from "@/assets/icons/IconChevronUp";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { getFooterMenu } from "@/app/[locale]/_actions/menu";
import FooterWraper from "@/components/frontend/FooterWraper";
import { IMenuItem, MenuObjectType } from "@/models/management/cms/menu.interface";

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

  // const menuItems = menuFooter?.menuItems.

  const getMenuListItem = (items: IMenuItem[], depth: number) => {
    return items.reduce<MenuFooterItem[]>((acc, item) => {
      let childItems: MenuFooterItem[] = [];
      if (item.children && item.children.length) {
        childItems = getMenuListItem(item.children, depth + 1);
      }

      let menuSlug = "";

      if (item.menuType === "templateType") {
        if (item.objectType === "cmsTemplate") {
          menuSlug = ["template", item.objectSlug].join("/");
        }
        if (item.objectType === "destination") {
          menuSlug = ["destination", item.objectSlug].join("/");
        }

        if (item.objectType === "page") {
          menuSlug = ["page", item.objectSlug].join("/");
        }

        if (item.objectType === "tour") {
          menuSlug = ["tour", item.objectSlug].join("/");
        }
        if (item.objectType === "visaTemplate") {
          menuSlug = ["visa", item.objectSlug].join("/");
        }
      }
      if (item.menuType === "custom") {
        if (item.objectType === "custom") {
          menuSlug = item.slug;
        }
      }

      return [
        ...acc,
        {
          id: item.id,
          title: item.name,
          objectType: item.objectType,
          slug: menuSlug,
          depth: depth,
          children: childItems,
        },
      ];
    }, []);
  };

  return <FooterWraper menuItems={menuFooter ? getMenuListItem(menuFooter.menuItems, 0) : []} />;
}
