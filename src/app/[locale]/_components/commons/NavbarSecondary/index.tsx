import { ICON_LIST } from "@/constants/icons.constant";
import classNames from "classnames";
import { getSecondaryMenu } from "@/actions/menu";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes } from "@/utils/menu";
import { MenuItemType } from "@/utils/menu";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import { Link } from "@/utils/navigation";
import SecondaryNavItem from "./SecondaryNavItem";

interface NavbarSecondaryProps {
  className?: string;
}
export default async function NavbarSecondary({ className = "" }: NavbarSecondaryProps) {
  const locale = await getLocale();
  const secondaryMenu = await getSecondaryMenu(locale as LangCode);
  const { menuItems, lang, menuPosition } = secondaryMenu || {};

  const itemsList = menuItems ? getMenuListFomatedTypes(menuItems) : [];

  return (
    <div
      className={classNames("container mx-auto menu-horizon relative z-30 px-3 md:px-6 lg:px-8", {
        [className]: className,
      })}
    >
      <div className="menu-secondary-wraper bg-main-500/80 backdrop-blur-sm rounded-lg relative w-fit mx-auto">
        <div className="menu-secondary-list flex flex-wrap items-center py-2">
          {itemsList?.map((item) => (
            <SecondaryNavItem
              key={item.id}
              name={item.name}
              iconName={item.icon}
              items={item.children}
              isMega={item.isMega}
              slug={item.slug}
              descriptions={item.description}
              className="px-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
