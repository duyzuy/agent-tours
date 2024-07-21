"use client";
import { useState, useEffect } from "react";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import { Drawer } from "antd";
import { MenuItemType } from "@/utils/menu";
import { Link } from "@/utils/navigation";
import NavLink from "@/components/frontend/base/NavItem/NavLink";
import { IconChevronDown } from "@/assets/icons";
import classNames from "classnames";
import { ICON_LIST } from "@/constants/icons.constant";
import styled from "styled-components";
import { usePathname } from "@/utils/navigation";
export interface MenuMobileNavsProps {
  className?: string;
  items: MenuItemType[];
}
const MenuMobileNavs: React.FC<MenuMobileNavsProps> = ({ className, items }) => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => {
    setShowMenu(false);
  };
  const openMenu = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    if (showMenu) {
      closeMenu();
    }
  }, [pathname]);
  return (
    <>
      <HamburgerButton onClick={openMenu} />
      <DrawerMobileMenu
        title="Danh mục"
        open={showMenu}
        onClose={closeMenu}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        afterOpenChange={(open) => {
          const body = document.getElementsByTagName("body")[0];
          const scrollY = window.scrollY;

          if (open) {
            body.style.overflowY = "hidden";
            body.style.position = "fixed";
            body.style.top = `-${scrollY}px`;
            body.style.left = "0px";
            body.style.right = "0px";

            body.style.overflowY = "hidden";
          } else {
            body.removeAttribute("style");
          }
        }}
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
        <div className="flex items-center justify-between py-3" onClick={() => setShowDropdown((prev) => !prev)}>
          <span className="flex items-center">
            {IconComp ? (
              <span className="text-gray-600 mr-2">
                <IconComp.icon width={18} height={18} />
              </span>
            ) : null}
            <span className="text-gray-600 font-[500]">{name}</span>
          </span>
          <span className="">
            <IconChevronDown width={16} height={16} />
          </span>
        </div>
      ) : (
        <Link href={slug} title={name} className="flex items-center py-3 hover:bg-slate-50">
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
