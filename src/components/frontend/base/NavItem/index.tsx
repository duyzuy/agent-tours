import React, { memo } from "react";
import classNames from "classnames";
import { IconChevronDown } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { isEmpty } from "lodash";
import NavLink from "./NavLink";

interface IDropdownItem {
  description?: string;
  title?: string;
  iconPath?: string;
  href?: string;
  isBlank?: boolean;
}
interface NavItemProps {
  hasDropdown?: boolean;
  className?: string;
  title?: string;
  dropdownItems?: IDropdownItem[];
  prefix?: React.ReactNode;
  href?: string;
}

const NavItem = ({ hasDropdown, className = "", title, href, dropdownItems, prefix }: NavItemProps) => {
  return (
    <div
      className={classNames("relative group/item px-3 py-2", {
        [className]: className,
      })}
    >
      <span className="flex items-center gap-x-1 font-[500] leading-6 cursor-pointer" aria-expanded="false">
        {href ? <NavLink prefix={prefix} href={href} title={title} /> : <span>{title}</span>}
        {hasDropdown ? (
          <span className="group-hover/item:rotate-180">
            <IconChevronDown width={16} height={16} />
          </span>
        ) : null}
      </span>
      {hasDropdown ? <NavItem.Dropdown className="invisible group-hover/item:visible" items={dropdownItems} /> : null}
    </div>
  );
};
export default memo(NavItem);

interface NavItemDropdown {
  className?: string;
  items?: IDropdownItem[];
}

NavItem.Dropdown = function NavItemDropdown({ className = "", items }: NavItemDropdown) {
  return (
    <div
      className={classNames("rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-80 absolute z-100", {
        [className]: className,
      })}
    >
      <div className="p-4">
        {items?.map((item, _index) => (
          <div
            key={_index}
            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
          >
            {item?.iconPath ? (
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <Image src={item?.iconPath} alt={item.title || ""} width={24} height={24} />
              </div>
            ) : null}
            <div className="flex-auto">
              <Link
                className="block font-[500]"
                target={item.isBlank ? "_blank" : "_self"}
                href={item.href && !isEmpty(item.href) ? item.href : "/"}
              >
                <span className="text-gray-800">{item.title}</span>
              </Link>
              {item.description ? <p className="mt-1 text-gray-600">{item.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
