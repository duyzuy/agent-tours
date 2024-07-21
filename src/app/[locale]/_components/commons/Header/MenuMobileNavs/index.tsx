"use client";
import { useState } from "react";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import { Drawer } from "antd";
import { MenuItemType } from "@/utils/menu";
import { Link } from "@/utils/navigation";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import { IconChevronDown } from "@/assets/icons";
import classNames from "classnames";
import { ICON_LIST } from "@/constants/icons.constant";
import styled from "styled-components";

export interface MenuMobileNavsProps {
  className?: string;
  items: MenuItemType[];
}
const MenuMobileNavs: React.FC<MenuMobileNavsProps> = ({ className, items }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };
  const openMenu = () => {
    setShowMenu(true);
  };

  return (
    <>
      <HamburgerButton onClick={openMenu} />
      <DrawerMobileMenu
        title="Danh mục"
        open={showMenu}
        onClose={closeMenu}
        placement="bottom"
        height={"90vh"}
        style={{ padding: 0 }}
      >
        <div>
          {items.map((sItem) => (
            <NavItem
              key={sItem.id}
              name={sItem.name}
              icon={sItem.icon}
              isMega={sItem.isMega}
              items={sItem.children}
              slug={sItem.slug}
            />
          ))}
        </div>
      </DrawerMobileMenu>
    </>
  );
};
export default MenuMobileNavs;

interface NavItemProps {
  icon: string;
  name: string;
  slug: string;
  items: MenuItemType[];
  className?: string;
  isMega?: boolean;
}
const NavItem = ({ className = "", name, slug = "/", icon, items, isMega }: Partial<NavItemProps>) => {
  const IconComp = ICON_LIST.find((item) => item.key === icon);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className={classNames("nav-item", {
        [className]: className,
      })}
    >
      {isMega ? (
        <div className="flex items-center justify-between py-2" onClick={() => setShowDropdown((prev) => !prev)}>
          <span className="flex items-center">
            {IconComp ? (
              <span className="text-gray-500 mr-2">
                <IconComp.icon />
              </span>
            ) : null}
            <span className="text-gray-600 font-[500]">{name}</span>
          </span>
          <span className="">
            <IconChevronDown width={16} height={16} />
          </span>
        </div>
      ) : (
        <Link href={slug} title={name} className="flex items-center py-2 hover:bg-slate-50">
          {IconComp ? (
            <span className="text-gray-600 font-[500] mr-2">
              <IconComp.icon />
            </span>
          ) : null}
          <span className="text-gray-600 font-[500]">{name}</span>
        </Link>
      )}
      {showDropdown ? (
        <div className="sub-items pl-8">
          {items?.map((_item) => (
            <div className="sub-item" key={_item.id}>
              <Link href={_item.slug} title={_item.name} className="flex items-center py-2 hover:bg-slate-50">
                <span className="text-gray-600">{_item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const DrawerMobileMenu = styled(Drawer)`
  && {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;
