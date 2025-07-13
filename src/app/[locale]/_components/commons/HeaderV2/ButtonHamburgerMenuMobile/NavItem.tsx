"use client";
import { FC, memo, SVGProps, useState } from "react";
import { IconChevronDown } from "@/assets/icons";
import { ICON_LIST } from "@/constants/icons.constant";
import { MenuItemType } from "@/utils/menu";
import { Link } from "@/utils/navigation";
import classNames from "classnames";

interface NavItemProps {
  icon: string;
  name: string;
  slug: string;
  items: MenuItemType[];
  className?: string;
  isMega?: boolean;
}
const NavItem = ({ className = "", name, slug = "/", icon, items, isMega }: NavItemProps) => {
  const IconComp = ICON_LIST.find((item) => item.key === icon);

  if (isMega) {
    return <DropdownNavItem className={className} Icon={IconComp?.icon} name={name} items={items} />;
  }
  return (
    <div
      className={classNames("nav-item", {
        [className]: className,
      })}
    >
      <Link
        href={slug}
        title={name}
        className="flex items-center py-3 px-3 rounded-lg hover:bg-slate-100 !text-gray-800"
      >
        {IconComp ? <IconComp.icon className="ext-gray-800 font-[500] mr-3 w-5 h-5" /> : null}
        <span className="text-gray-800 font-[500]">{name}</span>
      </Link>
    </div>
  );
};
export default memo(NavItem);

interface DropdownNavItemProps {
  className?: string;
  Icon: FC<SVGProps<SVGSVGElement>> | undefined;
  name: React.ReactNode;
  items: MenuItemType[];
}
const DropdownNavItem: React.FC<DropdownNavItemProps> = ({ className = "", Icon, name, items }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className={classNames("nav-item", {
        [className]: className,
      })}
    >
      <div
        className="flex items-center py-3 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <div className="flex items-center flex-1">
          {Icon ? <Icon className="ext-gray-800 font-[500] mr-3 w-5 h-5" /> : null}
          <span className="text-gray-800 font-[500]">{name}</span>
        </div>
        <IconChevronDown
          width={16}
          height={16}
          className={classNames("transition-all", {
            "rotate-[180deg]": showDropdown,
          })}
        />
      </div>
      <ul
        className={classNames("sub-items pl-8", {
          hidden: !showDropdown,
        })}
      >
        {items?.map((_item) => (
          <li className="sub-item" key={_item.id}>
            <Link
              href={_item.slug}
              title={_item.name}
              className="flex items-center py-2 hover:bg-slate-50 !text-gray-800"
            >
              {_item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
