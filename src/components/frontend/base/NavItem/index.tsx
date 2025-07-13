import React, { memo } from "react";
import classNames from "classnames";
import { IconChevronDown } from "@/assets/icons";
import { isEmpty } from "lodash";
import NavLink from "./NavLink";
import { getIcon } from "@/constants/icons.constant";
import { MenuItemType } from "@/utils/menu";

export type NavItemProps = {
  className?: string;
  name?: string;
  icon?: string;
  slug?: string;
  items: MenuItemType[];
  dropdownAlign?: "left" | "right";
};

const NavItem = ({ className = "", name, slug, icon, items = [], dropdownAlign = "left" }: Partial<NavItemProps>) => {
  const IconComp = getIcon(icon);
  return (
    <div
      className={classNames("relative group/item", {
        [className]: className,
      })}
    >
      <div className="flex items-center gap-x-1 relative leading-6 cursor-pointer px-3 py-2" aria-expanded="false">
        {slug ? (
          <NavLink
            prefix={IconComp?.icon ? <IconComp.icon /> : undefined}
            href={slug}
            title={name}
            className="font-[500]"
          />
        ) : (
          <span className="font-[500]">{name}</span>
        )}
        {items?.length ? (
          <span className="transition-all group-hover/item:rotate-180">
            <IconChevronDown width={16} height={16} />
          </span>
        ) : null}
      </div>
      <NavItem.Dropdown
        className={classNames("invisible group-hover/item:visible", {
          "right-0": dropdownAlign === "right",
          "left-0": dropdownAlign === "left",
        })}
        items={items}
      />
    </div>
  );
};
export default memo(NavItem);

interface NavItemDropdown {
  className?: string;
  items: MenuItemType[];
}

NavItem.Dropdown = function NavItemDropdown({ className = "", items }: NavItemDropdown) {
  if (!items.length) return null;
  return (
    <div
      className={classNames("rounded-xl bg-white border backdrop-blur-md w-56 absolute z-100", {
        [className]: className,
      })}
    >
      <div className="p-3">
        {items.map((item, _index) => (
          <div key={_index} className="group relative flex gap-x-3 rounded-lg p-3 text-sm leading-6 hover:bg-slate-100">
            <IconComp iconName={item.icon} />
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

const IconComp = ({ iconName }: { iconName: string }) => {
  const Icon = getIcon(iconName);

  if (!Icon) return null;

  return (
    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
      <Icon.icon width={20} height={20} />
    </div>
  );
};
