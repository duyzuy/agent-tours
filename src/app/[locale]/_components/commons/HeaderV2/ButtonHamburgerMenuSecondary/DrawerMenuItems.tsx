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
      <DrawerStyled
        width={320}
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        className="styled-drawer px-0"
      >
        {Children.map(children, (child, _index) => (
          <div>{child}</div>
        ))}
      </DrawerStyled>
    </>
  );
};
export default DrawerMenuItems;

const DrawerStyled = styled(Drawer)`
  && {
    .travel-drawer-header {
      border-bottom: none;
    }

    .travel-drawer-body {
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 0;
      scrollbar-width: thin;
    }
  }
`;
