"use client";
import HamburgerButton from "@/components/frontend/HamburgerButton";
import { Drawer } from "antd";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

interface DrawerMenuItemsProps extends PropsWithChildren {}
const DrawerMenuItems: React.FC<DrawerMenuItemsProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;

    setOpen(false);
  }, [pathname]);
  return (
    <>
      <HamburgerButton onClick={() => setOpen(true)} />
      <DrawerMobileMenu
        open={open}
        onClose={() => setOpen(false)}
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
        {Children.map(children, (child, _index) => (
          <div>{child}</div>
        ))}
      </DrawerMobileMenu>
    </>
  );
};
export default DrawerMenuItems;

const DrawerMobileMenu = styled(Drawer)`
  && {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;
