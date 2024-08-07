import React, { memo, SVGProps } from "react";
import classNames from "classnames";
import { IconChevronDown } from "@/assets/icons";

import { isEmpty } from "lodash";
import NavLink from "./NavLink";
import { ICON_LIST } from "@/constants/icons.constant";
import { MenuObjectType, MenuPositionType } from "@/models/management/cms/menu.interface";
import { MenuItemType } from "@/utils/menu";

export type NavItemProps = {
  className?: string;
  navType?: MenuPositionType;
  name?: string;
  icon?: string;
  slug?: string;
  objectType?: MenuObjectType;
  items: MenuItemType[];
};
// export type MenuItemType = Omit<IMenuItem, "cat" | "type" | "menuPosition" | "children"> & {
//   children: MenuItemType[];
// };

const NavItem = ({ className = "", name, slug, icon, items, objectType, navType }: Partial<NavItemProps>) => {
  const IconComp = ICON_LIST.find((item) => item.key === icon);

  return (
    <div
      className={classNames("relative group/item", {
        [className]: className,
      })}
    >
      <span
        className="flex items-center gap-x-1 font-[500] relative leading-6 cursor-pointer px-3 py-2"
        aria-expanded="false"
      >
        {slug ? (
          <NavLink prefix={IconComp?.icon ? <IconComp.icon /> : undefined} href={slug} title={name} />
        ) : (
          <span>{name}</span>
        )}
        {items && items.length ? (
          <span className="group-hover/item:rotate-180">
            <IconChevronDown width={16} height={16} />
          </span>
        ) : null}
      </span>
      {items && items.length ? (
        <NavItem.Dropdown className="invisible group-hover/item:visible right-0" items={items} navType={navType} />
      ) : null}
    </div>
  );
};
export default memo(NavItem);

interface NavItemDropdown {
  className?: string;
  items?: MenuItemType[];
  navType?: NavItemProps["navType"];
}

NavItem.Dropdown = function NavItemDropdown({ className = "", items }: NavItemDropdown) {
  const getIconComp = (iconName: string) => {
    return ICON_LIST.find((item) => item.key === iconName);
  };

  return (
    <div
      className={classNames("rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-64 absolute z-100", {
        [className]: className,
      })}
    >
      <div className="p-3">
        {items?.map((item, _index) => (
          <div
            key={_index}
            className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50"
          >
            {item.icon && getIconComp(item.icon) ? <IconComp icon={getIconComp(item.icon)?.icon} /> : null}
            <div className="flex-auto">
              <NavLink
                className="block"
                target={item.menuType === "custom" ? "_blank" : "_self"}
                href={item.slug && !isEmpty(item.slug) ? item.slug : "/"}
              >
                <span className="text-gray-800 font-[500]">{item.name}</span>
              </NavLink>
              {item.description ? <p className="mt-1 text-gray-600 text-xs">{item.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IconComp = ({ icon }: { icon?: React.FC<React.SVGProps<SVGSVGElement>> }) => {
  const Icon = icon;
  return (
    <>
      {Icon ? (
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
          <Icon width={20} height={20} />
        </div>
      ) : null}
    </>
  );
};
