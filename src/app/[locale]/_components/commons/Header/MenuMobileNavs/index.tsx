"use client";
import { useState } from "react";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import { Drawer } from "antd";

interface MenuMobileNavsProps {
  className?: string;
}
const MenuMobileNavs: React.FC<MenuMobileNavsProps> = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };
  const openMenu = () => {
    setShowMenu(false);
  };
  return (
    <>
      <HamburgerButton onClick={openMenu} />
      <Drawer open={showMenu} onClose={closeMenu} placement="bottom">
        <ul>
          <li>asdfasfafsfsadfs</li>
          <li>asdfasfafsfsadfs</li>
          <li>asdfasfafsfsadfs</li>
          <li>asdfasfafsfsadfs</li>
        </ul>
      </Drawer>
    </>
  );
};
export default MenuMobileNavs;
