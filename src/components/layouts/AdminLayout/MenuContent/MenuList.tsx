import React, { memo, useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useThemeMode } from "@/context";
import { MenuItemTypeWithRole } from "../menuConfig";
import { usePathname, useRouter } from "next/navigation";
type AdminMenuProps = MenuProps & {
  onNavigation?: MenuProps["onClick"];
  items: MenuItemTypeWithRole[];
};

const MenuList: React.FC<AdminMenuProps> = ({ onNavigation, items, ...rest }) => {
  const [mode, __] = useThemeMode();

  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState(["dashboard"]);
  const [activeKeys, setActiveKeys] = useState(["dashboard"]);

  const onOpenChange: MenuProps["onOpenChange"] = (data: any) => setOpenKeys(() => [...data]);
  const onMenuNavigation: MenuProps["onClick"] = (menuInfo) => {
    let fullPathname = "/portal";
    fullPathname = fullPathname.concat("/", menuInfo.key);
    router.push(fullPathname);
  };
  useEffect(() => {
    const formatPathname = pathname.replace("/portal/", "");

    setActiveKeys(() => [formatPathname]);

    const arrFormatPathname = formatPathname.split("/");

    if (arrFormatPathname.length > 1) {
      setOpenKeys(() => [arrFormatPathname[0]]);
    }
  }, [pathname]);

  return (
    <Menu
      theme={mode}
      mode="inline"
      selectable
      onClick={(menuInfo) => onMenuNavigation(menuInfo)}
      items={items}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
      defaultSelectedKeys={["dashboard"]}
      selectedKeys={activeKeys}
      style={{
        borderWidth: 0,
      }}
    />
  );
};
export default memo(MenuList);
