"use client";
import { useState, useEffect } from "react";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import { Drawer } from "antd";
import { MenuItemType } from "@/utils/menu";
import { Link } from "@/utils/navigation";
import { IconChevronDown } from "@/assets/icons";
import classNames from "classnames";
import { ICON_LIST } from "@/constants/icons.constant";
import styled from "styled-components";
import { usePathname } from "@/utils/navigation";
export interface HamburgerMenuButtonProps {
  className?: string;
  items: MenuItemType[];
}
const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({ className, items }) => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <>
      <HamburgerButton onClick={() => setShowMenu(true)} />
      <DrawerMobileMenu
        title="Danh mục"
        open={showMenu}
        onClose={() => setShowMenu(false)}
        placement="bottom"
        height={"calc(85vh - env(safe-area-inset-bottom))"}
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
      </DrawerMobileMenu>
    </>
  );
};
export default HamburgerMenuButton;

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
          <div className="flex items-center">
            {IconComp ? <IconComp.icon className="ext-gray-800 font-[500] mr-2 w-4 h-4" /> : null}
            <span className="text-gray-800 font-[500]">{name}</span>
          </div>
          <IconChevronDown width={16} height={16} />
        </div>
      ) : (
        <Link href={slug} title={name} className="flex items-center py-3 hover:bg-slate-50 !text-gray-800">
          {IconComp ? <IconComp.icon className="ext-gray-800 font-[500] mr-2 w-4 h-4" /> : null}
          <span className="text-gray-800 font-[500]">{name}</span>
        </Link>
      )}
      {showDropdown ? (
        <ul className="sub-items pl-8">
          {items?.map((_item) => (
            <li className="sub-item" key={_item.id}>
              <Link href={_item.slug} title={_item.name} className="flex items-center py-2 hover:bg-slate-50">
                {_item.name}
              </Link>
            </li>
          ))}
        </ul>
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
