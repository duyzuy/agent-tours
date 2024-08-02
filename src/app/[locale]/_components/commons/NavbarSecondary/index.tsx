import classNames from "classnames";
import { getSecondaryMenu } from "@/app/[locale]/_actions/menu";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { getMenuListFomatedTypes } from "@/utils/menu";
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
      className={classNames("container mx-auto menu-horizon relative z-30 px-4 md:px-6 lg:px-8", {
        [className]: className,
      })}
    >
      <div className="menu-secondary-wraper bg-main-400 rounded-lg relative">
        <div className="menu-secondary-list flex flex-wrap items-center py-2 px-3 -mx-3">
          {itemsList?.map((item) => (
            <SecondaryNavItem
              key={item.id}
              name={item.name}
              iconName={item.icon}
              items={item.children}
              isMega={item.isMega}
              slug={item.slug}
              descriptions={item.description}
              className="px-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
